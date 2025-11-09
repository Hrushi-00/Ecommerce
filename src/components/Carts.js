import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // ✅ Toastify import
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify styles

const API_URL = process.env.REACT_APP_API_URL;

const Carts = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Toast utility
  const showMessage = (text, type = "info") => {
    toast[type](text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showMessage("Failed to load products", "error");
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch favorites
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

  // ✅ Add to favorites
  const handleAddFavorite = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/products/addfavorite/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setFavorites((prev) => [...prev, productId]);
        showMessage("Product added to favorites!", "success");
      } else {
        showMessage(res.data.message || "Failed to add favorite", "warning");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      showMessage("Error adding to favorites", "error");
    }
  };

  // ✅ Remove from favorites
  const handleRemoveFavorite = async (productId) => {
    try {
      const res = await axios.delete(`${API_URL}/api/products/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setFavorites((prev) => prev.filter((id) => id !== productId));
        showMessage("Product removed from favorites!", "info");
      } else {
        showMessage(res.data.message || "Failed to remove favorite", "warning");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      showMessage("Error removing favorite", "error");
    }
  };

  // ✅ Add to cart
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
  // ✅ Toggle favorites
  const handleToggleFavorite = (productId) => {
    if (!token) {
      showMessage("Please login first to manage favorites!", "warning");
      window.location.href = "/login";
      return;
    }

    if (favorites.includes(productId)) {
      handleRemoveFavorite(productId);
    } else {
      handleAddFavorite(productId);
    }
  };

  // ⭐ Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<FaStar key={i} className="star-icon filled" />);
      else if (i === fullStars && hasHalf)
        stars.push(<FaStarHalfAlt key={i} className="star-icon half" />);
      else stars.push(<FaRegStar key={i} className="star-icon empty" />);
    }
    return <div className="rating-stars">{stars}</div>;
  };

  // ✅ On card click → navigate to product details
  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="work-container">
      <h1 className="project-heading">Products</h1>

      <div className="main-project-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="main-project-card"
              onClick={() => handleCardClick(product)}
            >
              <div className="product">
                <div
                  className="favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(product._id);
                  }}
                >
                  {favorites.includes(product._id) ? (
                    <FaHeart className="heart filled" />
                  ) : (
                    <FaRegHeart className="heart" />
                  )}
                </div>

                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={product.title}
                />

                <div className="pro-details">
                  <h2 className="project-title">{product.title}</h2>
                  <p>Price: ₹{product.price}</p>
                  {renderStars(product.rating || 0)}

                  <div className="pro-btns">
                    <button
                      className="btn1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
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

      {/* ✅ Toast container to render notifications */}
      <ToastContainer />
    </div>
  );
};

export default Carts;
