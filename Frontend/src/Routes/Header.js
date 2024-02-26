import React, { useState, useEffect } from "react";
import "../Assets/Header.css";
import logoelearn from "../Images/logo-elearn.jpg";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [icons, setIcons] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(user && user.userEmail === "ADMIN@GMAIL.COM") {
      setAdmin(true);
    }
  }, []); // Empty array ensures this effect runs only once after the initial render

  const bar = icons ? "fas fa-times" : "fas fa-bars";
  const navActive = navbarActive ? "navbar active" : "navbar";
  
  const navigate = useNavigate();

  function handleClick() {
    setIcons(prevIcons => !prevIcons);
    setNavbarActive(prevNavbarActive => !prevNavbarActive);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };

  function home() {
    navigate('/');
  }

  return (
    <header>
      <nav>
        <div className="nav-logo">
          <img src={logoelearn} alt="Logo" onClick={home}/>
          <h2>JMAN</h2>
        </div>
        <div className="nav-tags">
          <ul id="navbar" className={navActive}>
            <div id="mobile-icon" onClick={handleClick}>
              <i className={bar}></i>
            </div>

            <li>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              {isAdmin ? (
                <NavLink to="/AddCourse" exact activeClassName="active">
                  Add Course
                </NavLink>
              ) : (
                <NavLink to="/courses" exact activeClassName="active">
                  Courses
                </NavLink>
              )}
            </li>
            {localStorage.getItem("user") ? (
              <>
                <li>
                  <NavLink to="/dashboard" activeClassName="active">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" activeClassName="active" onClick={handleLogout}>
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
