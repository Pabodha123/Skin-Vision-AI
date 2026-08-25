import os

# absolute paths, so anything importing config.py resolves models/ correctly
# regardless of the process's working directory (e.g. app.py runs from the
# project root, not from src/)
SRC_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SRC_DIR)
MODELS_DIR = os.path.join(BASE_DIR, "models")

IMAGE_SIZE = 224

BATCH_SIZE = 32

NUM_CLASSES = 7

NUM_EPOCHS = 3  # TODO: bump back up (e.g. 15-20) for the real full training run

LEARNING_RATE = 0.0001

DEVICE = "cuda"

LABEL_MAP = {
    "akiec": 0,
    "bcc": 1,
    "bkl": 2,
    "df": 3,
    "mel": 4,
    "nv": 5,
    "vasc": 6
}

CLASS_NAMES = [
    "Actinic Keratosis",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Melanocytic Nevus",
    "Vascular Lesion"
]