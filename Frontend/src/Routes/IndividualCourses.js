import React, { useState, useEffect } from "react";
import "../Assets/IndividualCourses.css";
import Header from "../Routes/Header";
import Footer from "../Routes/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  Button,
  Toolbar,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Checkbox,
  Container,
  FormControlLabel,
} from "@mui/material";
import profile from "../Images/profile.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IndividualCourse() {
  const params = useParams();
  const [course, setCourse] = React.useState(null);
  const [checkedVideos, setCheckedVideos] = React.useState([]);
  const [admin, setAdmin] = useState(false);
  const [progress, setProgress] = useState(0);

  const id = params.id;

  useEffect(() => {
    const cookies = new Cookies();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.userEmail === "ADMIN@GMAIL.COM") {
      setAdmin(true);
    }
  }, [params.id]);

  // let progress;
  // if(!admin){
  //   progress = Object.values(checkedVideos).filter(checked => checked).length / (course?.courseDetails.videos.length || 1) * 100;
  // }

  const handleCheckboxChange = (index) => {
    setCheckedVideos((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    const cookies = new Cookies();

    const user = JSON.parse(localStorage.getItem("user"));
    console.table([
      user.userId,
      params.id,
      index + 1,
      course.courseDetails.videoCount,
    ]);
    axios
      .post(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${
          user.userId
        }/${params.id}/${index + 1}/${
          course.courseDetails.videoCount
        }/updateUserProgress`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setProgress(res.data.progress);
      });
  };

  React.useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${params.id}/getCourseDetails`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setCourse(res.data);
        setProgress(res.data.courseDetails.progress);
        const arr = [];
        for (let i = 0; i < res.data.courseDetails.videoCount; i++) {
          arr.push(false);
        }
        setCheckedVideos(arr);
        console.log(progress);
        console.log(res.data);
      });
  }, [params.id]);

  

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
        console.log(res.data);
        window.location.reload();
        toast.success("Successfully enrolled in the course!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warning("You are already enrolled");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  const courseVideos = () => {
    return course.courseDetails.videos.map((video, index) => {
      return (
        <div key={index}>
          <h2 style={{ color: "blue", marginBottom: "2rem" }}>
            {video.videoTitle}
          </h2>
          <iframe
            width="450"
            height="340"
            src={video.videoURL}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style={{
              marginBottom: "2rem",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            className="course-video"
          ></iframe>

          <br />
          {!admin && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedVideos[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label="Complete"
            />
          )}
        </div>
      );
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
          width="400px"
          height="auto"
        />

        <h1 style={{ color: "#0d47a1" }}>
          {course ? course.courseDetails.courseTitle : "Course Title"}
        </h1>
        <p style={{ color: "#64b5f6" }}>
          {course
            ? course.courseDetails.courseDescription
            : "Course Description"}
        </p>
        <Toolbar />

        {!admin && course && course.courseDetails.videos && (
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Background Circle (Empty Part) */}
            <CircularProgress
              variant="determinate"
              value={100} // Full circle
              size={100}
              thickness={5}
              sx={{
                color: "rgb(157, 157, 250)", // Example custom color for the empty part (light grey)
                position: "absolute", // Position it behind the actual progress circle
              }}
            />
            {/* Actual Progress Circle (Filled Part) */}
            <CircularProgress
              variant="determinate"
              value={progress}
              size={100}
              thickness={5}
              sx={{
                color: "Blue",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                sx={{
                  color: "Blue",
                  fontWeight: "bold",
                }}
              >
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        )}

        {course && course.courseDetails.videos ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              margin: "auto",
              justifyContent: "left",
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                margin: "auto",
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              {courseVideos()}
            </Container>
          </Box>
        ) : (
          <>
            <Typography textAlign={"center"} sx={{ color: "#64b5f6" }}>
              You Are Not Enrolled Yet
            </Typography>
            <Button
              variant="contained"
              onClick={enroll}
              sx={{ width: "20vw", mt: 2 }}
            >
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
