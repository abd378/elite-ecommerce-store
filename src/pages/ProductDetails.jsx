import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div className="details-page">
      <div className="details-card">
        <img
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop"
          alt="Luxury Perfume"
        />

        <div className="details-info">
          <span className="category-badge">Beauty</span>

          <h2>Luxury Perfume</h2>

          <p className="details-price">$120</p>

          <p className="details-desc">
            A premium luxury perfume designed for a modern and elegant lifestyle.
            Perfect for daily use, special occasions, and professional events.
          </p>

          <div className="details-actions">
            <Link to="/products">
              <button>Back to Products</button>
            </Link>

            <Link to="/cart">
              <button className="details-cart-btn">Go to Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;