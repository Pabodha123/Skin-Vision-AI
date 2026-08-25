import base64
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from history import history_image_path, load_history, save_history_entry
from predict import predict as run_prediction

app = FastAPI(title="SkinVision AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

RISK_LEVEL_MAP = {
    "lower_concern": "info",
    "needs_attention": "review",
    "professional_evaluation": "review",
}


def _encode_image(image_rgb: np.ndarray) -> str:
    """RGB uint8 array -> base64 JPEG data URI, for embedding directly in JSON."""
    image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
    ok, buf = cv2.imencode(".jpg", image_bgr)
    if not ok:
        raise RuntimeError("failed to encode image")
    encoded = base64.b64encode(buf.tobytes()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"


def _build_sections(rec: dict) -> list[dict]:
    return [
        {"heading": "What it means", "body": rec["description"]},
        {"heading": "Common characteristics", "body": " ".join(f"{c}." for c in rec["characteristics"])},
        {"heading": "What to watch for", "body": " ".join(f"{w}." for w in rec["warning_signs"])},
        {"heading": "When to seek professional advice", "body": rec["professional_advice"]},
    ]


@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    contents = await file.read()
    image_array = np.frombuffer(contents, dtype=np.uint8)
    image_bgr = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if image_bgr is None:
        raise HTTPException(status_code=400, detail="Could not read that image file.")

    result = run_prediction(image_bgr, top_k=3)

    if not result["is_likely_skin_image"]:
        raise HTTPException(
            status_code=422,
            detail=(
                "This doesn't look like a skin lesion photo. Please upload a clear, "
                "close-up photo of the skin area you want analyzed."
            ),
        )

    rec = result["recommendation"]

    entry = save_history_entry(
        image_bgr, result["predicted_code"], result["predicted_name"],
        result["confidence"], rec["risk_tier"],
    )
    dt = datetime.fromisoformat(entry["timestamp"])

    return {
        "id": entry["timestamp"],
        "date": dt.strftime("%d %b %Y"),
        "imageUrl": _encode_image(result["original_resized"]),
        "gradcam": {
            "original": _encode_image(result["original_resized"]),
            "heatmap": _encode_image(result["gradcam_heatmap"]),
            "overlay": _encode_image(result["gradcam_overlay"]),
        },
        "predictions": [
            {"label": p["name"], "confidence": round(p["confidence"] * 100, 1)}
            for p in result["top_predictions"]
        ],
        "riskLevel": RISK_LEVEL_MAP.get(rec["risk_tier"], "info"),
        "condition": {
            "name": rec["name"],
            "shortName": rec["short_name"],
            "plainLanguage": rec["description"],
            "sections": _build_sections(rec),
        },
    }


@app.get("/api/history")
async def get_history():
    entries = load_history()
    out = []
    for e in entries:
        dt = datetime.fromisoformat(e["timestamp"])
        out.append({
            "id": e["timestamp"],
            "date": dt.strftime("%d %b %Y"),
            "imageUrl": f"/api/history/image/{e['image_file']}",
            "label": e["predicted_name"],
            "confidence": round(e["confidence"] * 100, 1),
            "riskLevel": RISK_LEVEL_MAP.get(e["risk_tier"], "info"),
            "region": "Not specified",
            "timestamp": dt.timestamp() * 1000,
        })
    return out


@app.get("/api/history/image/{filename}")
async def get_history_image(filename: str):
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="invalid filename")
    path = history_image_path({"image_file": filename})
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="not found")
    return FileResponse(path, media_type="image/jpeg")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("API_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
