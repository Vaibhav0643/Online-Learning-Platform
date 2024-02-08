import React from "react";
import Header from './Header';
import coverimage from "../Images/cover.jpg"
import "../Assets/Dashboard.css";
import profileimg from "../Images/profileimg.jpg"
import Footer from "./Footer"

function Dashboard()
{
    return(
        <div className="dashboard">
        <Header/>
        <div className="cover-image">
            <img src={coverimage} alt="" />
        </div>
        <div className="studentimage">
            <img src={profileimg} alt="" />
        </div>
        <div className="dashboard-info-details">
            <h1>Ramjee Rai</h1>
            <p>Enthusiast Learner</p>
        </div>
        <div className="courses-enrolled">
            <h1>COURSE'S ENROLLED</h1>
            <div className="courses-enrolled-data">
                <div className="courses-img-data">
                <img src={`../Image/python.jpg`} alt="coursesimage" />
                <div className="courses-content">
                    <h2>PYTHON PROGRAMMING</h2>
                    <p>Python programming is the process of writing, testing, and maintaining code in the Python language, known for its readability, versatility, and wide range of applications</p>
                </div>
                </div>
            </div>

            <div className="courses-enrolled-data">
                <div className="courses-img-data">
                <img src={`../Image/python.jpg`} alt="coursesimage" />
                <div className="courses-content">
                    <h2>PYTHON PROGRAMMING</h2>
                    <p>Python programming is the process of writing, testing, and maintaining code in the Python language, known for its readability, versatility, and wide range of applications</p>
                </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}

export default Dashboard;