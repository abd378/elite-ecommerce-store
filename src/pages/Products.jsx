import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.name || "";
    const category = product.category || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <section className="products-section">
      <h2 className="section-title">Futuristic Products</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search futuristic products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="futuristic-search"
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <span className="category-badge">
              {product.category || "Product"}
            </span>

            <p>${product.price}</p>

            <div className="product-buttons">
              <button onClick={() => addToCart(product)}>
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
    </section>
  );
}

export default Products;