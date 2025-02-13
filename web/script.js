async function predictSpam() {
    let text = document.getElementById("smsText").value;
    let response = await fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    let result = await response.json();
    document.getElementById("result").innerText = "Prediction: " + result.prediction;
}
