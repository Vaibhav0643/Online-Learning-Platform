import * as React from "react";
import "../Assets/Styles/Navbar.css";
import logo from "../Assets/Images/logo.jpg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-company">
        <img src={logo} alt="logo" className="navbar-logo" />
        <h1 className="navbar-title">JLearn</h1>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-menu-item active">Home</li>
        <li className="navbar-menu-item">About</li>
        <li className="navbar-menu-item">Contact</li>
      </ul>
    </div>
  );
}
export default Navbar;
