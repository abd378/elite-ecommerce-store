function CyberStats() {
  const stats = [
    {
      title: "TOTAL USERS",
      value: "12.4K",
      glow: "#00e5ff",
    },
    {
      title: "LIVE ORDERS",
      value: "328",
      glow: "#8b5cf6",
    },
    {
      title: "AI REQUESTS",
      value: "9.1K",
      glow: "#ff2bd6",
    },
    {
      title: "SYSTEM STATUS",
      value: "ONLINE",
      glow: "#22c55e",
    },
  ];

  return (
    <div className="cyber-stats-grid">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="cyber-stat-card"
          style={{ "--glow": stat.glow }}
        >
          <span>{stat.title}</span>
          <h2>{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default CyberStats;