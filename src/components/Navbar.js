import "./NavbarStyle.css";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import React, { useEffect, useState,useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { FaBars, FaTimes, FaUserAlt, FaHeart } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import axios from "axios";
import debounce from "lodash.debounce";
// import React, { useState, useEffect, useCallback } from "react";
// import debounce from "lodash.debounce";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const token = localStorage.getItem("token");

  // =============================
  // Handlers
  // =============================

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleSearch = () => {
    setSearch(!search);
    document.body.classList.toggle("search-active");
    setSearchText("");
    setSearchResults([]);
  };

  const changeColor = () => setColor(window.scrollY >= 100);

  const carthandler = () => navigate("/addtocart");
  const homeHandler = () => navigate("/");
  const favoriteHandler = () => navigate("/favorites");
  const userhandler = () => (token ? navigate("/profile") : navigate("/login"));

  // =============================
  // Cart + Favorite Count
  // =============================

  useEffect(() => {
    const count = cartItems.length;
    setCartCount(count);
    localStorage.setItem("cartCount", count);
  }, [cartItems]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/products/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.favorites) setFavoriteCount(res.data.favorites.length);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    setCartCount(savedCount);
  }, []);

  window.addEventListener("scroll", changeColor);

  // =============================
  // Search Functionality
  // =============================

 const searchProducts = async (value) => {
  if (!value.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    setLoading(true);
    const res = await axios.get(`http://localhost:8000/api/products/search?q=${value}`);
    setSearchResults(res.data.products || []);
  } catch (error) {
    console.error("Error searching:", error);
  } finally {
    setLoading(false);
  }
};

const handleSearchChange = useCallback(
  debounce((e) => {
    const value = e.target.value;
    searchProducts(value);
  }, 400),
  [] // empty dependency so debounce instance doesn't reset every render
);


  // =============================
  // Render
  // =============================

  return (
    <>
     {search ? (
 <div className="Search-input slide-in">
  <div className="cross" onClick={handleSearch}>+</div>

  <div className="search-container">
    <input
      id="search-products"
      name="search"
      type="text"
      placeholder="Search products..."
      className="search-write"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      autoFocus
      autoComplete="off"
      onKeyDown={(e) => {
        if (e.key === "Enter" && searchText.trim() !== "") {
          navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
          setSearch(false);
          setSearchText("");
        }
      }}
    />
  </div>
</div>

) : (
  /* your other navbar code */
<>
          {/* ======= Top Navbar ======= */}
          <div className={color ? "header header-bg" : "header"}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>

            {/* ======= Nav Menu ======= */}
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {click && (
                <div className="menu-close" onClick={closeMenu}>
                  <FaTimes size={25} />
                </div>
              )}
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
              <li><Link to="/pages" onClick={closeMenu}>Pages</Link></li>
              <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>

            {/* ======= Right Section ======= */}
            <div className="right-icons">
              {/* ======= Desktop Icons ======= */}
              <div className="desktop-icons">
                <IoIosSearch className="search-icon" onClick={handleSearch} title="Search" />
                <div className="favorite" onClick={favoriteHandler}>
                  <FaHeart size={25} style={{ color: "#000" }} />
                  {favoriteCount > 0 && <span>{favoriteCount}</span>}
                </div>
                <div className="cart-icon" onClick={carthandler}>
                  <IoCartOutline size={25} />
                  {cartCount > 0 && <span>{cartCount}</span>}
                </div>
                <div className="user">
                  <FaUserAlt size={25} style={{ color: "#000" }} onClick={userhandler} />
                </div>
              </div>

              {/* ======= Mobile Icons ======= */}
              <div className="mobile-icons">
                <IoIosSearch className="search-icon" onClick={handleSearch} />
                <div className="hamburger" onClick={handleClick}>
                  {click ? (
                    <FaTimes size={22} style={{ color: "#000000" }} />
                  ) : (
                    <FaBars size={22} style={{ color: "#000000" }} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ======= Bottom Navigation (Mobile Only) ======= */}
          <div className="bottom-navbar">
            <div className="bottom-nav-item" onClick={homeHandler}>
              <MdHome size={24} />
              <span className="nav-label">Home</span>
            </div>
            <div className="bottom-nav-item" onClick={carthandler}>
              <IoCartOutline size={24} />
              <span className="nav-label">Cart</span>
            </div>
            <div className="bottom-nav-item" onClick={favoriteHandler}>
              <FaHeart size={24} />
              <span className="nav-label">Favorite</span>
            </div>
            <div className="bottom-nav-item" onClick={userhandler}>
              <FaUserAlt size={22} />
              <span className="nav-label">Profile</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
