document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("checkButton");
    const resultDiv = document.getElementById("result");

    if (!checkButton || !resultDiv) {
        console.error("Button or result div not found!");
        return;
    }

    checkButton.addEventListener("click", async function () {
        const inputText = document.getElementById("smsInput").value.trim();
        if (!inputText) {
            resultDiv.innerHTML = "<p style='color: red;'>Please enter a message!</p>";
            return;
        }

        try {
            // Using Fetch API with both GET and POST methods
            let response = await fetch("https://sms-spam-detection-cspy.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: inputText })
            });

            if (!response.ok) {
                throw new Error("Server Error: " + response.status);
            }

            let data = await response.json();
            console.log("API Response:", data);

            // Displaying result
            if (data.result === 1) {
                resultDiv.innerHTML = "<p style='color: red; font-weight: bold;'>Spam!</p>";
            } else {
                resultDiv.innerHTML = "<p style='color: green; font-weight: bold;'>Not Spam</p>";
            }

        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = "<p style='color: red;'>Error in prediction.</p>";
        }
    });
});
