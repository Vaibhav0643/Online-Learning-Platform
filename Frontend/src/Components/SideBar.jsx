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

import logo from "../Images/logo-elearn.jpg";
import { Link } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user") || "{}");

function SideBar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
  ];

  const adminLinks = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "Add Course",
      icon: <AddCircleOutlineIcon />,
      link: "/addcourse",
    },
  ];

  const content = user.userEmail === "ADMIN@GMAIL.COM" ? adminLinks : userLinks;

  const drawer = (
    <div>
      <Toolbar>
        <Avatar alt="logo" src={logo} sx={{ mr: "10px" }} />
        <Typography variant="h6" noWrap>
          JLearn
        </Typography>
      </Toolbar>
      <List>
        {content.map((obj) => (
          <ListItem key={obj.title} disablePadding>
            <Link to={obj.link ? obj.link : "/"}>
              <ListItemButton>
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText
                  primary={obj.title}
                  sx={{ textDecoration: "none", color: "black" }}
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
          display: { sm: "none" },
          position: "fixed",
          top: 0,
          right: 0,
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
