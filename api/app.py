import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the trained model and vectorizer
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['message']
    transformed_data = vectorizer.transform([data])
    prediction = model.predict(transformed_data)[0]
    
    return jsonify({"spam": bool(prediction)})

if __name__ == '__main__':
    app.run(debug=True)

