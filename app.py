import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

import cv2
import gradio as gr

from history import history_image_path, load_history, save_history_entry
from predict import predict as run_prediction

DISCLAIMER = (
    "**Disclaimer:** SkinVision AI is an educational AI project and is **not** a medical "
    "diagnostic tool. Predictions are generated from image patterns and may be incorrect. "
    "They should not replace examination or advice from a qualified healthcare professional."
)

RISK_TIER_EMOJI = {
    "lower_concern": "🟢",
    "needs_attention": "🟡",
    "professional_evaluation": "🔴",
}

_history_by_label = {}


def analyze(image):
    if image is None:
        return None, "Upload an image first.", ""

    image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    result = run_prediction(image_bgr, top_k=3)

    if not result["is_likely_skin_image"]:
        warning_md = (
            "## ⚠️ This doesn't look like a skin lesion photo\n\n"
            "SkinVision AI is trained specifically on close-up photos of skin lesions and moles. "
            "This image doesn't appear to match that, so no prediction was made. Please upload a "
            "clear, close-up photo of the skin area you want analyzed.\n\n"
            f"*(estimated likelihood this is a skin photo: {result['skin_likelihood']:.0%})*"
        )
        return None, warning_md, ""

    rec = result["recommendation"]

    prediction_md = (
        f"## AI Prediction: {result['predicted_name']}\n"
        f"**Confidence:** {result['confidence']:.1%}\n\n"
        "*This is a model prediction, not a medical diagnosis.*\n\n"
        f"> ℹ️ {rec['no_lesion_caveat']}\n\n"
        "### Top 3 Predictions\n"
        + "".join(f"- **{p['name']}** — {p['confidence']:.1%}\n" for p in result["top_predictions"])
    )

    tier_emoji = RISK_TIER_EMOJI.get(rec["risk_tier"], "")
    recommendation_md = (
        f"## {tier_emoji} {rec['risk_tier_label']}\n\n"
        f"**About this condition**\n\n{rec['description']}\n\n"
        "**Common characteristics**\n"
        + "".join(f"- {c}\n" for c in rec["characteristics"])
        + "\n**Warning signs to watch for**\n"
        + "".join(f"- {w}\n" for w in rec["warning_signs"])
        + "\n**General guidance**\n"
        + "".join(f"- {g}\n" for g in rec["general_care"])
        + f"\n**{rec['general_skin_health_tips']['heading']}**\n\n"
        + rec["general_skin_health_tips"]["body"] + "\n"
    )
    if "low_confidence_note" in rec:
        recommendation_md += f"\n> ⚠️ {rec['low_confidence_note']}\n"
    recommendation_md += f"\n**Next step:** {rec['professional_advice']}\n\n---\n{DISCLAIMER}"

    save_history_entry(image_bgr, result["predicted_code"], result["predicted_name"],
                        result["confidence"], rec["risk_tier"])

    return result["gradcam_overlay"], prediction_md, recommendation_md


def _format_label(entry):
    date = entry["timestamp"][:19].replace("T", " ")
    return f"{date} UTC — {entry['predicted_name']} ({entry['confidence']:.0%})"


def refresh_history():
    global _history_by_label
    entries = load_history()
    _history_by_label = {_format_label(e): e for e in entries}
    labels = list(_history_by_label.keys())

    table_rows = [
        [
            e["timestamp"][:19].replace("T", " "),
            e["predicted_name"],
            f"{e['confidence']:.1%}",
            f"{RISK_TIER_EMOJI.get(e['risk_tier'], '')} {e['risk_tier'].replace('_', ' ')}",
        ]
        for e in entries
    ]

    earlier_default = labels[-1] if labels else None
    later_default = labels[0] if labels else None

    return (
        table_rows,
        gr.update(choices=labels, value=earlier_default),
        gr.update(choices=labels, value=later_default),
    )


