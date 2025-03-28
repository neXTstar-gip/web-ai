import { useState } from "react";
import axios from "axios"; // Pastikan Anda mengimpor axios
import styles from '../styles/style.module.css';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const defaultPrompt = "Kamu adalah AI chatbot yang suka ngasih jawaban lengkap dan bisa diskusi dengan AI lain."; // Prompt default

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Tambahin pesan user ke chat
        const newMessages = [...messages, { sender: "User ", text: input }];
        setMessages(newMessages);
        setInput("");

        let chatGptResponse = "";

        // Ambil jawaban dari ChatGPT
        try {
            const res = await axios.get(
                `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(defaultPrompt)}&content=${encodeURIComponent(input)}`
            );
            chatGptResponse = res.data.data || "Gw serahin ke Blackbox deh...";
        } catch (error) {
            chatGptResponse = "Gw serahin ke Blackbox deh...";
        }

        // Ambil jawaban dari BlackboxAI
        let blackboxResponse = "";
        try {
            const res = await axios.get(
                `https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${encodeURIComponent(input)}`
            );
            blackboxResponse = res.data.result || "";
        } catch (error) {
            blackboxResponse = "🖤 Blackbox: Gw kasih ke ChatGPT aja dehh...";
        }

        // Logika diskusi antara ChatGPT & BlackboxAI
        let finalResponse = "";
        if (chatGptResponse.includes("Gw serahin ke Blackbox") && blackboxResponse.includes("Gw kasih ke ChatGPT")) {
            finalResponse = "🖤 Blackbox: Bro lu bisa jawab?\n🤖 ChatGPT: Engga bro wakokowkoaw";
        } else if (!chatGptResponse.includes("Gw serahin") && !blackboxResponse.includes("Gw kasih")) {
            finalResponse = `🤖 ChatGPT:\n${chatGptResponse}\n\n🖤 Blackbox:\n${blackboxResponse}`;
        } else if (chatGptResponse.includes("Gw serahin")) {
            finalResponse = `🖤 Blackbox:\n${blackboxResponse}`;
        } else {
            finalResponse = `🤖 ChatGPT:\n${chatGptResponse}`;
        }

        // Tambahin jawaban ke chat
        setMessages([
            ...newMessages,
            { sender: "ChatGPT", text: chatGptResponse },
            { sender: "Blackbox", text: blackboxResponse }
        ]);
    };

    return (
        <div className={styles.container}>
            <div className="chat-header">💬 Chat AI (GPT & Blackbox)</div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} 
                        className={msg.sender === "User " ? "user-message" : msg.sender === "ChatGPT" ? "chatgpt-message" : "blackbox-message"}>
                        <b>{msg.sender}:</b> {msg.text}
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ketik pesan..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Kirim</button>
            </div>
        </div>
    );
}