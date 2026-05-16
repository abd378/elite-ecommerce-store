 HEAD
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="overlay">
        <h2>Modern E-Commerce Experience</h2>

        <p>Discover premium products with a smooth shopping experience.</p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
    </section>
  );
}


import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="overlay">
        <h2>Modern E-Commerce Experience</h2>

        <p>Discover premium products with a smooth shopping experience.</p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
    </section>
  );
}

export default Home;