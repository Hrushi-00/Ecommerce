import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./SearchResults.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/products/search?q=${query}`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="search-results-container">
        <h2>Search results for: “{query}”</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="search-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="search-card"
                onClick={() =>
                  navigate(`/product/${product._id}`, { state: { product } })
                }
              >
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
        )}
      </div>
    </>
  );
};

export default SearchResults;
