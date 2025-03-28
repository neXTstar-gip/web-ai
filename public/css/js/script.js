document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const button = document.getElementById("sendButton");

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let message = input.value.trim();
        if (!message) return;

        appendMessage("User", message);
        input.value = "";

        fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=AI%20chatbot&content=${encodeURIComponent(message)}`)
            .then((res) => res.json())
            .then((data) => appendMessage("AI", data.data))
            .catch(() => appendMessage("AI", "Maaf, ada kesalahan."));
    }

    function appendMessage(sender, text) {
        const chatBox = document.getElementById("chatBox");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "User" ? "user-message" : "ai-message");
        messageDiv.innerHTML = `<b>${sender}:</b> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
