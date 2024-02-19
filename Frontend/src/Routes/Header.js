import React, { useState } from "react";
import "../Assets/Header.css";
import logoelearn from "../Images/logo-elearn.jpg";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [icons, seticons] = useState(false);
  const [navbaractive, setnavbaractive] = useState(false);

  const bar = icons === false ? "fas fa-bars" : "fas fa-times";
  const navactive = navbaractive === false ? "navbar" : "navbar active";
  function handleClick() {
    seticons((previcon) => !previcon);
    setnavbaractive((prev) => !prev);
  }

  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header>
      <nav>
        <div className="nav-logo">
          <img src={logoelearn} alt="Logo" />
          <h2>JMAN</h2>
        </div>
        <div className="nav-tags">
          <ul id="navbar" className={navactive}>
            <div id="mobile-icon" onClick={handleClick}>
              <i className={bar}></i>
            </div>

            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            {localStorage.getItem("user") ? (
              <>
                <li>
                  <NavLink to="/dashboard" activeClassName="active">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i className={bar}></i>
        </div>
      </nav>
    </header>
  );
}
export default Header;
