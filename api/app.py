import pickle
import numpy as np
from flask import Flask, request, jsonify

# Load vectorizer and model
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
model = pickle.load(open("model.pkl", "rb"))

app = Flask(__name__)

@app.route("/")
def home():
    return "SMS Spam Detection API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json["text"]
        text_vector = vectorizer.transform([data])  # Convert input to TF-IDF vector
        prediction = model.predict(text_vector)[0]  # Predict using model
        result = "Spam" if prediction == 1 else "Not Spam"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
