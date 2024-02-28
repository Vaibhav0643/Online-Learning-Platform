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
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../Assets/Course.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.success("Course Deleted Successfully");
        setTimeout(() => {
          navigate("/"); // Use navigate function correctly
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete the course.");
      });
  };

  const ifAdmin = user && user.userEmail === "ADMIN@GMAIL.COM";

  return (
    <Card
      sx={{
        flex: 1,
        maxWidth: 300,
        minWidth: 300,
        margin: "10px 0",
        borderRadius: "20px",
        transition: "transform 0.3s",
        height: "100%",
      }}
      className="course-card-dashboard"
    >
      <ToastContainer />
      <CardMedia
        component="img"
        height="150"
        image={props.image}
        alt="Course image"
        sx={{
          objectFit: "cover",
          borderRadius: "20px",
          margin: "10px",
          maxWidth: 275,
        }}
      />
      <CardHeader title={props.title} sx={{ color: "#000000" }} />
      <CardContent>
        <Typography variant="body2" color="black">
          {props.content.substring(0, 100) + "..."}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: "right", color: "#1976d2" }}
        >
          {props.videoCount} Videos
        </Typography>
      </CardContent>

      {/*------------------ Buttons---------------------------- */}
      <CardActions>
        {ifAdmin && (
          <Button
            variant="outlined"
            component={Link}
            to={"/EditCourse/" + props.id}
            sx={{ textDecoration: "none" }}
          >
            <EditIcon sx={{ marginRight: "3px" }} />
            Edit
          </Button>
        )}
        {ifAdmin && (
          <Button variant="contained" color="error" onClick={deleteCourse}>
            <DeleteIcon sx={{ marginRight: "3px" }} />
            Delete
          </Button>
        )}
        <Button
          variant="contained"
          component={Link}
          to={"/IndividualCourses/" + props.id}
          sx={{ textDecoration: "none", borderRadius: "16px" }}
        >
          <RemoveRedEyeIcon sx={{ marginRight: "3px" }} />
          View
        </Button>
      </CardActions>
    </Card>
  );
}
