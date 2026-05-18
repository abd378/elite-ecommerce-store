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

    let reply = "🤖 I can help you explore products and choose the best option.";

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