document.getElementById("predictForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let message = document.getElementById("messageInput").value;

    let response = await fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
    });

    let data = await response.json();
    document.getElementById("result").innerText = "Prediction: " + data.prediction;
});
