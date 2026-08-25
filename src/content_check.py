import cv2
import torch
from PIL import Image

SKIN_PROMPT = "a close-up dermoscopic photo of a skin lesion or mole"
OTHER_PROMPT = "a photo of an everyday object, animal, document, or scene unrelated to skin"

# calibrated against real HAM10000 images (min likelihood 0.70) vs synthetic/
# non-skin content (max likelihood 0.09) - large margin either side of this
SKIN_LIKELIHOOD_THRESHOLD = 0.3

_model = None
_preprocess = None
_text_features = None
_device = None


def _load():
    global _model, _preprocess, _text_features, _device
    if _model is None:
        import open_clip

        _device = torch.device("cpu")
        _model, _, _preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32-quickgelu", pretrained="openai"
        )
        _model.eval().to(_device)

        tokenizer = open_clip.get_tokenizer("ViT-B-32-quickgelu")
        text = tokenizer([SKIN_PROMPT, OTHER_PROMPT]).to(_device)
        with torch.no_grad():
            text_features = _model.encode_text(text)
            text_features /= text_features.norm(dim=-1, keepdim=True)
        _text_features = text_features
    return _model, _preprocess, _text_features, _device


def skin_image_likelihood(image_bgr):
    """CLIP zero-shot probability (0-1) that the image looks like a close-up
    skin/lesion photo, vs. an unrelated object/animal/document/scene."""
    model, preprocess, text_features, device = _load()

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    image_tensor = preprocess(Image.fromarray(image_rgb)).unsqueeze(0).to(device)

    with torch.no_grad():
        image_features = model.encode_image(image_tensor)
        image_features /= image_features.norm(dim=-1, keepdim=True)
        similarity = (100.0 * image_features @ text_features.T).softmax(dim=-1)[0]

    return similarity[0].item()


def looks_like_skin_image(image_bgr, threshold=SKIN_LIKELIHOOD_THRESHOLD):
    likelihood = skin_image_likelihood(image_bgr)
    return likelihood >= threshold, likelihood
