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

export default App;