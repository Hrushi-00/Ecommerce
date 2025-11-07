import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const API_URL = process.env.REACT_APP_API_URL;
const Carts = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user's favorite items
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/api/products/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoriteIds = res.data.favorites.map((item) => item._id);
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  // Utility to show short messages
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  //  Add product to user's backend cart and Redux
  const handleAddToCart = async (product) => {
    if (!token) {
      showMessage("Please login first to add items to cart!");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/products/addtocart/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Add to Cart Response:", res.data);

      if (res.data.success) {
        dispatch(addItem(product)); // Add to Redux
        showMessage(" Product added to cart successfully!");
      } else {
        showMessage(res.data.message || " Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      if (error.response && error.response.data && error.response.data.message) {
        showMessage(error.response.data.message); // show backend message like "Already in cart"
      } else {
        showMessage(" Error adding product to cart.");
      }
    }
  };

  // Add to favorites
  const handleAddFavorite = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/products/addfavorite/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setFavorites((prev) => [...prev, productId]);
        showMessage("Product added to favorites!");
      } else {
        showMessage(res.data.message || "Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      showMessage("Error adding to favorites");
    }
  };

  // Remove from favorites
  const handleRemoveFavorite = async (productId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/products/favorites/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setFavorites((prev) => prev.filter((id) => id !== productId));
        showMessage("Product removed from favorites!");
      } else {
        showMessage(res.data.message || "Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      showMessage("Error removing favorite");
    }
  };

  // Toggle favorite (add/remove)
  const handleToggleFavorite = (productId) => {
    if (!token) {
      showMessage("Please login first to manage favorites!");
      window.location.href = "/login";
      return;
    }

    if (favorites.includes(productId)) {
      handleRemoveFavorite(productId);
    } else {
      handleAddFavorite(productId);
    }
  };

  return (
    <div className="work-container">
      <h1 className="project-heading">Products</h1>

      {/* Show message toast */}
      {message && <div className="message-toast">{message}</div>}

      <div className="main-project-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="main-project-card">
              <div className="product">
                {/* Favorite Icon */}
                <div
                  className="favorite-icon"
                  onClick={() => handleToggleFavorite(product._id)}
                >
                  {favorites.includes(product._id) ? (
                    <FaHeart className="heart filled" />
                  ) : (
                    <FaRegHeart className="heart" />
                  )}
                </div>

                {/* Product Image */}
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={product.title}
                />

                {/* Product Details */}
                <div className="pro-details">
                  <h2 className="project-title">{product.title}</h2>
                  <p>Price: ₹{product.price}</p>
                  <p>Rating: {product.rating}</p>

                  {/* Add to Cart Button */}
                  <div className="pro-btns">
                    <button
                      className="btn1"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Carts;
