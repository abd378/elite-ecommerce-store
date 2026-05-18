import { useState } from "react";

function NexusAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Welcome to Nexus AI. Ask me about products, orders, or recommendations.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const text = input.trim();

    let reply = "";

const lower = text.toLowerCase();

if (
  lower.includes("hello") ||
  lower.includes("hi")
) {
  reply =
    "👋 Welcome back to Nexus X.";
}

else if (
  lower.includes("perfume")
) {
  reply =
    "✨ Luxury perfumes are trending now inside the platform.";
}

else if (
  lower.includes("gaming")
) {
  reply =
    "🎮 Gaming products are one of the hottest categories.";
}

else if (
  lower.includes("cheap")
) {
  reply =
    "💰 I found budget-friendly products for you.";
}

else if (
  lower.includes("luxury")
) {
  reply =
    "💎 Luxury mode activated. Premium products recommended.";
}

else if (
  lower.includes("phone")
) {
  reply =
    "📱 Smart devices and accessories are available.";
}

else if (
  lower.includes("best")
) {
  reply =
    "🔥 The best-rated products are trending now.";
}

else if (
  lower.includes("order")
) {
  reply =
    "📦 Orders are processed in realtime through Nexus.";
}

else if (
  lower.includes("ai")
) {
  reply =
    "🤖 Nexus AI system is evolving every day.";
}

else {
  const randomReplies = [
    "⚡ Nexus AI is analyzing your request.",
    "🌌 Future commerce experience activated.",
    "🚀 Smart recommendations coming soon.",
    "💡 I can help you discover premium products.",
    "🧠 Nexus AI is learning from user activity.",
  ];

  reply =
    randomReplies[
      Math.floor(Math.random() * randomReplies.length)
    ];
}

    if (text.toLowerCase().includes("perfume")) {
      reply = "✨ I recommend checking luxury perfumes and premium scents.";
    } else if (text.toLowerCase().includes("gaming")) {
      reply = "🎮 Gaming products are perfect for a modern setup.";
    } else if (text.toLowerCase().includes("order")) {
      reply = "📦 You can track orders from the admin dashboard.";
    } else if (text.toLowerCase().includes("cheap")) {
      reply = "💰 I can help you find budget-friendly products.";
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: reply },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        type="button"
        className="nexus-ai-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        🤖
      </button>

      {open && (
        <div className="nexus-ai-panel">
          <div className="nexus-ai-header">
            <div>
              <h3>Nexus AI</h3>
              <p>Smart shopping assistant</p>
            </div>

            <button
              type="button"
              className="nexus-ai-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="nexus-ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`nexus-msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="nexus-ai-input">
            <input
              value={input}
              placeholder="Ask Nexus AI..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NexusAI;