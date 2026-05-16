 HEAD
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../supabaseClient";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast.error("Failed to load products");
      return;
    }

    setProducts(data);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      toast.error("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        category,
        price: Number(price),
        image,
      },
    ]);

    if (error) {
      toast.error("Failed to add product");
      return;
    }

    toast.success("Product added successfully");
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
    getProducts();
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
      return;
    }

    toast.success("Product deleted");
    getProducts();
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditPrice(product.price);
    setEditImage(product.image);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditCategory("");
    setEditPrice("");
    setEditImage("");
  };

  const updateProduct = async (id) => {
    if (!editName || !editCategory || !editPrice || !editImage) {
      toast.error("Please fill all edit fields");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: editName,
        category: editCategory,
        price: Number(editPrice),
        image: editImage,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update product");
      return;
    }

    toast.success("Product updated successfully");
    cancelEdit();
    getProducts();
  };

  return (
    <div className="admin-page">
      <h2>Admin Products</h2>

      <form className="checkout-form" onSubmit={addProduct}>
        <h3>Add New Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>

      <div className="orders-grid">
        {products.map((product) => (
          <div className="order-card" key={product.id}>
            {editId === product.id ? (
              <>
                <input
                  className="admin-edit-input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="text"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />

                <button
                  className="save-btn"
                  onClick={() => updateProduct(product.id)}
                >
                  Save
                </button>

                <button className="remove-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  className="admin-product-img"
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
                <p>
                  <b>Category:</b> {product.category}
                </p>
                <p>
                  <b>Price:</b> ${product.price}
                </p>

                <button
                  className="cart-btn"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="remove-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../supabaseClient";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast.error("Failed to load products");
      return;
    }

    setProducts(data);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      toast.error("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        category,
        price: Number(price),
        image,
      },
    ]);

    if (error) {
      toast.error("Failed to add product");
      return;
    }

    toast.success("Product added successfully");
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
    getProducts();
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
      return;
    }

    toast.success("Product deleted");
    getProducts();
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditPrice(product.price);
    setEditImage(product.image);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditCategory("");
    setEditPrice("");
    setEditImage("");
  };

  const updateProduct = async (id) => {
    if (!editName || !editCategory || !editPrice || !editImage) {
      toast.error("Please fill all edit fields");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: editName,
        category: editCategory,
        price: Number(editPrice),
        image: editImage,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update product");
      return;
    }

    toast.success("Product updated successfully");
    cancelEdit();
    getProducts();
  };

  return (
    <div className="admin-page">
      <h2>Admin Products</h2>

      <form className="checkout-form" onSubmit={addProduct}>
        <h3>Add New Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>

      <div className="orders-grid">
        {products.map((product) => (
          <div className="order-card" key={product.id}>
            {editId === product.id ? (
              <>
                <input
                  className="admin-edit-input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />

                <input
                  className="admin-edit-input"
                  type="text"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />

                <button
                  className="save-btn"
                  onClick={() => updateProduct(product.id)}
                >
                  Save
                </button>

                <button className="remove-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  className="admin-product-img"
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
                <p>
                  <b>Category:</b> {product.category}
                </p>
                <p>
                  <b>Price:</b> ${product.price}
                </p>

                <button
                  className="cart-btn"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="remove-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminProducts;