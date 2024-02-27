import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Red from "@mui/material/colors/red";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Assets/Course.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Courses(props) {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const cookies = new Cookies();
  const navigate = useNavigate(); // Correctly call useNavigate as a function

  if (user === null) {
    return <div></div>;
  }

  const deleteCourse = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${props.id}/deleteCourse`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Course Deleted Successfully");
        setTimeout(()=>{
         navigate('/'); // Use navigate function correctly
        },3000);
      }).catch(error => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete the course.");
      });
  };

  const ifAdmin = user && user.userEmail === "ADMIN@GMAIL.COM";

  return (
    <Card sx={{ maxWidth: 400 , minWidth:400 , height:450 , mb:2 }} className="course-card-dashboard">
      <ToastContainer/>
      <CardMedia
        component="img"
        height="200"
        image={props.image}
        alt="Course image"
        sx={{mt:1,objectFit:"contain"}}
      />
      <CardHeader title={props.title} sx={{color:'#64b5f6'}}/>
      <CardContent>
        <Typography variant="body2" color="black">
          {props.content.substring(0, 100) + "..."}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: "right", color:'#1976d2' }}
        >
          {props.videoCount} Videos
        </Typography>
      </CardContent>
      <CardActions >
        {ifAdmin && (
          <Button sx={{ color: Red[500] }} onClick={deleteCourse}>
            <DeleteIcon />
            Delete
          </Button>
        )}
        <Button component={Link} to={"/IndividualCourses/" + props.id} sx={{ textDecoration: "none" }}>
          <RemoveRedEyeIcon />
          View
        </Button>
      </CardActions>
    </Card>
  );
}
