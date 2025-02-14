from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(_name_, static_folder='.')
CORS(app)

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        return jsonify({"message": "Use POST request to send data"}), 405

    # Handling POST request
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"error": "Missing 'message' field"}), 400

    # Example prediction logic (Replace with your model logic)
    spam_keywords = ["lottery", "win", "prize", "free"]
    prediction = "spam" if any(word in data['message'].lower() for word in spam_keywords) else "ham"

    return jsonify({"prediction": prediction})

if _name_ == '_main_':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
