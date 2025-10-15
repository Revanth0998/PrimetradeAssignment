import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Header from "../../components/Header";

const API_BASE = "http://localhost:5000";

function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    gender: "",
    location: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile({ ...res.data, password: "" }))
      .catch(() => setError("Failed to load profile"));
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    axios
      .put(`${API_BASE}/auth/profile`, profile, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setMessage("Profile updated successfully"))
      .catch(() => setError("Failed to update profile"));
  };

  return (
    <>
      <Header />
      <div className="container profile-container">
        <h2>Update Profile</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
          <div className="mb-3">
            <label>Username (cannot change)</label>
            <input className="form-control" value={profile.username} readOnly />
          </div>
          <div className="mb-3">
            <label>Name</label>
            <input className="form-control" name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Gender</label>
            <select className="form-select" name="gender" value={profile.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Location</label>
            <input className="form-control" name="location" value={profile.location} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>New Password (leave blank to keep unchanged)</label>
            <input type="password" className="form-control" name="password" value={profile.password} onChange={handleChange} />
          </div>
          <button className="btn btn-primary" type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;
