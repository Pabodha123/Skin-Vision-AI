import json
import os
from datetime import datetime, timezone

import cv2

from config import BASE_DIR

HISTORY_DIR = os.path.join(BASE_DIR, "history")
IMAGES_DIR = os.path.join(HISTORY_DIR, "images")
HISTORY_FILE = os.path.join(HISTORY_DIR, "history.jsonl")


def save_history_entry(image_bgr, predicted_code, predicted_name, confidence, risk_tier):
    """Append one scan to the local history log and save its image alongside it."""
    os.makedirs(IMAGES_DIR, exist_ok=True)

    # microsecond precision keeps filenames unique even for back-to-back scans
    timestamp = datetime.now(timezone.utc).isoformat(timespec="microseconds")
    filename = f"{timestamp.replace(':', '-')}_{predicted_code}.jpg"
    cv2.imwrite(os.path.join(IMAGES_DIR, filename), image_bgr)

    entry = {
        "timestamp": timestamp,
        "image_file": filename,
        "predicted_code": predicted_code,
        "predicted_name": predicted_name,
        "confidence": confidence,
        "risk_tier": risk_tier,
    }
    with open(HISTORY_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")

    return entry


def load_history():
    """All saved scans, most recent first."""
    if not os.path.exists(HISTORY_FILE):
        return []

    entries = []
    with open(HISTORY_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))

    entries.sort(key=lambda e: e["timestamp"], reverse=True)
    return entries


def history_image_path(entry):
    return os.path.join(IMAGES_DIR, entry["image_file"])
