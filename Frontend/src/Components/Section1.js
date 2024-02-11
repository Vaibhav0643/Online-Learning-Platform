import React from "react";
import main_image from "../Images/women.jpg";
import { useNavigate } from 'react-router-dom';;

function Section1()
{
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }
    return(
        <div className="section1">
        <div className="content1">
            <p className="heading-1">FUTURE OF</p>
            <p className="heading-2">Online <span>Education.</span></p>
            <p className="heading-3">"Unlock the world of knowledge with a click. Dive into a sea of courses tailored just for you. Learn, grow, and excel at your own pace. Your future starts here!"</p>
            
            <button className="home-login-btn" onClick={goToLogin}>Log In  {' >'}</button>
        </div>
        <div className="content2">
        <img src={main_image} alt="laughing women" className="laughing-women"/>
        </div>
        </div>
    )
}

export default Section1;