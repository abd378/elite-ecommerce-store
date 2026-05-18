import { useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";

function Products({ addToCart }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search futuristic products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="futuristic-search"
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <span className="product-category">
              {product.category}
            </span>

            <p>${product.price}</p>

            <div className="product-buttons">
              <button
                onClick={() =>
                  addToCart(product)
                }
              >
                Add To Cart
              </button>

              <Link to={`/product/${product.id}`}>
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <h2>No futuristic products found</h2>
        </div>
      )}
    </div>
  );
}

export default Products;