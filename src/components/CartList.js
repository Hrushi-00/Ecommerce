import React, { useState,  } from "react";
import "./Cart.css";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";
const ProductSummaryPage = ({ items }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(
    items.map((item) => item.quantity || 1)
  );

  const calculateTotalPrice = () => {
    return items
      .reduce((total, item, index) => {
        const price = parseFloat(item.price);
        return total + price * quantity[index];
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div className="work-container" key={item.id}>
          <div className="project-container"> 
            <div className="project-card">
              <div className="product-cart-main">
                <div className="product-card">
                  <img src={item.image} alt={item.title} />
                  <h2 className="project-title">{item.title}</h2>
                  <p className="product-price">
                    Price: ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
                <div className="quantity-controls">
                  <button
                    className="btn1"
                    onClick={() => {
                      const updatedQuantity = [...quantity];
                      if (updatedQuantity[index] > 1) {
                        updatedQuantity[index] -= 1;
                        setQuantity(updatedQuantity);
                      }
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      position: "relative",
                      bottom: -1,
                      padding: "0px 0px 0px 25px ",
                      marginLeft: "8px",
                    }}
                  >
                    {quantity[index]}
                  </span>
                  <button
                    className="btn1"
                    onClick={() => {
                      const updatedQuantity = [...quantity];
                      updatedQuantity[index] += 1;
                      setQuantity(updatedQuantity);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div className="total-price">
          Total Price: ${calculateTotalPrice()}
          <Link to="/paymentdetail" className="checkout-button btn1">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductSummaryPage;
