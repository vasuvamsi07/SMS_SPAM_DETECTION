from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/')
def home():
    return "Welcome to SMS Spam Detection API"

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        return jsonify({"message": "Use POST request to send data"}), 405  # Status 405: Method Not Allowed

    # Handling POST request
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"error": "Missing 'message' field"}), 400  # Status 400: Bad Request

    # Example prediction logic (Replace with your model logic)
    spam_keywords = ["lottery", "win", "prize", "free"]
    prediction = "spam" if any(word in data['message'].lower() for word in spam_keywords) else "ham"

    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
