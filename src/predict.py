import os

import cv2
import torch

from config import CLASS_NAMES, DEVICE, IMAGE_SIZE, MODELS_DIR, NUM_CLASSES
from content_check import looks_like_skin_image
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
      is_likely_skin_image - whether the image plausibly shows a skin lesion at all
      skin_likelihood  - the underlying 0-1 score behind that decision
      top_predictions  - list of {code, name, confidence}, sorted by confidence desc
      predicted_code / predicted_name / confidence - the top-1 result
      gradcam_overlay  - RGB uint8 heatmap-overlaid image explaining the top-1 prediction
      gradcam_heatmap  - RGB uint8 colorized heatmap alone (same size as gradcam_overlay)
      original_resized - RGB uint8 input image resized to match the Grad-CAM outputs
      recommendation   - dict from recommendation.get_recommendation_by_index

    The 7-class model is only meaningful for skin lesion photos - for anything else
    (a photo of an object, animal, document, etc.) it will still confidently pick one
    of its 7 classes, which would be actively misleading. is_likely_skin_image is a
    CLIP-based sanity check that runs first; when it's False, the rest of the fields
    above are omitted rather than presenting a fabricated result.
    """
    is_skin, skin_likelihood = looks_like_skin_image(image_bgr)
    if not is_skin:
        return {"is_likely_skin_image": False, "skin_likelihood": skin_likelihood}

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

    overlay, heatmap, _ = generate_gradcam(model, image_bgr, target_class=top1_index, device=device)
    original_resized = cv2.resize(image_rgb, (IMAGE_SIZE, IMAGE_SIZE))
    recommendation = get_recommendation_by_index(top1_index, confidence=top1_confidence)

    return {
        "is_likely_skin_image": True,
        "skin_likelihood": skin_likelihood,
        "top_predictions": top_predictions,
        "predicted_code": INDEX_TO_CODE[top1_index],
        "predicted_name": CLASS_NAMES[top1_index],
        "confidence": top1_confidence,
        "gradcam_overlay": overlay,
        "gradcam_heatmap": heatmap,
        "original_resized": original_resized,
        "recommendation": recommendation,
    }
