import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Link,
} from "@mui/material";
import Red from "@mui/material/colors/red";
import axios from "axios";
import * as React from "react";
import Cookies from "universal-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Courses(props) {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const cookies = new Cookies();
  if (user === null) {
    return <div></div>;
  }

  const deleteCourse = (e) => {
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
        alert("Course Deleted");
        window.location.reload();
      });
  };
  const gotoCourse = () => {
    props.navigate("/individualCourses/" + props.id);
  };

  const ifAdmin = user.userEmail === "ADMIN@GMAIL.COM";

  return (
    <Card sx={{ maxWidth: 300 , minWidth:300 , height:450 , mb:2}}>
      <CardHeader title={props.title} />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.content.substring(0, 100) + "..."}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: "right" }}
        >
          {props.videoCount - 1} Videos
        </Typography>
      </CardContent>
      <CardActions>
        {ifAdmin && (
          <Link to={"/Delete/" + props.id} sx={{ textDecoration: "none" }}>
            <Button sx={{ color: Red[500]}} onClick={deleteCourse}>
              <DeleteIcon />
              Delete
            </Button>
          </Link>
        )}
        <Link
          to={"/IndividualCourses/" + props.id}
          sx={{ textDecoration: "none" }}
        >
          <Button onClick={gotoCourse}>
            <RemoveRedEyeIcon />
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
