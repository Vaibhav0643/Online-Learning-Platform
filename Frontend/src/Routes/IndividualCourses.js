import React from "react";
import "../Assets/IndividualCourses.css";
import Header from "../Routes/Header";
import Footer from "../Routes/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Toolbar, Typography } from "@mui/material";

function IndividualCourse() {
  const params = useParams();

  const [course, setCourse] = React.useState(null);

  const id = params.id;
  const cookies = new Cookies();
  React.useEffect(() => {
    axios
      .get(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${id}/getCourseDetails`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setCourse(res.data);
        console.log(res.data);
      });
  }, [id]);

  const enroll = () => {
    axios
      .post(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${id}/enrollUser`,
        {},
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("You are already enrolled");
        }
      });
  };

  return (
    <div className="IndividualCourse">
      <Header />
      <div className="course_individual_data">
        <img
          src={
            course
              ? course.courseDetails.courseBannerImage
              : `../Image/machinelearning.jpg`
          }
          alt=""
        />
        <h1>{course ? course.courseDetails.courseTitle : "Course Title"}</h1>
        <p>
          {course
            ? course.courseDetails.courseDescription
            : "Course Description"}
        </p>
        <Toolbar />
        {course && course.courseDetails.videos ? (
          course.courseDetails.videos.map((video, index) => {
            return (
              <div key={index}>
                <Link to={video.videoURL}>{video.videoURL}</Link>
              </div>
            );
          })
        ) : (
          <>
            <Typography>You Are Not Enrolled Yet</Typography>
            <Button variant="contained" onClick={enroll} sx={{ width: "50vw" }}>
              Enroll
            </Button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default IndividualCourse;
