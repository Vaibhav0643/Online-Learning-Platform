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
import * as React from "react";

export default function Courses(props) {
  const user = JSON.parse(localStorage.getItem("user") || null);

  if (user === null) {
    return <div></div>;
  }

  const gotoCourse = () => {
    props.navigate("/individualCourses/" + props.id);
  };

  const ifAdmin = user.userEmail === "ADMIN@GMAIL.COM";

  return (
    <Card sx={{ maxWidth: 345 }}>
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
          {props.videoCount} Videos
        </Typography>
      </CardContent>
      <CardActions>
        {ifAdmin && (
          <Link to={"/Delete/" + props.id} sx={{ textDecoration: "none" }}>
            <Button sx={{ color: Red[500] }}>Delete</Button>
          </Link>
        )}
        <Link
          to={"/IndividualCourses/" + props.id}
          sx={{ textDecoration: "none" }}
        >
          <Button onClick={gotoCourse}>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
