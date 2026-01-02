import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

/* SVG Arrow Icon */
const ArrowIcon = ({ direction = "right" }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}
  >
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AutoScrollProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  /* Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/products/products?page=1&limit=20`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* Wheel scroll (desktop) */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const onWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Drag scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const mouseUp = () => (isDown = false);
    const mouseLeave = () => (isDown = false);

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.3;
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mouseleave", mouseLeave);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mouseleave", mouseLeave);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="auto-scroll-main">
      {/* LEFT ARROW */}
      <button className="scroll-arrow left" onClick={() => scrollByAmount(-320)}>
        <ArrowIcon direction="left" />
      </button>

      <div className="auto-scroll-box" ref={scrollRef}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="auto-card skeleton" key={i} />
            ))
          : products.map((product) => (
              <div
                className="auto-card"
                key={product._id}
                onClick={() => handleCardClick(product)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.title}
                />
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <span>⭐ {product.rating}</span>
              </div>
            ))}
      </div>

      {/* RIGHT ARROW */}
      <button className="scroll-arrow right" onClick={() => scrollByAmount(320)}>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default AutoScrollProducts;
