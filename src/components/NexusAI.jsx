import { useState } from "react";

function NexusAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Welcome to Nexus AI. Ask me anything about products, orders, or shopping.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "I could not answer right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI connection error. Try again later.",
        },
      ]);
    }

    setLoading(false);
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
              <p>Real AI shopping assistant</p>
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

            {loading && <div className="nexus-msg ai">Thinking...</div>}
          </div>

          <div className="nexus-ai-input">
            <input
              value={input}
              placeholder="Ask anything..."
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