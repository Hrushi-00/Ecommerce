/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import paymentImg from "../assets/payment.png";
import logo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <img src={logo} alt="Website Logo" className="footer-logo" />
          <p className="description">
            The customer is at the heart of our unique business model, which includes design.
          </p>
          <div className="payment-icons">
            <img src={paymentImg} alt="Payment Methods" />
          </div>
        </div>

        {/* Shopping */}
        <div className="footer-section">
          <h3>SHOPPING</h3>
          <ul>
            <li><a href="#">Clothing Store</a></li>
            <li><a href="#">Trending Shoes</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="/sale">Sale</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>CUSTOMER SERVICE</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/payment-methods">Payment Methods</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/return-exchanges">Return & Exchanges</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>NEWSLETTER</h3>
          <p>
            Be the first to know about new arrivals, look books, sales & promos!
          </p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2025 All rights reserved | Made by{" "}
          <a
            href="https://hrushikesh.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hrushikesh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
