document.addEventListener("DOMContentLoaded", function() {
    const smsInput = document.getElementById("smsInput");
    const checkBtn = document.getElementById("checkBtn");
    const result = document.getElementById("result");

    checkBtn.addEventListener("click", async function() {
        const smsText = smsInput.value.trim();
        if (smsText === "") {
            result.textContent = "Please enter an SMS message.";
            result.style.color = "red";
            return;
        }

        // API endpoint
        const apiUrl = "https://sms-spam-detection-cspy.onrender.com/predict";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: smsText })
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            result.textContent = data.result ? "🚨 Spam Detected!" : "✅ Not Spam";
            result.style.color = data.result ? "red" : "green";
        } catch (error) {
            result.textContent = "Error: Could not get response from API.";
            result.style.color = "red";
            console.error("Error:", error);
        }
    });
});
