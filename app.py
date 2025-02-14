from flask import Flask, request, render_template
import pickle

app = Flask(__name__)

# Load trained model and vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    message = request.form["message"]
    input_data = vectorizer.transform([message])
    prediction = model.predict(input_data)[0]

    result = "Spam" if prediction == 1 else "Not Spam"
    return render_template("index.html", prediction_text=f"Message is: {result}")

if __name__ == "__main__":
    app.run(debug=True)
