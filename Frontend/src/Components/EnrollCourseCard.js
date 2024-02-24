import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnrollCourseCard(props) {
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || Object.keys(user).length === 0) {
      navigate("/login");
    }
  }, [navigate]);

  const enroll = () => {
    const cookies = new Cookies();
    axios
      .post(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${props.courseId}/enrollUser`,
        {},
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        toast.success("Successfully enrolled in the course!");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warning("You are already enrolled");
        } else {
          // Handle other errors
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="enroll-course">
      <img src={props.courseBannerImage} alt="coursebanner" />
      <div className="course-enroll-data">
        <h1>{props.courseTitle}</h1>
        <p>{props.courseDescription}</p>
        <h5>{props.videoCount} Videos</h5>
        <button className="enroll-button" onClick={enroll}>Enroll Now</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EnrollCourseCard;
