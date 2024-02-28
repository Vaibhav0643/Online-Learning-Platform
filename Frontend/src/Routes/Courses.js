import CoursesContent from "../Components/Courses";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Toolbar, Divider, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function Courses() {
  const [allCourses, setAllCourses] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    if (user == null) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://online-learning-platform-r55m.onrender.com/api/v1/course/getAllCourses"
        );
        setAllCourses(response.data.courses);

        const cookies = new Cookies();
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        axios.get(
          `https://online-learning-platform-r55m.onrender.com/api/v1/course/${userId}/getUserCourses`,
          {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  const allCoursesDisplay = () => {
    if (allCourses) {
      return allCourses.map((course) => {
        return (
          <CoursesContent
            key={course.courseId}
            id={course.courseId}
            title={course.courseTitle}
            content={course.courseDescription}
            image={course.courseBannerImage}
            videoCount={course.videoCount}
            navigate={navigate}
          />
        );
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Typography
        variant="h4"
        component="h2"
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 4,
          mt: 5,
          color: "#0d47a1",
          fontSize: 40,
        }}
        className="quicksand"
      >
        Available Courses
      </Typography>
      <Box
        component="main"
        sx={{
          width: "90%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          margin: "2% auto",
          padding: "10px",
        }}
      >
        {allCoursesDisplay()}
      </Box>
      <Footer />
    </Box>
  );
}

export default Courses;
