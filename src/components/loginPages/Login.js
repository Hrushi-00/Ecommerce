import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const API_URL = process.env.REACT_APP_API_URL;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await axios.post(
          `${API_URL}/api/auth/login`,
          { email: formData.email, password: formData.password },
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/");
      } else {
        const { data } = await axios.post(
          `${API_URL}/api/auth/signup`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("token", data.token);
        alert("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="auth-subtext">
            {isLogin
              ? "Log in to access your account and continue shopping."
              : "Sign up to start your shopping journey with us!"}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Signup"}
            </button>
          </form>

          <p className="switch-mode">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
