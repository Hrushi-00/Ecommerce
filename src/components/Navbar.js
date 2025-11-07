import "./NavbarStyle.css";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { FaBars, FaTimes, FaUserAlt, FaHeart } from "react-icons/fa";
import Search from "./Search";
import axios from "axios";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const token = localStorage.getItem("token");

  // Toggle mobile menu
  const handleClick = () => setClick(!click);

  // Toggle search
  const handleSearch = () => {
    setSearch(!search);
  };

  // Navbar background on scroll
  const changeColor = () => {
    setColor(window.scrollY >= 100);
  };

  // Navigate to cart
  const carthandler = () => {
    navigate("/addtocart");
  };

  // Navigate to login/user
  // Navigate to user profile if logged in, else login page
const userhandler = () => {
  if (token) {
    navigate("/profile");
  } else {
    navigate("/login");
  }
};


  // Navigate to favorites
  const favoriteHandler = () => {
    navigate("/favorites");
  };

  // Update cart count from Redux
  useEffect(() => {
    const count = cartItems.length;
    setCartCount(count);
    localStorage.setItem("cartCount", count);
  }, [cartItems]);

  // Fetch favorite items count from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/products/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.favorites) {
          setFavoriteCount(res.data.favorites.length);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  // Initialize cart count on mount
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    setCartCount(savedCount);
  }, []);

  window.addEventListener("scroll", changeColor);

  return (
    <>
      {search ? (
        <Search search={search} handleSearch={handleSearch} />
      ) : (
        <div className={color ? "header header-bg" : "header"}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/pages">Pages</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <div className="search-bar">
              <IoIosSearch onClick={handleSearch} />
            </div>
          </ul>

          <div className="cart">
            {/* Favorite Icon */}
            <div className="favorite" onClick={favoriteHandler}>
              <FaHeart size={25} style={{ color: "#000" }} />
              {favoriteCount > 0 && <span>{favoriteCount}</span>}
            </div>

            {/* Cart Icon */}
            <IoCartOutline onClick={carthandler} />
            <span>{cartCount}</span>

            {/* User Icon */}
            <div className="user">
              <FaUserAlt size={25} style={{ color: "#000" }} onClick={userhandler} />
            </div>
          </div>

          <div className="hamburger" onClick={handleClick}>
            {click ? (
              <FaTimes size={20} style={{ color: "#000000" }} />
            ) : (
              <FaBars size={20} style={{ color: "#000000" }} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
