import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import os

data = pd.DataFrame({
    "age": [25, 40, 60],
    "cost": [2000, 5000, 9000]
})

X = data[["age"]]
y = data["cost"]

model = LinearRegression()
model.fit(X, y)

os.makedirs("app/ml", exist_ok=True)

with open("app/ml/model.pkl", "wb") as f:
    pickle.dump(model, f)
