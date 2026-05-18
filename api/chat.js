export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",

          messages: [
            {
              role: "system",
              content:
                "You are Nexus AI, a futuristic smart shopping assistant for CodeAlpha Ecommerce Store. Answer all user questions clearly and naturally.",
            },

            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.7,

          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return res.status(500).json({
        reply:
          data.error?.message ||
          "Groq API error.",
      });
    }

    return res.status(200).json({
      reply:
        data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      reply: "AI server error.",
    });
  }
}