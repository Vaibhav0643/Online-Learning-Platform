import React, { useState } from "react";
import "../Assets/Header.css";
import logoelearn from "../Images/logo-elearn.jpg";
<<<<<<< Updated upstream
import { NavLink } from 'react-router-dom';
=======

import { Link } from "react-router-dom";
>>>>>>> Stashed changes

function Header() {
  const [icons, seticons] = useState(false);
  const [navbaractive, setnavbaractive] = useState(false);

  const bar = icons === false ? "fas fa-bars" : "fas fa-times";
  const navactive = navbaractive === false ? "navbar" : "navbar active";
  function handleClick() {
    seticons((previcon) => !previcon);
    setnavbaractive((prev) => !prev);
  }

<<<<<<< Updated upstream
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
                        
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/courses" activeClassName="active">Courses</NavLink></li>
                        <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                    </ul>
                </div>
                <div id="mobile" onClick={handleClick}>
                    <i className={bar}></i>
                </div>
            </nav>
        </header>
    )
=======
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
              <a href="index.html" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="index.html">Courses</a>
            </li>
            <li>
              <a href="index.html">Dashboard</a>
            </li>
            <li>
              {localStorage.getItem("user") ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i className={bar}></i>
        </div>
      </nav>
    </header>
  );
>>>>>>> Stashed changes
}
export default Header;
