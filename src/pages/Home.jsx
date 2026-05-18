import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="nexus-home">
      <div className="nexus-orb"></div>

      <div className="nexus-hero-card">
        <span className="nexus-badge">
          NEXUS X • AI COMMERCE PLATFORM
        </span>

        <h1>
          Welcome to the Future of
          <span> Digital Shopping</span>
        </h1>

        <p>
          A futuristic ecommerce experience powered by realtime orders,
          admin control, smart design, sound alerts, and a cyberpunk interface.
        </p>

        <div className="nexus-actions">
          <Link to="/products">
            <button>Explore Products</button>
          </Link>

          <Link to="/products">
            <button className="nexus-secondary">
              Enter Platform
            </button>
          </Link>
        </div>

        <div className="nexus-stats">
          <div>
            <h3>Realtime</h3>
            <p>Orders</p>
          </div>

          <div>
            <h3>Admin</h3>
            <p>Command</p>
          </div>

          <div>
            <h3>Cyber</h3>
            <p>Design</p>
          </div>
        </div>
      </div>

      <div className="nexus-floating-panel panel-one">
        <span>LIVE STATUS</span>
        <strong>System Online</strong>
      </div>

      <div className="nexus-floating-panel panel-two">
        <span>AI MODE</span>
        <strong>Coming Next</strong>
      </div>
    </section>
  );
}

export default Home;