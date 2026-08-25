import cv2
import numpy as np
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget

from config import IMAGE_SIZE
from transforms import test_transform


def generate_gradcam(model, image_bgr, target_class, device):
    """Run Grad-CAM for `target_class` on a raw (cv2-loaded, BGR) image.

    Returns (overlay, heatmap, grayscale_cam):
      overlay        - RGB uint8 image (IMAGE_SIZE x IMAGE_SIZE) with the heatmap blended in
      heatmap        - RGB uint8 image (IMAGE_SIZE x IMAGE_SIZE), the colorized heatmap alone
      grayscale_cam   - float32 heatmap (IMAGE_SIZE x IMAGE_SIZE), values in [0, 1]
    """
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    image_resized = cv2.resize(image_rgb, (IMAGE_SIZE, IMAGE_SIZE))

    input_tensor = test_transform(image=image_rgb)["image"].unsqueeze(0).to(device)

    # conv_head is EfficientNet's last spatial conv layer (before global pooling),
    # so its activations carry the richest, still spatially-resolved features.
    target_layers = [model.backbone.conv_head]
    targets = [ClassifierOutputTarget(target_class)]

    model.eval()
    with GradCAM(model=model, target_layers=target_layers) as cam:
        grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]

    rgb_float = image_resized.astype(np.float32) / 255.0
    overlay = show_cam_on_image(rgb_float, grayscale_cam, use_rgb=True)

    heatmap_bgr = cv2.applyColorMap(np.uint8(255 * grayscale_cam), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap_bgr, cv2.COLOR_BGR2RGB)

    return overlay, heatmap, grayscale_cam
