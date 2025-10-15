import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        name,
        password,
        gender,
        location,
      });
      setSuccess("User created successfully! Please login.");
      setTimeout(() => navigate("/login"), 1200); // Redirect after short delay
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="container signup-container col-sm-10 col-md-6 col-lg-4 mt-5">
      <h2 className="text-center mb-4">Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-white"
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            required
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            required
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            required
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            required
            className="form-select"
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            required
            type="text"
            className="form-control"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Signup
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </form>
      <div className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-primary text-decoration-underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
