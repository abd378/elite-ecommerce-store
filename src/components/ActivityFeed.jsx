function ActivityFeed() {
  const activities = [
    "🛒 New luxury perfume order",
    "⚡ User joined Nexus platform",
    "🎮 Gaming headset trending now",
    "🤖 Nexus AI processed request",
    "💎 Premium watch added to cart",
    "📦 New realtime order received",
  ];

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h3>LIVE ACTIVITY</h3>

        <span></span>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => (
          <div
            key={index}
            className="activity-item"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;