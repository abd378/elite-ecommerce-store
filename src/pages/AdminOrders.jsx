 HEAD
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // notification sound
  const playSound = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play();
  };

  // browser notification
  const showNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("🛒 New Order!", {
        body: "A customer placed a new order.",
      });
    }
  };

  // fetch orders
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

    // ask permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // realtime listener
    const channel = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("New Order:", payload);

          playSound();
          showNotification();

          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#111",
              color: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p><strong>Product:</strong> {order.product_name}</p>
            <p><strong>User:</strong> {order.user_email}</p>
            <p><strong>Price:</strong> ${order.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data);
  };

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

