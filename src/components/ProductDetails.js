import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { ToastContainer, toast } from "react-toastify"; // ✅ Toastify import
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify styles
const API_URL = process.env.REACT_APP_API_URL;
const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
    const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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
  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
   <>
   <Navbar />
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="product-details-card">
        <img
          src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.title}
          className="details-image"
        />
        <div className="details-info">
          <h1>{product.title}</h1>
          <p className="price">₹{product.price}</p>
          <p className="desc">{product.description || "No description available."}</p>
          <p>Category: {product.category || "N/A"}</p>
          <p>Rating: ⭐ {product.rating || "No rating"}</p>

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
   </>
  );
};

export default ProductDetails;
