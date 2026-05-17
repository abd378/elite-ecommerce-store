import { Link } from "react-router-dom";
import { useEffect } from "react";

function Checkout() {
  useEffect(() => {
    const sendNotification = async () => {
      try {
        await fetch("/api/send-order-notification", {
          method: "POST",
        });
      } catch (error) {
        console.log(error);
      }
    };

    sendNotification();
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div className="success-icon">✓</div>

        <h2>Order Confirmed!</h2>

        <p>Your order has been placed successfully.</p>

        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;