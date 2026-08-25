import json
import os

import matplotlib
matplotlib.use("Agg")  # headless-safe: this script only saves figures, never shows them
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import torch
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    classification_report,
    confusion_matrix,
    roc_auc_score,
)
from torch.utils.data import DataLoader

from config import BATCH_SIZE, CLASS_NAMES, DEVICE, MODELS_DIR, NUM_CLASSES
from dataset import HAM10000Dataset
from model import build_model
from transforms import test_transform
from utils import get_device, load_checkpoint

TEST_CSV = "../outputs/test_split.csv"
CHECKPOINT_PATH = os.path.join(MODELS_DIR, "best_model.pth")
OUTPUT_DIR = "../outputs"


@torch.no_grad()
def collect_predictions(model, loader, device):
    model.eval()
    all_labels, all_preds, all_probs = [], [], []

    for images, labels in loader:
        outputs = model(images.to(device))
        probs = torch.softmax(outputs, dim=1)

        all_labels.extend(labels.tolist())
        all_preds.extend(probs.argmax(dim=1).cpu().tolist())
        all_probs.extend(probs.cpu().tolist())

    return np.array(all_labels), np.array(all_preds), np.array(all_probs)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    device = get_device(DEVICE)

    test_df = pd.read_csv(TEST_CSV)
    test_loader = DataLoader(
        HAM10000Dataset(test_df, transform=test_transform),
        batch_size=BATCH_SIZE, shuffle=False, num_workers=4,
    )

    model = build_model(num_classes=NUM_CLASSES).to(device)
    model = load_checkpoint(model, CHECKPOINT_PATH, device)

    y_true, y_pred, y_probs = collect_predictions(model, test_loader, device)

    report = classification_report(
        y_true, y_pred, labels=list(range(NUM_CLASSES)), target_names=CLASS_NAMES,
        output_dict=True, zero_division=0,
    )
    accuracy = report["accuracy"]
    macro_f1 = report["macro avg"]["f1-score"]

    try:
        roc_auc = roc_auc_score(y_true, y_probs, multi_class="ovr", average="macro", labels=list(range(NUM_CLASSES)))
    except ValueError:
        roc_auc = None  # e.g. a class missing entirely from the test split

    print(f"Test accuracy: {accuracy:.4f}")
    print(f"Macro F1: {macro_f1:.4f}")
    print(f"Macro ROC-AUC (OVR): {'n/a' if roc_auc is None else f'{roc_auc:.4f}'}")
    print(classification_report(
        y_true, y_pred, labels=list(range(NUM_CLASSES)), target_names=CLASS_NAMES, zero_division=0
    ))

    with open(os.path.join(OUTPUT_DIR, "evaluation_report.json"), "w") as f:
        json.dump({
            "accuracy": accuracy,
            "macro_f1": macro_f1,
            "roc_auc_macro_ovr": roc_auc,
            "per_class": report,
        }, f, indent=2)

    cm = confusion_matrix(y_true, y_pred, labels=list(range(NUM_CLASSES)))
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=CLASS_NAMES)
    fig, ax = plt.subplots(figsize=(8, 8))
    disp.plot(ax=ax, xticks_rotation=45, cmap="Blues", colorbar=False)
    fig.tight_layout()
    fig.savefig(os.path.join(OUTPUT_DIR, "confusion_matrix.png"), dpi=150)

    print(f"\nSaved: {OUTPUT_DIR}/evaluation_report.json, {OUTPUT_DIR}/confusion_matrix.png")


if __name__ == "__main__":
    main()
