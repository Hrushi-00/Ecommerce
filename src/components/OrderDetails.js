import React from "react";
import "./OrderDetails.css";

import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <h2>Order details not found</h2>;

  return (
    <div className="order-details">
      <h1>Order Details</h1>

      <h3>Order ID: {order._id}</h3>
      <p>Status: {order.orderStatus}</p>
      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

      <h2>Items</h2>
      <div className="items-list">
        {order.orderItems.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt="" />
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
            <strong>₹{item.price * item.quantity}</strong>
          </div>
        ))}
      </div>

      <h2>Total: ₹{order.totalAmount}</h2>
    </div>
  );
};

export default OrderDetails;
