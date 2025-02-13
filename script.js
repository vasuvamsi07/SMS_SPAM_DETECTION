document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", function () {
        predictSpam();
    });
});

function predictSpam() {
    let userInput = document.getElementById("smsInput").value;

    if (userInput.trim() === "") {
        document.getElementById("result").innerText = "Please enter an SMS message.";
        return;
    }

    fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": userInput })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response:", data);
        document.getElementById("result").innerText = "Prediction: " + data.prediction;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error processing request.";
    });
}
