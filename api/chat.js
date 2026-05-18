export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please write a question first.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "OpenAI API key is missing in Vercel.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "You are Nexus AI, a futuristic smart shopping assistant for CodeAlpha Ecommerce Store. Be helpful, friendly, creative, and answer any user question clearly. If the user asks about products, recommend options like perfumes, watches, headphones, keyboards, phones, laptops, shoes, and bags. Keep answers short and useful.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("OpenAI error:", data);

      return res.status(500).json({
        reply: "AI service error. Check OpenAI API key or billing.",
      });
    }

    return res.status(200).json({
      reply:
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "Sorry, I could not answer right now.",
    });
  } catch (error) {
    console.log("Server error:", error);

    return res.status(500).json({
      reply: "AI server error. Please try again.",
    });
  }
}