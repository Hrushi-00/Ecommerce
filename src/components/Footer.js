/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import paymentImg from "../assets/payment.png";
import logo from "../assets/footer-logo.png"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
        <img src={logo} alt="logo"/>
          <p className="description">
            The customer is at the heart of our unique business model, which includes design.
          </p>
          <div className="payment-icons">
            <img src={paymentImg} alt="Payment Methods" />
          </div>
        </div>

        <div className="footer-section">
          <h3>SHOPPING</h3>
          <ul>
            <li>Clothing Store</li>
            <li>Trending Shoes</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CUSTOMER SERVICE</h3>
          <ul>
            <li>Contact Us</li>
            <li>Payment Methods</li>
            <li>Delivery</li>
            <li>Return & Exchanges</li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>NEWSLETTER</h3>
          <p>Be the first to know about new arrivals, look books, sales & promos!</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email" />
            <button></button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © 2025 - All rights reserved | This website is made by <a href="https://hrushikesh.vercel.app/">Hrushikesh</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
