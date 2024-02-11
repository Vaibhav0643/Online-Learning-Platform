import React from "react";
import Header from './Header';
import coverimage from "../Images/cover.jpg"
import "../Assets/Dashboard.css";
import profileimg from "../Images/profileimg.jpg"
import Footer from "./Footer"
import Section3data from "./Section3data";
import CourseCard from "./CourseCard";

function Dashboard()
{

    const details_card = Section3data.map(datacontent => {
        return <CourseCard {...datacontent} key={datacontent.id}/>
    })

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
            <u><h1>COURSE'S ENROLLED</h1></u>
            {details_card}
        </div>
        <Footer/>
        </div>
    )
}

export default Dashboard;