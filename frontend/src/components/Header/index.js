import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">
      <h4 className="text-white m-0">Primetrade</h4>
      <div>
        <Link to="/dashboard" className="btn btn-outline-light mx-2">
          Dashboard
        </Link>
        <Link to="/profile" className="btn btn-outline-light mx-2">
          Profile
        </Link>
        <button className="btn btn-outline-light mx-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
