import React, { useState } from "react";
import "../Assets/Header.css"
import logoelearn from "../Images/logo-elearn.jpg"

function Header() {
    const [icons, seticons] = useState(false)
    const [navbaractive, setnavbaractive] = useState(false)

    const bar = icons === false ? "fas fa-bars" : "fas fa-times"
    const navactive = navbaractive === false ? "navbar" : "navbar active"
    function handleClick() {
        seticons(previcon => !previcon)
        setnavbaractive(prev => !prev)
    }

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
                        <li></li>
                        <li><a href="index.html" className="active">Home</a></li>
                        <li><a href="index.html">Courses</a></li>
                        <li><a href="index.html">Dashboard</a></li>
                        <li><a href="index.html">Login</a></li>
                    </ul>
                </div>
                <div id="mobile" onClick={handleClick}>
                    <i className={bar}></i>
                </div>
            </nav>
        </header>
    )
}
export default Header;

