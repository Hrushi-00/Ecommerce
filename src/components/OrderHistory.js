import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log("Order fetch error:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
              onClick={() => navigate(`/order/${order._id}`, { state: { order } })}
            >
              <h3>Order ID: {order._id}</h3>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Status: {order.orderStatus}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
