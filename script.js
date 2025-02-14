document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    const checkButton = document.getElementById("checkButton");
    const resultDiv = document.getElementById("result");
    const smsInput = document.getElementById("smsInput");

    checkButton.addEventListener("click", async function () {
        const inputText = smsInput.value.trim();

        if (!inputText) {
            resultDiv.innerHTML = "<p style='color: red;'>Please enter a message!</p>";
            return;
        }

        try {
            console.log("Sending request to API...");

            let response = await fetch("/predict", {
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

            if (data.prediction === "spam") {
                resultDiv.className = "spam";
                resultDiv.textContent = "This message is SPAM!";
            } else {
                resultDiv.className = "ham";
                resultDiv.textContent = "This message is NOT spam";
            }

        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = "<p style='color: red;'>Error: " + error.message + "</p>";
        }
    });
});
