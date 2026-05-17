import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../supabaseClient";

function Cart({
  cart,
  user,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first before checkout");
      return;
    }

    if (!phone || !address || !city) {
      toast.error("Please fill phone, address, and city");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        phone,
        city,
        address,
        items: cart,
        total,
      },
    ]);

    if (error) {
      toast.error("Order failed");
      console.log(error);
      return;
    }

    clearCart();
    toast.success("Order placed successfully");
    setPhone("");
    setAddress("");
    setCity("");
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {!user && (
        <div className="cart-box">
          <p>Please login first to complete your order.</p>
          <Link to="/login">
            <button>Login Now</button>
          </Link>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="cart-box">
          <p>No products added yet.</p>
          <Link to="/products">
            <button>Go Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <div className="quantity-box">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>Delivery Information</h3>

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <textarea
              placeholder="Full Address / Location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <div className="cart-total">
              <h3>Total: ${total}</h3>
              <button type="submit">Checkout</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;