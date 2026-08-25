import timm
import torch.nn as nn

from config import NUM_CLASSES


class SkinLesionModel(nn.Module):
    """EfficientNet backbone (via timm) fine-tuned for HAM10000 7-class classification."""

    def __init__(self, model_name="efficientnet_b0", num_classes=NUM_CLASSES, pretrained=True):
        super().__init__()
        self.backbone = timm.create_model(
            model_name,
            pretrained=pretrained,
            num_classes=num_classes,
        )

    def forward(self, x):
        return self.backbone(x)


def build_model(model_name="efficientnet_b0", num_classes=NUM_CLASSES, pretrained=True):
    return SkinLesionModel(model_name=model_name, num_classes=num_classes, pretrained=pretrained)
