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
import Cookie from "universal-cookie";
import axios from "axios";

function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseBannerImage, setCourseBannerImage] = useState("");
  const [courseVideo, setCourseVideo] = useState("");
  const [open, setOpen] = useState(false);

  const formData = new FormData();

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
  console.log(cookies.get("token"));

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = {
    //   courseTitle: courseTitle,
    //   courseDescription: courseDescription,
    //   courseBannerImage: courseBannerImage.data,
    //   videoURLs: courseVideo.split("\n"),
    // };
    formData.append("courseTitle", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("courseBannerImage", courseBannerImage.data);
    formData.append("videoURLs", courseVideo.split("\n"));

    console.log(formData);
    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/course/uploadCourse",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        alert("Course Added Successfully");
        handleClose();
      })
      .catch((error) => {
        alert("Something went wrong");
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
          id="title"
          label="Course Title"
          variant="outlined"
          onChange={(e) => setCourseTitle(e.target.value)}
          sx={{ margin: "10px 0" }}
        />
        <TextField
          id="desc"
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
          id="video"
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
      </Box>
      {/* <Typography variant="h6" sx={{ color: red[500] }}>
        {message}
      </Typography> */}
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
