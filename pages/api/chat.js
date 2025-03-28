export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message, prompt } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Default prompt kalau nggak diisi
    const defaultPrompt = "asisten yang ceria dan informatif,namun bisa cepat akrab dan gaul,serta bisa menggunakan bahsa kasar dan santai,tapi tetap hanya bercanda";
    const userPrompt = prompt || defaultPrompt;

    // 🔥 Request ke GPT-3
    const gptResponse = await fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(userPrompt)}&content=${encodeURIComponent(message)}`);
    const gptData = await gptResponse.json();

    // ⚡ Request ke BlackboxAI
    const blackboxResponse = await fetch(`https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${encodeURIComponent(message)}`);
    const blackboxData = await blackboxResponse.json();

    // 🔗 Gabung Output GPT & BlackboxAI
    let finalReply = `🤖 GPT-3: ${gptData?.data || "❌ Error"}\n\n⚡ BlackboxAI: ${blackboxData?.data || "❌ Error"}`;

    res.status(200).json({ reply: finalReply });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
