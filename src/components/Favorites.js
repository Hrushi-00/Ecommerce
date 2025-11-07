import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import Navbar from "../components/Navbar";
const API_URL = process.env.REACT_APP_API_URL;
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/products/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    alert("Product added to cart!");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Add spacing below fixed navbar */}
      <div style={{ padding: "120px 20px 40px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            background: "linear-gradient(90deg,#0b536e,#ac2323)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Favorite Products
        </h1>

        {favorites.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {favorites.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  width: "250px",
                  textAlign: "center",
                  background: "#fff",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src={
                    item.image || "https://via.placeholder.com/250x200?text=No+Image"
                  }
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ marginTop: "10px", color: "#111" }}>{item.title}</h3>
                <p style={{ color: "#ac2323", fontWeight: "600" }}>
                  ₹{item.price}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{
                      backgroundColor: "#0b536e",
                      color: "white",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(item._id)}
                    style={{
                      backgroundColor: "#ac2323",
                      color: "white",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#555" }}>
            No favorite products yet.
          </p>
        )}
      </div>
    </>
  );
};

export default Favorites;
