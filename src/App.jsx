import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { supabase } from "./supabaseClient";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null);
  const [adminNotifications, setAdminNotifications] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isAdmin = user && user.role === "admin";

  const enableSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.volume = 1;

    audio
      .play()
      .then(() => {
        setSoundEnabled(true);
        toast.success("🔊 Notification sound enabled");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Browser blocked sound");
      });
  };

  const playNotificationSound = () => {
    if (!soundEnabled) return;

    const audio = new Audio("/notification.mp3");
    audio.volume = 1;

    audio.play().catch((err) => {
      console.log("Sound blocked:", err);
    });
  };

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel("admin-orders-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        () => {
          setAdminNotifications((prev) => prev + 1);
          playNotificationSound();
          toast.success("🔔 New Order Received!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, soundEnabled]);

  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    setUser(null);
    setCart([]);
    setAdminNotifications(0);
    setSoundEnabled(false);

    toast.success("Logged out");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <div className="app">
        <nav className="navbar">
          <h1>CodeAlpha Store</h1>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>

            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin-orders"
                    className="admin-link"
                    onClick={() => setAdminNotifications(0)}
                  >
                    Orders
                    {adminNotifications > 0 && (
                      <span className="notification-badge">
                        {adminNotifications}
                      </span>
                    )}
                  </Link>
                </li>

                <li><Link to="/admin-products">Products Admin</Link></li>
              </>
            )}
          </ul>

          <div className="nav-actions">
            {user ? (
              <div className="profile-box">
                <div className="profile-icon">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <span>{user.name}</span>

                {isAdmin && (
                  <button
                    onClick={enableSound}
                    className="cart-btn"
                    style={{
                      marginLeft: "10px",
                      background: soundEnabled
                        ? "linear-gradient(135deg,#00c853,#64dd17)"
                        : "linear-gradient(135deg,#ff9800,#ff5722)",
                    }}
                  >
                    {soundEnabled ? "🔊 Sound On" : "🔔 Enable Sound"}
                  </button>
                )}

                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="cart-btn">Login</button>
                </Link>

                <Link to="/register">
                  <button className="cart-btn">Register</button>
                </Link>
              </>
            )}

            <Link to="/cart">
              <button className="cart-btn">Cart ({cartCount})</button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                user={user}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
              />
            }
          />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/admin-orders"
            element={
              isAdmin ? (
                <AdminOrders />
              ) : (
                <div className="cart-page">
                  <div className="cart-box">
                    <h2>Access Denied</h2>
                    <p>Only admin can view this page.</p>
                  </div>
                </div>
              )
            }
          />

          <Route
            path="/admin-products"
            element={
              isAdmin ? (
                <AdminProducts />
              ) : (
                <div className="cart-page">
                  <div className="cart-box">
                    <h2>Access Denied</h2>
                    <p>Only admin can view this page.</p>
                  </div>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;