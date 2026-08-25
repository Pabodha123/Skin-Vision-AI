import random

import numpy as np
import pandas as pd
import torch
from sklearn.model_selection import StratifiedGroupKFold


def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)


def get_device(preferred="cuda"):
    return torch.device(preferred if torch.cuda.is_available() else "cpu")


def save_checkpoint(model, path):
    torch.save(model.state_dict(), path)


def load_checkpoint(model, path, device):
    model.load_state_dict(torch.load(path, map_location=device))
    return model


class AverageMeter:
    """Tracks a running average of a metric (e.g. loss) across batches."""

    def __init__(self):
        self.sum = 0.0
        self.count = 0

    def update(self, value, n=1):
        self.sum += value * n
        self.count += n

    @property
    def avg(self):
        return self.sum / self.count if self.count else 0.0


def split_dataframe(df, val_frac=0.15, test_frac=0.15, seed=42):
    """Train/val/test split, grouped by lesion_id (so the same lesion never spans
    two splits) and stratified by label (so rare classes appear in every split)."""
    test_splits = max(2, round(1 / test_frac))
    sgkf_test = StratifiedGroupKFold(n_splits=test_splits, shuffle=True, random_state=seed)
    train_val_idx, test_idx = next(
        sgkf_test.split(df, df["label"], df["lesion_id"])
    )
    train_val_df = df.iloc[train_val_idx].reset_index(drop=True)
    test_df = df.iloc[test_idx].reset_index(drop=True)

    remaining_val_frac = val_frac / (1 - test_frac)
    val_splits = max(2, round(1 / remaining_val_frac))
    sgkf_val = StratifiedGroupKFold(n_splits=val_splits, shuffle=True, random_state=seed)
    train_idx, val_idx = next(
        sgkf_val.split(train_val_df, train_val_df["label"], train_val_df["lesion_id"])
    )
    train_df = train_val_df.iloc[train_idx].reset_index(drop=True)
    val_df = train_val_df.iloc[val_idx].reset_index(drop=True)

    return train_df, val_df, test_df


def compute_class_weights(df, num_classes):
    """Inverse-frequency class weights for CrossEntropyLoss, to counter HAM10000's
    heavy imbalance (nv makes up ~67% of the data, df/vasc under 1.5% each)."""
    counts = df["label"].value_counts().reindex(range(num_classes), fill_value=0).to_numpy()
    weights = counts.sum() / (num_classes * np.maximum(counts, 1))
    return torch.tensor(weights, dtype=torch.float32)
