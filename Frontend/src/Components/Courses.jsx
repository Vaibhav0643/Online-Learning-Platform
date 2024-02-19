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
import * as React from "react";

export default function Courses(props) {
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
          {props.content}
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
        <Link to={"/courses/" + props.id} sx={{ textDecoration: "none" }}>
          <Button>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
