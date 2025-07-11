import React from "react";
import "./Cart.css";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const CartWork = (props) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(props.items));
  };

  // Render stars for the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if a half star is needed
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

    return (
      <div className="rating-stars">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={`full-${i}`} className="star">
              ★
            </span>
          ))}
        {hasHalfStar && (
          <span className="star half">★</span>
        )}
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
        <img src={props.items.imgsrc1} alt={props.items.title} />

        <div className="pro-details">
          <h2 className="project-title">{props.items.title}</h2>
          <p>Price: ${props.items.price}</p>
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
