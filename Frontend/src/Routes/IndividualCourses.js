import React from "react";
import "../Assets/IndividualCourses.css";
import Header from "../Routes/Header";
import Footer from "../Routes/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Toolbar, Typography, Avatar, Box } from "@mui/material";
import profile from "../Images/profile.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IndividualCourse() {
  const params = useParams();

  const [course, setCourse] = React.useState(null);

  const id = params.id;
  React.useEffect(() => {
    const cookies = new Cookies();
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
      });
  }, [id]);

  const enroll = () => {
    const cookies = new Cookies();
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
        toast.success("Successfully enrolled in the course!");
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
    <div className="IndividualCourse">
      <Header />
      <div className="course_individual_data" >
        <img
          src={
            course
              ? course.courseDetails.courseBannerImage
              : `../Image/machinelearning.jpg`
          }
          alt=""
          width="100px"
          height="auto"
        />
        <h1 style={{color:"#0d47a1"}}>{course ? course.courseDetails.courseTitle : "Course Title"}</h1>
        <p style={{color:'#64b5f6'}}>
          {course
            ? course.courseDetails.courseDescription
            : "Course Description"}
        </p>
        <Toolbar />
        {course && course.courseDetails.videos ? (
          course.courseDetails.videos.map((video, index) => {
            return (
              <div key={index}>
                <iframe 
                width="560" 
                height="315" 
                src={video.videoURL} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style={{
                  marginBottom:"2rem"
                }}
                className="course-video">

                </iframe>
              </div>
            );
          })
        ) : (
          <>
            <Typography textAlign={"center"} sx={{color:'#64b5f6'}}>
              You Are Not Enrolled Yet
            </Typography>
            <Button variant="contained" onClick={enroll} sx={{ width: "20vw" , mt:2 }}>
              Enroll
            </Button>
          </>
        )}

        <Toolbar />
        {course && course.courseDetails.enrolledUsers ? (
          <>
            <Typography>
              {course.courseDetails.enrolledUsers.length} Users Enrolled
            </Typography>
            {course.courseDetails.enrolledUsers.map((user, index) => {
              return (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="Profile Image"
                    src={user.userImgUrl || profile}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography>{user.userName}</Typography>
                </Box>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default IndividualCourse;
