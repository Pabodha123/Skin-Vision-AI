import json
import os

from config import LABEL_MAP

CONDITIONS_PATH = os.path.join(os.path.dirname(__file__), "conditions.json")

with open(CONDITIONS_PATH, encoding="utf-8") as f:
    CONDITIONS = json.load(f)

INDEX_TO_CODE = {index: code for code, index in LABEL_MAP.items()}

DISCLAIMER = (
    "SkinVision AI is an educational AI project and is not a medical diagnostic tool. "
    "Predictions are generated from image patterns and may be incorrect. They should not "
    "replace examination or advice from a qualified healthcare professional."
)

# The model only knows 7 lesion categories - it has no "healthy skin" or "no lesion"
# option, so it always picks the closest of the 7 even when nothing resembling a
# lesion is present. A high confidence score reflects certainty about the closest
# match among those 7, not certainty that a lesion is actually there.
NO_LESION_CAVEAT = (
    "This model only classifies images into one of 7 known lesion types — it cannot "
    "detect whether skin is healthy or lesion-free. If the photographed area doesn't "
    "show a distinct mole, spot, or growth, this prediction is not meaningful, no "
    "matter how high the confidence score is."
)

LOW_CONFIDENCE_THRESHOLD = 0.5

RISK_TIER_LABELS = {
    "lower_concern": "Lower Concern",
    "needs_attention": "Needs Attention",
    "professional_evaluation": "Professional Evaluation Recommended",
}

# general skin-care guidance shown alongside every prediction, regardless of
# the predicted class - habits that affect skin health day to day
GENERAL_SKIN_HEALTH_TIPS = {
    "heading": "Protecting your skin day to day",
    "body": (
        "Whatever the prediction, everyday habits affect skin health. Try to limit or avoid: "
        "smoking, excessive sun exposure, chlorine exposure, excessively hot showers, ongoing "
        "stress, high sugar intake, excessive alcohol consumption, sleeping in makeup, and "
        "over-exfoliating."
    ),
}


def get_recommendation(predicted_code, confidence=None):
    """Look up the recommendation info for a predicted class code (e.g. "mel").

    If confidence is given and falls below LOW_CONFIDENCE_THRESHOLD, the risk tier is
    escalated to professional evaluation regardless of the predicted class, since a
    low-confidence prediction is itself a reason not to trust the specific label.
    """
    info = dict(CONDITIONS[predicted_code])
    info["code"] = predicted_code
    info["risk_tier_label"] = RISK_TIER_LABELS[info["risk_tier"]]
    info["disclaimer"] = DISCLAIMER
    info["no_lesion_caveat"] = NO_LESION_CAVEAT
    info["general_skin_health_tips"] = GENERAL_SKIN_HEALTH_TIPS

    if confidence is not None and confidence < LOW_CONFIDENCE_THRESHOLD:
        info["risk_tier"] = "professional_evaluation"
        info["risk_tier_label"] = RISK_TIER_LABELS["professional_evaluation"]
        info["low_confidence_note"] = (
            f"The model's confidence in this prediction is low ({confidence:.0%}). "
            "Low-confidence predictions are less reliable, so a professional evaluation "
            "is recommended regardless of the predicted condition."
        )

    return info


def get_recommendation_by_index(label_index, confidence=None):
    return get_recommendation(INDEX_TO_CODE[label_index], confidence=confidence)
