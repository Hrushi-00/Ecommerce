import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

const Carts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added only
  const [activeTab, setActiveTab] = useState("best");
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toast helper
  const showMessage = (text, type = "info") => {
    toast[type](text, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // Fetch products (logic unchanged)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products/products`);
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showMessage("Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch favorites
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

  // Tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let sorted = [...products];

    if (tab === "best") sorted.sort((a, b) => b.rating - a.rating);
    else if (tab === "new")
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (tab === "hot") sorted.sort((a, b) => b.price - a.price);

    setFiltered(sorted);
  };

  // Favorites
  const handleAddFavorite = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/products/addfavorite/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setFavorites((p) => [...p, productId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/products/favorites/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success)
        setFavorites((p) => p.filter((id) => id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFavorite = (productId) => {
    if (!token) {
      showMessage("Please login first!", "warning");
      window.location.href = "/login";
      return;
    }
    favorites.includes(productId)
      ? handleRemoveFavorite(productId)
      : handleAddFavorite(productId);
  };

  // Add to cart
  const handleAddToCart = async (product) => {
    if (!token) {
      showMessage("Please login first!", "warning");
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
        dispatch(addItem(product));
        showMessage("Added to cart!", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Stars
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < full) stars.push(<FaStar key={i} className="star-icon" />);
      else if (i === full && half)
        stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
      else stars.push(<FaRegStar key={i} className="star-icon" />);
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Skeleton card (same layout)
  const ProductSkeleton = () => (
    <div className="main-project-card">
      <div className="product">
        <div className="skeleton-img"></div>
        <div className="pro-details">
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-stars"></div>
          <div className="pro-btns">
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="work-container">
      <h1 className="project-heading">Products</h1>

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

      <div className="main-project-container">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : filtered.map((product) => (
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
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
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
            ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Carts;