def compare_entries(earlier_label, later_label):
    if not earlier_label or not later_label:
        return None, None, "Pick an earlier and a later scan to compare."

    earlier = _history_by_label.get(earlier_label)
    later = _history_by_label.get(later_label)
    if earlier is None or later is None:
        return None, None, "Selection not found — try refreshing history."

    earlier_img = cv2.cvtColor(cv2.imread(history_image_path(earlier)), cv2.COLOR_BGR2RGB)
    later_img = cv2.cvtColor(cv2.imread(history_image_path(later)), cv2.COLOR_BGR2RGB)

    delta = later["confidence"] - earlier["confidence"]
    same_class = earlier["predicted_code"] == later["predicted_code"]

    summary = (
        f"**{earlier['timestamp'][:10]}:** {earlier['predicted_name']} — {earlier['confidence']:.1%}\n\n"
        f"**{later['timestamp'][:10]}:** {later['predicted_name']} — {later['confidence']:.1%}\n\n"
    )
    if same_class:
        summary += f"Same predicted condition across scans. Confidence changed by {delta:+.1%}.\n\n"
    else:
        summary += "⚠️ The predicted condition changed between these two scans.\n\n"
    summary += (
        "*This comparison is informational only — any visible change in a lesion "
        "should be evaluated by a dermatologist, regardless of what the AI predicts.*"
    )

    return earlier_img, later_img, summary


with gr.Blocks(title="SkinVision AI") as demo:
    gr.Markdown("# 🩺 SkinVision AI")
    gr.Markdown(
        "AI-assisted skin lesion image analysis with confidence scores, Grad-CAM "
        "explainability, and general guidance. **Not a diagnostic tool** — always "
        "consult a dermatologist for an actual diagnosis."
    )

    with gr.Tabs():
        with gr.Tab("🔬 Analyze"):
            with gr.Row():
                with gr.Column():
                    image_input = gr.Image(type="numpy", label="Upload a skin lesion image")
                    analyze_btn = gr.Button("Analyze Image", variant="primary")
                    prediction_output = gr.Markdown()
                with gr.Column():
                    gradcam_output = gr.Image(label="AI Attention (Grad-CAM)")

            recommendation_output = gr.Markdown()

        with gr.Tab("📈 Track Changes Over Time"):
            gr.Markdown(
                "Every image you analyze is saved locally so you can track how a lesion "
                "looks across scans over time."
            )
            refresh_btn = gr.Button("🔄 Refresh History")
            history_table = gr.Dataframe(
                headers=["Date", "Prediction", "Confidence", "Risk Tier"],
                label="Scan History", interactive=False,
            )
            with gr.Row():
                earlier_dropdown = gr.Dropdown(label="Earlier scan")
                later_dropdown = gr.Dropdown(label="Later scan")
            compare_btn = gr.Button("Compare")
            with gr.Row():
                earlier_image = gr.Image(label="Earlier")
                later_image = gr.Image(label="Later")
            compare_summary = gr.Markdown()

    analyze_btn.click(
        fn=analyze,
        inputs=image_input,
        outputs=[gradcam_output, prediction_output, recommendation_output],
    ).then(
        fn=refresh_history,
        outputs=[history_table, earlier_dropdown, later_dropdown],
    )

    refresh_btn.click(
        fn=refresh_history,
        outputs=[history_table, earlier_dropdown, later_dropdown],
    )
    compare_btn.click(
        fn=compare_entries,
        inputs=[earlier_dropdown, later_dropdown],
        outputs=[earlier_image, later_image, compare_summary],
    )
    demo.load(fn=refresh_history, outputs=[history_table, earlier_dropdown, later_dropdown])

    gr.Markdown("---")
    gr.Markdown(
        "**About:** SkinVision AI is trained on the HAM10000 dataset (7 lesion classes) "
        "using an EfficientNet-based model (transfer learning), with Grad-CAM explainability "
        "and a rule-based recommendation engine. Built as an educational project."
    )
    gr.Markdown(DISCLAIMER)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    demo.launch(server_name="0.0.0.0", server_port=port)
