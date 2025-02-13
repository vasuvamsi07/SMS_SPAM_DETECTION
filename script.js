// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("checkBtn");
    const inputField = document.getElementById("smsInput");
    const resultDiv = document.getElementById("result");

    if (!checkButton || !inputField || !resultDiv) {
        console.error("One or more elements are missing in the HTML!");
        return;
    }

    checkButton.addEventListener("click", function () {
        const smsText = inputField.value.trim();

        if (smsText === "") {
            resultDiv.innerHTML = "Please enter a message.";
            return;
        }

        fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: smsText })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 1) {
                resultDiv.innerHTML = "🚨 Spam Message!";
                resultDiv.style.color = "red";
            } else {
                resultDiv.innerHTML = "✅ Not Spam!";
                resultDiv.style.color = "green";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.innerHTML = "Error contacting the server!";
        });
    });
});
