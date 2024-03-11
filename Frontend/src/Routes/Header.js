import React, { useState, useEffect } from "react";
import "../Assets/Header.css";
import logoelearn from "../Images/logo-elearn.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  const [icons, setIcons] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.userEmail === "ADMIN@GMAIL.COM") {
      setAdmin(true);
    }
  }, []); // Empty array ensures this effect runs only once after the initial render

  const bar = icons ? "fas fa-times" : "fas fa-bars";
  const navActive = navbarActive ? "navbar active" : "navbar";

  const navigate = useNavigate();

  function handleClick() {
    setIcons((prevIcons) => !prevIcons);
    setNavbarActive((prevNavbarActive) => !prevNavbarActive);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    cookies.remove("token");
    navigate("/login");
  };

  function home() {
    navigate("/");
  }

  return (
    <header>
      <nav>
        <div className="nav-logo">
          <img src={logoelearn} alt="Logo" onClick={home} />
          <h2>JMAN</h2>
        </div>
        <div className="nav-tags">
          <ul id="navbar" className={navActive}>
            <div id="mobile-icon" onClick={handleClick}>
              <i className={bar}></i>
            </div>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "navbar active" : "navbar"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              {isAdmin ? (
                <NavLink
                  to="/AddCourse"
                  className={({ isActive }) =>
                    isActive ? "navbar active" : "navbar"
                  }
                >
                  Add Course
                </NavLink>
              ) : (
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive ? "navbar active" : "navbar"
                  }
                >
                  Courses
                </NavLink>
              )}
            </li>
            {localStorage.getItem("user") ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "navbar active" : "navbar"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "navbar active" : "navbar"
                    }
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "navbar active" : "navbar"
                  }
                >
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
