import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

const Carts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]); // filtered product list
  const [activeTab, setActiveTab] = useState("best"); // active tab
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Toast helper
  const showMessage = (text, type = "info") => {
    toast[type](text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/products`);
        const data = await res.json();
        setProducts(data);
        setFiltered(data); // default show all
      } catch (error) {
        console.error("Error fetching products:", error);
        showMessage("Failed to load products", "error");
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch favorites for current user
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

  // ✅ Handle tab change (Best Sellers, New Arrivals, Hot Sales)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let sorted = [...products];

    if (tab === "best") {
      sorted.sort((a, b) => b.rating - a.rating); // highest rated
    } else if (tab === "new") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // latest
    } else if (tab === "hot") {
      sorted.sort((a, b) => b.price - a.price); // highest price
    }

    setFiltered(sorted);
  };

  // ✅ Add favorite
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

  // ✅ Remove favorite
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

      if (res.data.success) {
        dispatch(addItem(product)); // Add to Redux
        showMessage("Product added to cart successfully!", "success");
      } else {
        showMessage(res.data.message || "Failed to add to cart.", "warning");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showMessage("Error adding product to cart.", "error");
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

  // ✅ Navigate to product details
  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="work-container">
      <h1 className="project-heading">Products</h1>

      {/* ✅ Top Tabs Section */}
      <div className="product-tabs">
        <span
          className={activeTab === "best" ? "tab active" : "tab"}
          onClick={() => handleTabChange("best")}
        >
          Best Sellers
        </span>
        <span
          className={activeTab === "new" ? "tab active" : "tab"}
          onClick={() => handleTabChange("new")}
        >
          New Arrivals
        </span>
        <span
          className={activeTab === "hot" ? "tab active" : "tab"}
          onClick={() => handleTabChange("hot")}
        >
          Hot Sales
        </span>
      </div>

      {/* ✅ Product Grid */}
      <div className="main-project-container">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div
              key={product._id}
              className="main-project-card"
              onClick={() => handleCardClick(product)}
            >
              <div className="product">
                {/* Favorite Icon */}
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

                {/* Product Image */}
                <img
                  src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={product.title}
                />

                {/* Product Info */}
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

      <ToastContainer />
    </div>
  );
};

export default Carts;
