import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./Profile.css";

const API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data.user || data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Failed to load profile");
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${API_URL}/api/auth/editProfile`,
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(data.user || profile);
      showMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/auth/changePassword`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      showMessage("Failed to change password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-container">
          {message && <div className="toast-msg">{message}</div>}

          {profile ? (
            <div className="profile-grid">
              {/* Left side */}
              <div className="profile-sidebar">
                {/* <div className="avatar-box">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="User Avatar"
                  />
                </div> */}
                <h2 className="user-name">{profile.name}</h2>
                <p className="user-email">{profile.email}</p>
                <p className="user-phone">{profile.phone}</p>

                <button className="outline-btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>

              {/* Right side */}
              <div className="profile-details">
                <h3 className="section-title">Edit Profile</h3>
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />

                  <label>Email</label>
                  <input type="email" value={profile.email} readOnly />

                  <label>Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />

                  <label>Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />

                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </form>

                <div className="password-section">
                  <h3 className="section-title">Change Password</h3>
                  <form
                    onSubmit={handlePasswordChange}
                    className="password-form"
                  >
                    <label>Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                      required
                    />

                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />

                    <button type="submit" className="primary-btn">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
