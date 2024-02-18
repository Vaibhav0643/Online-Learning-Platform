import React, { useEffect } from "react";
import Header from "./Header";
import coverimage from "../Images/cover.jpg";
import "../Assets/Dashboard.css";
import profileimg from "../Images/profileimg.jpg";
import Footer from "./Footer";
import Section3data from "../Components/Section3data";
import CourseCard from "../Components/CourseCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const details_card = Section3data.map((datacontent) => {
    return <CourseCard {...datacontent} key={datacontent.id} />;
  });

  return (
    <div className="dashboard">
      <Header />
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
        <u>
          <h1>COURSE'S ENROLLED</h1>
        </u>
        {details_card}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
