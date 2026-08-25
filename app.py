import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

import cv2
import gradio as gr

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


def analyze(image):
    if image is None:
        return None, "Upload an image first.", ""

    image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    result = run_prediction(image_bgr, top_k=3)
    rec = result["recommendation"]

    prediction_md = (
        f"## AI Prediction: {result['predicted_name']}\n"
        f"**Confidence:** {result['confidence']:.1%}\n\n"
        "*This is a model prediction, not a medical diagnosis.*\n\n"
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
    )
    if "low_confidence_note" in rec:
        recommendation_md += f"\n> ⚠️ {rec['low_confidence_note']}\n"
    recommendation_md += f"\n**Next step:** {rec['professional_advice']}\n\n---\n{DISCLAIMER}"

    return result["gradcam_overlay"], prediction_md, recommendation_md


with gr.Blocks(title="SkinVision AI") as demo:
    gr.Markdown("# 🩺 SkinVision AI")
    gr.Markdown(
        "AI-assisted skin lesion image analysis with confidence scores, Grad-CAM "
        "explainability, and general guidance. **Not a diagnostic tool** — always "
        "consult a dermatologist for an actual diagnosis."
    )

    with gr.Row():
        with gr.Column():
            image_input = gr.Image(type="numpy", label="Upload a skin lesion image")
            analyze_btn = gr.Button("Analyze Image", variant="primary")
            prediction_output = gr.Markdown()
        with gr.Column():
            gradcam_output = gr.Image(label="AI Attention (Grad-CAM)")

    recommendation_output = gr.Markdown()

    analyze_btn.click(
        fn=analyze,
        inputs=image_input,
        outputs=[gradcam_output, prediction_output, recommendation_output],
    )

    gr.Markdown("---")
    gr.Markdown(
        "**About:** SkinVision AI is trained on the HAM10000 dataset (7 lesion classes) "
        "using an EfficientNet-based model (transfer learning), with Grad-CAM explainability "
        "and a rule-based recommendation engine. Built as an educational project."
    )
    gr.Markdown(DISCLAIMER)


if __name__ == "__main__":
    demo.launch()
