import { Container, Typography } from "@mui/material";
import * as React from "react";

export default function Courses(props) {
  return (
    <Container maxWidth="xs" sx={{ mb: "50px" }}>
      <Typography variant="h3" component="h4">
        {props.title}
      </Typography>
      <Typography variant="body1">{props.content}</Typography>
    </Container>
  );
}
