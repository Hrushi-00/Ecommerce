import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const AutoScrollProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/products/products?page=1&limit=6`
        );
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-scroll effect (UNCHANGED)
  useEffect(() => {
    if (loading) return;

    const scrollContainer = scrollRef.current;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 2;

        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [products, loading]);
  
  // Navigate to product details
  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // ✅ Skeleton Card (same layout)
  const SkeletonCard = () => (
    <div className="auto-card">
      <div className="auto-skeleton-img"></div>
      <div className="auto-skeleton-title"></div>
      <div className="auto-skeleton-text"></div>
      <div className="auto-skeleton-text small"></div>
    </div>
  );

  return (
    <div className="auto-scroll-main">
      <div className="auto-scroll-box" ref={scrollRef}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <>
            {products.map((product) => (
              <div
                className="auto-card"
                key={product._id}
                onClick={() => handleCardClick(product)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.title}
                  loading="lazy"
                />
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <p>⭐ {product.rating}</p>
              </div>
            ))}

            {/* Duplicate list for infinite loop */}
            {products.map((product) => (
              <div
                className="auto-card"
                key={product._id + "_dup"}
                onClick={() => handleCardClick(product)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.title}
                  loading="lazy"
                />
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <p>⭐ {product.rating}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AutoScrollProducts;
