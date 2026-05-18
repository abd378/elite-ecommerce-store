import { Link } from "react-router-dom";

function ActivityFeed() {
  const activities = [
    {
      text: "🛒 New luxury perfume order",
      path: "/admin-orders",
    },
    {
      text: "⚡ User joined Nexus platform",
      path: "/register",
    },
    {
      text: "🎮 Gaming headset trending now",
      path: "/products",
    },
    {
      text: "🤖 Nexus AI processed request",
      path: "/",
    },
    {
      text: "💎 Premium watch added to cart",
      path: "/cart",
    },
    {
      text: "📦 New realtime order received",
      path: "/admin-orders",
    },
  ];

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h3>LIVE ACTIVITY</h3>
        <span></span>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => (
          <Link to={item.path} key={index} className="activity-item">
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;