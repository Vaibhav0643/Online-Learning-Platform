import {
  IconButton,
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Tooltip,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Assets/AddCourse.css";
import Header from "./Header";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useParams } from "react-router-dom";

function EditCourse() {
  const params = useParams();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseBannerImage, setCourseBannerImage] = useState("");
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState([{ title: "", link: "" }]);
  const [loading, setLoading] = useState(true); // New state variable for loading indicator

  const formData = new FormData();
  const navigator = useNavigate();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      setCourseBannerImage(img);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${params.id}/getCourseDetails`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        const data = res.data;
        console.log(data.courseDetails);
        // Set data from API response to state variables
        setCourseTitle(data.courseDetails.courseTitle);
        setCourseDescription(data.courseDetails.courseDescription);

        // //********************************************** TO RESOLVE THIS IMAGE URL INTO IMAGE DATA**********************************************
        // const img = {
        //   preview: data.courseDetails.courseBannerImage,
        //   data: fetch(data.courseDetails.courseBannerImage)
        //     .then(response => response.blob()),
        // };
        // setCourseBannerImage(img);

        const formattedData = data.courseDetails.videos.map((video) => {
          return { title: video.videoTitle, link: video.videoURL };
        });
        setVideos(formattedData);
        setLoading(false);
      });
  }, [params.id]); // Empty dependency array ensures the effect runs only once when component mounts

  const cookies = new Cookies();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newVideos = [...videos];
    newVideos[index][name] = value;
    setVideos(newVideos);
  };
  const handleDeleteVideo = (index) => {
    let newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  useEffect(() => {
    setVideos(videos);
  }, [videos]);

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", link: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isSafe = true;
    const titles = videos.map((video) => {
      if (!video.title.trim()) {
        isSafe = false;
      }
      return video.title;
    });
    if (!isSafe) {
      toast.error("Please fill all the video Titles.");
      handleClose();
      return;
    }

    // Extract links from videos
    const links = videos.map((video) => {
      if (!video.link.trim()) {
        isSafe = false;
      }
      return video.link;
    });
    if (!isSafe) {
      toast.error("Please fill all the video Links.");
      handleClose();
      return;
    }

    if (!courseTitle.trim()) {
      toast.error("Please enter a course title.");
      handleClose();
      return;
    }
    if (!courseDescription.trim()) {
      toast.error("Please enter a course description.");
      handleClose();
      return;
    }
    if (!courseBannerImage) {
      toast.error("Please upload a course banner image.");
      handleClose();
      return;
    }
    if (links.length === 0) {
      toast.error("Please upload atleast 1 course video.");
      handleClose();
      return;
    }

    formData.append("courseTitle", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("courseBannerImage", courseBannerImage.data);
    formData.append("videoURLs", links);
    formData.append("videoTitle", titles);

    // Retrieve value associated with a specific key using get()
    console.log(formData.get("courseTitle"));
    console.log(formData.get("courseDescription"));
    console.log(formData.get("courseBannerImage"));
    console.log(formData.get("videoURLs"));
    console.log(formData.get("videoTitle"));

    const token = cookies.get("token");

    axios
      .post(
        `https://online-learning-platform-r55m.onrender.com/api/v1/course/${params.id}/editCourse`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Course updated Successfully!");
        setTimeout(() => {
          navigator("/dashboard");
        }, 5000);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        handleClose();
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) {
      return <div></div>;
    }
    if (JSON.parse(user).userEmail !== "ADMIN@GMAIL.COM") {
      navigator("/dashboard");
    }
  }, [navigator]);

  return (
    <div>
      <Header />
      {loading ? (
        <p></p>
      ) : (
        <Container maxWidth="sm" className="add-course">
          <ToastContainer />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
              padding: "100px 0",
            }}
          >
            <Typography variant="h4" textAlign={"center"}>
              Edit Course
            </Typography>
            <TextField
              id="title"
              label="Course Title"
              variant="outlined"
              onChange={(e) => setCourseTitle(e.target.value)}
              value={courseTitle}
              sx={{ margin: "10px 0" }}
            />
            <TextField
              id="desc"
              value={courseDescription}
              label="Course Description"
              multiline={true}
              onChange={(e) => setCourseDescription(e.target.value)}
              variant="outlined"
              sx={{ margin: "10px 0" }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ margin: "10px 0 0 0", padding: "12px" }}
            >
              Upload course cover image
              <input type="file" onChange={handleImageChange} hidden />
            </Button>

            {courseBannerImage !== "" && (
              <img
                className="preview_img"
                src={courseBannerImage.preview}
                alt=""
              />
            )}

            {videos.map((video, index) => (
              <div key={index}>
                <input
                  className="video_title"
                  type="text"
                  name="title"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  className="video_link"
                  type="text"
                  name="link"
                  placeholder="Video Link"
                  value={video.link}
                  onChange={(e) => handleChange(index, e)}
                />
                <IconButton
                  className="deleteButton"
                  color="error"
                  aria-label="add to shopping cart"
                  onClick={() => handleDeleteVideo(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}

            <Tooltip title="Use YouTube embed URL's seperated by newline">
              <Button
                variant="contained"
                startIcon={<VideoCallIcon />}
                sx={{ margin: "10px 0", padding: "15px" }}
                disableElevation
                onClick={handleAddVideo}
              >
                Add Video
              </Button>
            </Tooltip>

            <Divider sx={{ margin: "10px 0" }} />

            <Button
              onClick={handleOpen}
              sx={{ margin: "10px 0", padding: "15px" }}
              variant="contained"
              style={{ backgroundColor: "#0a0a81", color: "#FFFFFF" }}
              type="submit"
              className="submit-btn"
            >
              Edit Course
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
      )}

      <Footer />
    </div>
  );
}
export default EditCourse;
