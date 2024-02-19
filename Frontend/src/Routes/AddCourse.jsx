import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import red from "@mui/material/colors/red";
import Cookie from "universal-cookie";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseBannerImage, setCourseBannerImage] = useState("");
  const [courseVideo, setCourseVideo] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      setCourseBannerImage(img);
    }
  };

  const cookies = new Cookie();
  cookies.set(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJ1c2VyRW1haWwiOiJBRE1JTkBHTUFJTC5DT00iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzA4MjcwNzA4LCJleHAiOjE3MDgzNTcxMDh9.-1g-DTxVck78FzAaz0kgf_vLRwfQx7pr_-98-hwBVjs"
  );

  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      courseTitle: courseTitle,
      courseDescription: courseDescription,
      courseBannerImage: courseBannerImage.data,
      videoURLs: courseVideo.split("\n"),
    };

    console.log(data);
    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/course/uploadCourse",
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${cookies.get("token")}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMessage(res.data);
        handleClose();
      })
      .catch((error) => {
        setMessage(error);
        handleClose();
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "space-between",
          padding: "100px 0",
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          Add Course
        </Typography>
        <TextField
          id="outlined-basic"
          label="Course Title"
          variant="outlined"
          onChange={(e) => setCourseTitle(e.target.value)}
          sx={{ margin: "10px 0" }}
        />
        <TextField
          id="outlined-basic"
          label="Course Description"
          multiline={true}
          onChange={(e) => setCourseDescription(e.target.value)}
          variant="outlined"
          sx={{ margin: "10px 0" }}
        />
        <Button variant="outlined" component="label">
          Upload File
          <input type="file" onChange={handleImageChange} hidden />
        </Button>

        <TextField
          id="outlined-basic"
          label="Course Video"
          multiline={true}
          variant="outlined"
          onChange={(e) => setCourseVideo(e.target.value)}
          sx={{ margin: "10px 0" }}
        />
        <Button
          onClick={handleOpen}
          sx={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Course
        </Button>
        <Typography variant="h6" sx={{ color: red[500] }}>
          {message}
        </Typography>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
export default AddCourse;
