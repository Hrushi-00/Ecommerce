import React, { useState } from "react";
import "./Cart.css";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const CartWork = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddItem = () => {
    if (!token) {
      alert("Please login first to add items to cart!");
      window.location.href = "/login";
      return;
    }
    dispatch(addItem(props.items));
    alert(" Product added to cart!");
  };

  const handleAddFavorite = async () => {
    if (!token) {
      alert("Please login first to add favorites!");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        ` /${props.items._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setIsFavorite(true);
        alert("❤️ Added to favorites!");
      } else {
        alert(res.data.message || "Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("❌ Error adding to favorites");
    }
  };

  // ⭐ Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="rating-stars">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={`full-${i}`} className="star">
              ★
            </span>
          ))}
        {hasHalfStar && <span className="star half">★</span>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
              ☆
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="main-project-card">
      <div className="product">
        {/* ❤️ Favorite Icon */}
        <div className="favorite-icon" onClick={handleAddFavorite}>
          {isFavorite ? (
            <FaHeart className="heart filled" />
          ) : (
            <FaRegHeart className="heart" />
          )}
        </div>

        <img src={props.items.image} alt={props.items.title} />

        <div className="pro-details">
          <h2 className="project-title">{props.items.title}</h2>
          <p>Price: ₹{props.items.price}</p>
          <div className="rating">{renderStars(props.items.rating)}</div>

          <div className="pro-btns">
            <button className="btn1" onClick={handleAddItem}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartWork;
