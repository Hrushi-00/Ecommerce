import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ProductDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const showMessage = (text, type = "info") => {
    toast[type](text, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // ✅ Fetch product if not passed in state (e.g., direct link)
  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/products/${id}`);
          setProduct(res.data.product);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, product]);

  const handleAddToCart = async (product) => {
    if (!token) {
      showMessage("Please login first to add items to cart!");
      navigate("/login");
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
        showMessage("Product added to cart successfully!", "success");
      } else {
        showMessage(res.data.message || "Failed to add to cart.", "error");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showMessage("Error adding product to cart.", "error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <>
      <Navbar />
      <div className="product-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

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
