import Courses from "../Components/Courses";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { Box, CssBaseline, Toolbar, Divider, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth = 240;

function Dashboard() {
  let navigate = useNavigate();
  let courses;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user) {
      navigate("/login");
    }
    console.log(user);
  }, [navigate]);

  courses = JSON.parse(localStorage.getItem("courses"));
  console.log(courses);
  const courseDisplay = () => {
    if (courses) {
      return courses.map((course) => {
        return (
          <div key={course.courseId}>
            <Courses
              key={course.courseId}
              title={course.courseTitle}
              content={course.courseDescription}
              image={course.courseBannerImage}
              videoCount={course.videoCount}
            />
            <Divider />
          </div>
        );
      });
    }
  };

  return (
    <Box sx={{ display: { sx: "flex" } }}>
      <CssBaseline />
      <TopBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {courseDisplay()}
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;