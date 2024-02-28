import React from "react";
import coverimage from "../Images/background.jpg";
import "../Assets/Dashboard.css";
import profile from "../Images/profile.png";

function DashboardImg() {
  return (
    <div className="dashboard">
      <div className="cover-image">
        <img src={coverimage} alt="" />
      </div>
      <div className="studentimage">
        <img
          src={JSON.parse(localStorage.getItem("user")).userImgUrl || profile}
          alt=""
        />
      </div>
      <div className="dashboard-info-details">
        <h1>{JSON.parse(localStorage.getItem("user")).userName}</h1>
      </div>
    </div>
  );
}

export default DashboardImg;
