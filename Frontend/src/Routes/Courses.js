import CoursesContent from "../Components/Courses";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Toolbar, Divider, Container , Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import Cookies from "universal-cookie";

function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    if (user == null) {
      navigate("/login");
    }
    const fetchData= async ()=>{
      try {
        const response = await axios.get('https://online-learning-platform-r55m.onrender.com/api/v1/course/getAllCourses');
        setAllCourses(response.data.courses);
        console.log(allCourses);
        
        const cookies = new Cookies();
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        const userCoursesResponse = await axios.get(`https://online-learning-platform-r55m.onrender.com/api/v1/course/${userId}/getUserCourses`, {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        });
        console.log(userCoursesResponse);
      } catch (error) {
        console.error( error);
      }
    }
  
    fetchData();
  }, [navigate]);


  const allCoursesDisplay = () => {
    if (allCourses) {
      return allCourses.map((course) => {
        return (
          <div key={course.courseId}>
            <CoursesContent
              key={course.courseId}
              id={course.courseId}
              title={course.courseTitle}
              content={course.courseDescription}
              image={course.courseBannerImage}
              videoCount={course.videoCount}
              navigate={navigate}
            />
            <Divider />
          </div>
        );
      });
    }
  };

  return (
    <Box sx={{ display: { sx: "flex" } }}>
      
      <Header/>
       <Typography variant="h4" component="h2" sx={{ width: '100%', textAlign: 'center', mb: 4 , mt:5 ,color:'#0d47a1' ,fontSize:40 , }} className="quicksand">
         Available Courses
        </Typography>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          margin:"auto",
          justifyContent: "center",
        }}
      >
        <Toolbar />
        
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            margin: "auto",
            marginLeft: 5
          }}
        >
          {allCoursesDisplay()}
        </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default Courses;
