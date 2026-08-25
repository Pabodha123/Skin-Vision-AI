import pandas as pd

from dataset import HAM10000Dataset
from transforms import train_transform

df = pd.read_csv("../data/processed_metadata.csv")

dataset = HAM10000Dataset(
    dataframe=df,
    transform=train_transform
)

print("Dataset Size:", len(dataset))

image, label = dataset[0]

print("Image Shape:", image.shape)

print("Label:", label)