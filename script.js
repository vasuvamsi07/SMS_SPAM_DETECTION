document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    const checkButton = document.getElementById("checkButton");
    const resultDiv = document.getElementById("result");
    const smsInput = document.getElementById("smsInput");

    if (!checkButton || !resultDiv || !smsInput) {
        console.error("Error: Some HTML elements were not found!");
        return;
    }

    checkButton.addEventListener("click", async function () {
        const inputText = smsInput.value.trim();

        if (!inputText) {
            resultDiv.innerHTML = "<p style='color: red;'>Please enter a message!</p>";
            return;
        }

        try {
            console.log("Sending request to API...");

            let response = await fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: inputText })
            });

            if (!response.ok) {
                throw new Error("API request failed with status " + response.status);
            }

            let data = await response.json();
            console.log("API Response:", data);

            if (typeof data.result === "undefined") {
                resultDiv.innerHTML = "<p style='color: orange;'>Unexpected API response format!</p>";
                return;
            }

            if (data.result === 1) {
                resultDiv.innerHTML = "<p style='color: red; font-weight: bold;'>Spam!</p>";
            } else if (data.result === 0) {
                resultDiv.innerHTML = "<p style='color: green; font-weight: bold;'>Not Spam</p>";
            } else {
                resultDiv.innerHTML = "<p style='color: orange;'>Unexpected API response value.</p>";
            }

        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = "<p style='color: red;'>API Error: " + error.message + "</p>";
        }
    });
});
