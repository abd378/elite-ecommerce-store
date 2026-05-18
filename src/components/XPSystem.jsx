function XPSystem({ user }) {
  const xp = 720;

  const level = Math.floor(xp / 100);

  const progress = xp % 100;

  let rank = "BRONZE";

  if (level >= 5) rank = "SILVER";

  if (level >= 10) rank = "GOLD";

  if (level >= 15) rank = "DIAMOND";

  return (
    <div className="xp-system">
      <div className="xp-header">
        <h3>NEXUS PROFILE</h3>

        <span>{rank}</span>
      </div>

      <div className="xp-user">
        <div className="xp-avatar">
          {user?.name?.charAt(0) || "U"}
        </div>

        <div>
          <h2>{user?.name || "Guest User"}</h2>

          <p>Level {level}</p>
        </div>
      </div>

      <div className="xp-bar">
        <div
          className="xp-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <div className="xp-stats">
        <span>{xp} XP</span>

        <span>{progress}%</span>
      </div>
    </div>
  );
}

export default XPSystem;