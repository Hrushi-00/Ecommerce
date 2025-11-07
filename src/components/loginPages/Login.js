import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
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

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // login API
        const { data } = await axios.post(
          `${API_URL}/api/auth/login`,
          { email: formData.email, password: formData.password },
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/profile");
      } else {
        // signup API
        const { data } = await axios.post(
          `${API_URL}/api/auth/signup`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("token", data.token);
        alert("Signup successful!");
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Signup-only fields */}
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </>
          )}

          {/* Common fields */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-button" disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>
        </form>

        <p className="toggle-prompt">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
