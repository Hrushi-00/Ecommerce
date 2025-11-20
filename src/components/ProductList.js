import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const AutoScrollProducts = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
 const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/products?page=1&limit=6`);
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 2; // speed
        // loop back
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20); // interval speed

    return () => clearInterval(scrollInterval);
  }, [products]);
 // ✅ Navigate to product details
  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };
  return (
    <div className="auto-scroll-main">
      {/* <h1 className="auto-title">Auto Scrolling Products</h1> */}

      <div className="auto-scroll-box" ref={scrollRef}>
        {products.map((product) => (
          <div className="auto-card" key={product._id } onClick={() => handleCardClick(product)}>
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.title}
            />
             <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <p>⭐ {product.rating}</p>
          </div>
        ))}

        {/* Duplicate list for perfect infinite loop */}
        {products.map((product) => (
          <div className="auto-card" key={product._id + "_dup"} onClick={() => handleCardClick(product)}>
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.title}
            />
            <h4>{product.title}</h4>
            <p>₹{product.price}</p>
            <p>⭐ {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollProducts;
