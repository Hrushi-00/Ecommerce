import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("profile"); // sidebar switch
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch Profile
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data.user || data);
      } catch {
        showMessage("Failed to load profile");
      }
    };

    fetchProfile();
  }, [token]);

  // Fetch Orders
  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data.orders || []);
      } catch {
        showMessage("Failed to load orders");
      }
    };

    fetchOrders();
  }, [activeTab]);

  // Update Profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/auth/editProfile`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Profile updated!");
    } catch {
      showMessage("Profile update failed");
    }
  };

  // Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/auth/changePassword`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Password changed!");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch {
      showMessage("Password change failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">

        {/* ========== LEFT SIDEBAR ========== */}
        <div className="sidebar">
          <button 
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => { setSelectedOrder(null); setActiveTab("profile"); }}
          >
            My Profile
          </button>

          <button 
            className={activeTab === "edit" ? "active" : ""}
            onClick={() => { setSelectedOrder(null); setActiveTab("edit"); }}
          >
            Edit Profile
          </button>

          <button 
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => { setSelectedOrder(null); setActiveTab("orders"); }}
          >
            My Orders
          </button>

          <button 
            className={activeTab === "password" ? "active" : ""}
            onClick={() => { setSelectedOrder(null); setActiveTab("password"); }}
          >
            Change Password
          </button>

          <button className="sidebar-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* ========== RIGHT CONTENT BOX ========== */}
        <div className="content-box">

          {message && <div className="toast-msg">{message}</div>}

          {/* ========== VIEW PROFILE ========== */}
          {activeTab === "profile" && profile && (
            <div className="profile-view">
              <h2>Your Profile</h2>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
            </div>
          )}

          {/* ========== EDIT PROFILE ========== */}
          {activeTab === "edit" && profile && (
            <form className="profile-form" onSubmit={handleProfileUpdate}>
              <h2>Edit Profile</h2>

              <input type="text" value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

              <input type="email" value={profile.email} readOnly />

              <input type="text" value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />

              <input type="text" value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })} />

              <button className="primary-btn">Save</button>
            </form>
          )}

          {/* ========== ORDERS LIST ========== */}
          {activeTab === "orders" && !selectedOrder && (
            <div className="orders-container">
              <h2>My Orders</h2>

              {orders.length === 0 ? <p>No Orders Found.</p> : (
                orders.map((order) => (
                  <div key={order._id} className="order-card"
                    onClick={() => setSelectedOrder(order)}>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ========== ORDER DETAILS ========== */}
          {selectedOrder && (
            <div className="order-details-page">
              <h2>Order Details</h2>

              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>

              <h3>Items</h3>
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt="" />
                  <div>
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.quantity * item.price}</p>
                  </div>
                </div>
              ))}

              <h3>Total: ₹{selectedOrder.totalAmount}</h3>

              <button
                className="primary-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Back to Orders
              </button>
            </div>
          )}

          {/* ========== CHANGE PASSWORD ========== */}
          {activeTab === "password" && (
            <form className="password-form" onSubmit={handlePasswordChange}>
              <h2>Change Password</h2>

              <input
                type="password"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                required
              />

              <button className="primary-btn">Change</button>
            </form>
          )}

        </div>
      </div>
    </>
  );
};

export default ProfilePage;
