import Courses from "../Components/Courses";
import Header from "./Header";
import Footer from "./Footer";
import { Box, CssBaseline, Toolbar, Divider, Container , Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import Cookies from "universal-cookie";
import DashboardImg from "./DashboardImg";

function Dashboard() {
  const [allCourses, setAllCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [admin,setAdmin]=useState(false)
  
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    if (user == null) {
      navigate("/login");
    }

    if( user.userEmail === "ADMIN@GMAIL.COM")
    {
      setAdmin(true);
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
        setUserCourses(userCoursesResponse.data.courses);
      } catch (error) {
        console.error( error);
      }
    }
  
    fetchData();
  }, [navigate]);

  const userCoursesDisplay = () => {
    if (userCourses) {
      return userCourses.map((course) => {
        return (
          <div key={course.courseId}>
            <Courses
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

  const allCoursesDisplay = () => {
    if (allCourses) {
      return allCourses.map((course) => {
        return (
          <div key={course.courseId}>
            <Courses
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
    <DashboardImg/>
      <CssBaseline />
      
      {admin ?

        <> <Typography variant="h4" component="h2" sx={{ width: '100%', textAlign: 'center', mb: 4 , mt:5 ,color:'#0d47a1' ,fontSize:40 }} className="quicksand">
         Available Courses
        </Typography>
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
      </Box></>:
        <>
      <Typography variant="h4" component="h2" sx={{ width: '100%', textAlign: 'center', mb: 4 , mt:5 , color:'#0d47a1' ,fontSize:40 }} className="quicksand">
        Enrolled Courses
        </Typography>
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
          {userCoursesDisplay()}
        </Container>
      </Box>
      </>
      
      }
      <Footer/>
    </Box>
  );
}

export default Dashboard;
