import os

import cv2
import torch

from config import CLASS_NAMES, DEVICE, MODELS_DIR, NUM_CLASSES
from gradcam import generate_gradcam
from model import build_model
from recommendation import INDEX_TO_CODE, get_recommendation_by_index
from transforms import test_transform
from utils import get_device, load_checkpoint

CHECKPOINT_PATH = os.path.join(MODELS_DIR, "best_model.pth")

# checkpoint isn't committed to git (too large) - deployments without a local
# copy fetch it from the model's own HF Hub repo on first use instead
HF_MODEL_REPO = "pthennakoon25/skinvision-ai-model"
HF_MODEL_FILE = "best_model.pth"

_model = None
_device = None


def _resolve_checkpoint_path():
    if os.path.exists(CHECKPOINT_PATH):
        return CHECKPOINT_PATH
    from huggingface_hub import hf_hub_download
    return hf_hub_download(repo_id=HF_MODEL_REPO, filename=HF_MODEL_FILE)


def _load_model():
    global _model, _device
    if _model is None:
        _device = get_device(DEVICE)
        _model = build_model(num_classes=NUM_CLASSES).to(_device)
        _model = load_checkpoint(_model, _resolve_checkpoint_path(), _device)
        _model.eval()
    return _model, _device


def predict(image_bgr, top_k=3):
    """Run the full inference pipeline on a raw (cv2-loaded, BGR) image.

    Returns a dict with:
      top_predictions  - list of {code, name, confidence}, sorted by confidence desc
      predicted_code / predicted_name / confidence - the top-1 result
      gradcam_overlay  - RGB uint8 heatmap-overlaid image explaining the top-1 prediction
      recommendation   - dict from recommendation.get_recommendation_by_index
    """
    model, device = _load_model()

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    input_tensor = test_transform(image=image_rgb)["image"].unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)[0].cpu()

    top_indices = torch.argsort(probs, descending=True)[:top_k].tolist()
    top_predictions = [
        {"code": INDEX_TO_CODE[i], "name": CLASS_NAMES[i], "confidence": probs[i].item()}
        for i in top_indices
    ]

    top1_index = top_indices[0]
    top1_confidence = probs[top1_index].item()

    overlay, _ = generate_gradcam(model, image_bgr, target_class=top1_index, device=device)
    recommendation = get_recommendation_by_index(top1_index, confidence=top1_confidence)

    return {
        "top_predictions": top_predictions,
        "predicted_code": INDEX_TO_CODE[top1_index],
        "predicted_name": CLASS_NAMES[top1_index],
        "confidence": top1_confidence,
        "gradcam_overlay": overlay,
        "recommendation": recommendation,
    }
