<div className="profile-box">
  <div className="profile-icon">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <span>{user.name}</span>

  {isAdmin && (
    <button
      onClick={enableSound}
      style={{
        marginLeft: "10px",
        padding: "10px 14px",
        border: "none",
        borderRadius: "10px",
        background: "orange",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🔔 Enable Sound
    </button>
  )}

  <button onClick={logout} className="logout-btn">
    Logout
  </button>
</div>