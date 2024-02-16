import Courses from "../Components/Courses";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { Box, CssBaseline, Toolbar, Divider } from "@mui/material";

const drawerWidth = 240;

function Dashboard() {
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
        <Courses title="Course 1" content="This is Course Content" />
        <Divider />
        <Courses
          title="Course 2"
          content="This is content of sample course 2 "
        />
        <Divider />
        <Courses title="Course 3" content="This is Course Content" />
        <Divider />
      </Box>
    </Box>
  );
}

export default Dashboard;
