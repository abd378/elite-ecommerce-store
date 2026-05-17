import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data);
    }
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        () => {
          alert("New order received!");
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
      <h2>Admin Orders Dashboard</h2>

      {orders.length === 0 ? (
        <div className="cart-box">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>

              <p><b>Name:</b> {order.user_name}</p>
              <p><b>Email:</b> {order.user_email}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>City:</b> {order.city}</p>
              <p><b>Address:</b> {order.address}</p>

              <div className="order-products">
                <b>Products:</b>
                {order.items?.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <h4>Total: ${order.total}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;