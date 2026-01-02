import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "./Addcart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [message, setMessage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch related products
  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products/products?page=1&limit=8`
      );
      setRelatedProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${API_URL}/api/products/clearcart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearCart());
      setMessage("Cart cleared successfully");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Failed to clear cart");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/removefromcart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(removeItem(id));
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {message && <p className="success-msg">{message}</p>}

        {/* ================= EMPTY CART UI ================= */}
        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart-icon">
              <FiShoppingCart />
            </div>

            <h2>Your cart is empty</h2>
            <p>Looks like you haven’t added anything yet</p>

            <button
              className="empty-cart-btn"
              onClick={() => navigate("/product")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* ================= CART WITH ITEMS ================= */
          <div className="cart-layout">
            {/* LEFT */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-card" key={item._id}>
                  <img src={item.image} alt={item.title} />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>₹{item.price}</p>

                    <div className="qty">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity(item._id))
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantity(item._id))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="summary">
              <h2>Order Summary</h2>
              <p>Items: {cartItems.length}</p>
              <h3>Total: ₹{calculateTotal()}</h3>

              <button
                className="checkout"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>

              <button className="clear" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}

        {/* ================= RELATED PRODUCTS ================= */}
        <section className="related">
          <h2>You may also like</h2>

          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div className="related-card" key={item._id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>

                <button
                  className="btn1"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Addcart;
