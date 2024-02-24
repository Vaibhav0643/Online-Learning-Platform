import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import profile from "../Images/profile.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (user === null) navigate("/login");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
        boxShadow: "none",
        backdropFilter: "blur(10px)",
      }}
      color="transparent"
    >
      <Toolbar sx={{ ml: "auto" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="text"
          sx={{ textTransform: "none", color: "black" }}
        >
          <Typography variant="h6" noWrap component="div" sx={{ mr: "10px" , color:'#0d47a1'}}>
            Hi {JSON.parse(localStorage.getItem("user")).userName}
          </Typography>
          <Avatar
            alt="Profile Image"
            src={JSON.parse(localStorage.getItem("user")).userImgUrl || profile}
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{color:'#0d47a1'}}/>
            </ListItemIcon>
            <ListItemText sx={{color:'#0d47a1'}}>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
