import { useState } from "react";

function NexusAI() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Welcome to Nexus AI. Ask me anything.",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    let aiReply =
      "🤖 Nexus AI is learning. Smart recommendations coming soon.";

    const lower = input.toLowerCase();

    if (lower.includes("perfume")) {
      aiReply =
        "✨ Luxury perfumes are trending now.";
    }

    if (lower.includes("gaming")) {
      aiReply =
        "🎮 Gaming products section is highly active.";
    }

    if (lower.includes("cheap")) {
      aiReply =
        "💰 Budget friendly products are available.";
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "ai",
        text: aiReply,
      },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        className="nexus-ai-button"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className="nexus-ai-panel">
          <div className="nexus-ai-header">
            <h3>Nexus AI</h3>

            <span>ONLINE</span>
          </div>

          <div className="nexus-ai-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`nexus-msg ${msg.role}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="nexus-ai-input">
            <input
              type="text"
              placeholder="Ask Nexus AI..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
            />

            <button onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NexusAI;