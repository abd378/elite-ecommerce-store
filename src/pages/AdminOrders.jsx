import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CyberStats from "../components/CyberStats";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-admin-page")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="admin-page">
      <h2 className="section-title">Admin Command Center</h2>

      <CyberStats />

      <h3 className="section-title">Realtime Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="cart-box">
          <h2>No Orders Yet</h2>
          <p>Orders will appear here in realtime.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>

              <p>
                <strong>User:</strong>{" "}
                {order.user_email || order.email || "Unknown User"}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ${order.total || order.total_price || "0"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status || "Pending"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : "No date"}
              </p>

              {order.items && Array.isArray(order.items) && (
                <div className="admin-order-items">
                  <strong>Items:</strong>

                  <div className="admin-items-grid">
                    {order.items.map((item, index) => (
                      <div className="admin-item-card" key={index}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="admin-product-img"
                        />

                        <h4>{item.name}</h4>

                        <p>${item.price}</p>

                        <span>Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;