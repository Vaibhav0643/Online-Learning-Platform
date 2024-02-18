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
import BarChartIcon from "@mui/icons-material/BarChart";
import Person2Icon from "@mui/icons-material/Person2";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../Images/logo-elearn.jpg";

const userType = "user";

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
      title: "My Courses",
      icon: <Person2Icon />,
    },
    {
      title: "New Courses",
      icon: <AddCircleOutlineIcon />,
    },
    {
      title: "Statistics",
      icon: <BarChartIcon />,
    },
  ];

  const adminLinks = [
    {
      title: "Courses",
      icon: <HorizontalSplitIcon />,
    },
    {
      title: "Users",
      icon: <Person2Icon />,
    },
    {
      title: "Statistics",
      icon: <BarChartIcon />,
    },
  ];

  const content = userType === "user" ? userLinks : adminLinks;

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
            <ListItemButton>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.title} />
            </ListItemButton>
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
