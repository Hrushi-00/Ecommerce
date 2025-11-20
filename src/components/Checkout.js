import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "COD",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Total price
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Submit order
  const handlePlaceOrder = async () => {
    if (!formData.fullname || !formData.address) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/orders/placeorder`,
        {
          orderItems: cartItems,
          shippingInfo: formData,
          totalAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage("Order placed successfully!");
        setTimeout(() => {
          window.location.href = "/"; 
        }, 2000);
      }
    } catch (error) {
      console.error("Order Error:", error);
      setMessage("Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {message && <p className="checkout-msg">{message}</p>}

      <div className="checkout-content">
        {/* Shipping form */}
        <div className="checkout-form">
          <h2>Shipping Details</h2>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name *"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address *"
            onChange={handleChange}
          />

          <div className="inline-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            onChange={handleChange}
          />

          <h3>Payment Method</h3>
          <select
            name="paymentMethod"
            onChange={handleChange}
            value={formData.paymentMethod}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="summary-item" key={item._id}>
              <p>
                {item.title} × {item.quantity}
              </p>

              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}

          <hr />

          <h3>Total: ₹{totalAmount}</h3>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
