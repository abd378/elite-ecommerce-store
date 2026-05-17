import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const enableSound = async () => {
    try {
      const audio = new Audio("/notification.mp3");

      audio.volume = 1;

      audio.loop = false;

      await audio.play();

      audio.pause();

      audio.currentTime = 0;

      window.notificationAudio = audio;

      setSoundEnabled(true);

      toast.success("🔊 Sound Enabled");
    } catch (error) {
      console.log(error);

      toast.error("Browser blocked sound");
    }
  };

  const playNotificationSound = () => {
    if (!soundEnabled) return;

    try {
      if (window.notificationAudio) {
        window.notificationAudio.currentTime = 0;

        window.notificationAudio.play();
      } else {
        const audio = new Audio("/notification.mp3");

        audio.volume = 1;

        audio.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "#081120",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Toaster />

        <h1>CodeAlpha Store</h1>

        <button
          onClick={enableSound}
          style={{
            padding: "15px 25px",
            border: "none",
            borderRadius: "12px",
            background: "#f59e0b",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🔔 Enable Sound
        </button>

        <button
          onClick={playNotificationSound}
          style={{
            padding: "15px 25px",
            border: "none",
            borderRadius: "12px",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🔊 Test Notification Sound
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;