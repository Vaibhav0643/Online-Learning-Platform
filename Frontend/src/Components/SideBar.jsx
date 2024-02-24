import * as React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../Images/logo-elearn.jpg";
import { Link, useNavigate } from "react-router-dom";


function SideBar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [user, setUser] = React.useState("");
  let navigate = useNavigate();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const userLinks = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
  ];

  const adminLinks = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      title: "Add Course",
      icon: <AddCircleOutlineIcon />,
      link: "/addcourse",
    },
  ];

  const content = user.userEmail === "ADMIN@GMAIL.COM" ? adminLinks : userLinks;
  function home()
  {
    navigate('/');
  }

  const drawer = (
    <div>
      <Toolbar>
        <Avatar alt="logo" src={logo} sx={{ mr: "10px" }} onClick={home}/>
        <Typography variant="h6" noWrap sx={{color:'#0d47a1'}} >
          JLearn
        </Typography>
      </Toolbar>
      <List>
        {content.map((obj) => (
          <ListItem key={obj.title} disablePadding sx={{ color:'#0d47a1'}}>
            <Link to={obj.link ? obj.link : "/"}>
              <ListItemButton >
                <ListItemIcon sx={{ color:'#0d47a1'}}>{obj.icon}</ListItemIcon>
                <ListItemText
                  primary={obj.title}
                  sx={{ textDecoration: "none", color: "blue" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "background.paper" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          m: 2,
          display: { sx: "block", sm: "none" },
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 100000,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideBar;
