import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      const jwtToken = response.data.jwtToken;
      Cookies.set("jwt_token", jwtToken, { expires: 7 });
      localStorage.setItem("jwtToken", jwtToken); // Fallback
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Invalid username or password");
    }
  };

  return (
    <div className="container login-container col-sm-10 col-md-6 col-lg-4 mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
      <div className="text-center mt-3">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary text-decoration-underline">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
