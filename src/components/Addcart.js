import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "./Addcart.css"; // External CSS file
import axios from "axios";
import {
  clearCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../utils/cartSlice";
const API_URL = process.env.REACT_APP_API_URL;
const Addcart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");

  // Save cart to local storage when changed
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

 
  // Clear cart (API + Redux)
 const handleClearCart = async () => {
  try {
    await axios.delete(`${API_URL}/api/products/clearcart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(clearCart());
    setMessage("All items removed from cart.");
    setTimeout(() => setMessage(""), 2000);
  } catch (error) {
    console.error("Error clearing cart:", error);
    setMessage("Failed to clear cart.");
    setTimeout(() => setMessage(""), 2000);
  }
};


  // Remove single item (API + Redux)
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/removefromcart/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(removeItem(itemId));
      setMessage("Item removed from cart.");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error removing item:", error);
      setMessage("Failed to remove item.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1 className="cart-heading">Your Shopping Cart</h1>

        {message && <div className="message">{message}</div>}

        {cartItems.length === 0 ? (
          <h2 className="empty-cart">Your cart is empty.</h2>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item, index) => (
                <div key={`${item._id}-${index}`} className="cart-item">
                  <div className="cart-item-details">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/120x100?text=No+Image"
                      }
                      alt={item.title}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
                      <p>₹{item.price}</p>

                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id))
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            dispatch(increaseQuantity(item._id))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <p>Total Items: {cartItems.length}</p>
              <p>Total Amount: ₹{calculateTotal()}</p>

              <div className="cart-buttons">
                <button className="clear-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button
                  className="checkout-btn"
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Addcart;
