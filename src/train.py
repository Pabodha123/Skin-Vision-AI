import os

import pandas as pd
import torch
from torch import nn, optim
from torch.utils.data import DataLoader

from config import BATCH_SIZE, DEVICE, LEARNING_RATE, NUM_CLASSES, NUM_EPOCHS
from dataset import HAM10000Dataset
from model import build_model
from transforms import train_transform, valid_transform
from utils import (
    AverageMeter,
    compute_class_weights,
    save_checkpoint,
    set_seed,
    split_dataframe,
)

SEED = 42
DATA_CSV = "../data/processed_metadata.csv"
MODEL_DIR = "../models"
OUTPUT_DIR = "../outputs"


def run_epoch(model, loader, criterion, device, optimizer=None, log_every=20, log_prefix=""):
    """One pass over `loader`. Trains if `optimizer` is given, otherwise just evaluates."""
    is_train = optimizer is not None
    model.train(is_train)

    loss_meter = AverageMeter()
    correct, total = 0, 0
    num_batches = len(loader)

    with torch.set_grad_enabled(is_train):
        for batch_idx, (images, labels) in enumerate(loader, start=1):
            images, labels = images.to(device), labels.to(device)

            if is_train:
                optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)

            if is_train:
                loss.backward()
                optimizer.step()

            loss_meter.update(loss.item(), images.size(0))
            correct += (outputs.argmax(dim=1) == labels).sum().item()
            total += labels.size(0)

            if log_prefix and (batch_idx % log_every == 0 or batch_idx == num_batches):
                print(
                    f"  {log_prefix} batch {batch_idx}/{num_batches} | "
                    f"running_loss={loss_meter.avg:.4f} running_acc={correct/total:.4f}",
                    flush=True,
                )

    return loss_meter.avg, correct / total


def main():
    set_seed(SEED)
    os.makedirs(MODEL_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    device = torch.device(DEVICE if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    df = pd.read_csv(DATA_CSV)
    train_df, val_df, test_df = split_dataframe(df, val_frac=0.15, test_frac=0.15, seed=SEED)
    test_df.to_csv(os.path.join(OUTPUT_DIR, "test_split.csv"), index=False)
    print(f"Train: {len(train_df)} | Val: {len(val_df)} | Test (held out): {len(test_df)}")

    train_loader = DataLoader(
        HAM10000Dataset(train_df, transform=train_transform),
        batch_size=BATCH_SIZE, shuffle=True, num_workers=4,
    )
    val_loader = DataLoader(
        HAM10000Dataset(val_df, transform=valid_transform),
        batch_size=BATCH_SIZE, shuffle=False, num_workers=4,
    )

    model = build_model(num_classes=NUM_CLASSES).to(device)

    class_weights = compute_class_weights(train_df, NUM_CLASSES).to(device)
    criterion = nn.CrossEntropyLoss(weight=class_weights)
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode="min", factor=0.5, patience=2)

    best_val_loss = float("inf")
    history = []

    for epoch in range(1, NUM_EPOCHS + 1):
        print(f"Epoch {epoch}/{NUM_EPOCHS} starting...", flush=True)
        train_loss, train_acc = run_epoch(
            model, train_loader, criterion, device, optimizer, log_prefix=f"epoch {epoch} [train]"
        )
        val_loss, val_acc = run_epoch(
            model, val_loader, criterion, device, log_prefix=f"epoch {epoch} [val]"
        )
        scheduler.step(val_loss)

        print(
            f"Epoch {epoch}/{NUM_EPOCHS} | "
            f"train_loss={train_loss:.4f} train_acc={train_acc:.4f} | "
            f"val_loss={val_loss:.4f} val_acc={val_acc:.4f}",
            flush=True,
        )

        history.append({
            "epoch": epoch,
            "train_loss": train_loss, "train_acc": train_acc,
            "val_loss": val_loss, "val_acc": val_acc,
        })

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            save_checkpoint(model, os.path.join(MODEL_DIR, "best_model.pth"))
            print(f"  -> new best model saved (val_loss={val_loss:.4f})")

    save_checkpoint(model, os.path.join(MODEL_DIR, "last_model.pth"))
    pd.DataFrame(history).to_csv(os.path.join(OUTPUT_DIR, "training_history.csv"), index=False)
    print("Training complete. Checkpoints in models/, history in outputs/training_history.csv")


if __name__ == "__main__":
    main()
