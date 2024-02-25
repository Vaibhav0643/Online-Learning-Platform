import "../Assets/Register.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import red from "@mui/material/colors/red";
import { Avatar, Box } from "@mui/material";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Please Wait...");
    setBtnDisabled(true); 
    if (!name.trim()) {
    toast.error("Please enter your name.");
    setButtonText("Register");
    setBtnDisabled(false);
    return;
  }
  if (!email.trim()) {
    toast.error("Please enter your email.");
    setButtonText("Register");
    setBtnDisabled(false);
    return;
  }
  if (!password.trim()) {
    toast.error("Please enter your password.");
    setButtonText("Register");
    setBtnDisabled(false);
    return;
  }
   
  if (!image) {
    toast.error("Please upload your image.");
    setButtonText("Register");
    setBtnDisabled(false);
    return;
  }
    // const data = {
    //   userEmail: email,
    //   userPassword: password,
    //   userName: name,
    //   userImage: image.data,
    // };

    const formData = new FormData();
    formData.append("userEmail", email);
    formData.append("userPassword", password);
    formData.append("userName", name);
    formData.append("userImage", image.data);

    console.log(formData);

    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/user/createUser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Registration successful, You are directed to Login page ", {
          autoClose: 5000
        });
        setBtnDisabled(false);
        setButtonText("Sign Up");
        setTimeout(()=>{
          navigate('/login')
        },5000);
      })
      .catch((error) => {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : "Something went wrong";
      toast.error(errorMessage);
      setButtonText("Register");
      setBtnDisabled(false);
      });
  };

  return (
    <div className="app_content">
      <div>
      <ToastContainer/>
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Create your account.</h3>
              <p className="header_description">
                <span>
                  Open the Door to Infinite Learning Opportunities.
                  <br />
                  Join Us to Shape Your Future Today.
                </span>
              </p>
              <hr className="divider" />
            </div>

            <div className="input_heading">NAME</div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="input_heading">EMAIL</div>
            <input
              type="email"
              placeholder="name@email.com"
              className="box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="input_heading">PASSWORD</div>
            <input
              type="password"
              placeholder="Enter your password"
              className="box"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="input_heading">UserImage</div>
            <input
              type="file"
              accept="image/*"
              placeholder="Enter your password"
              className="box"
              onChange={onImageChange}
            />
            <Avatar
              alt="User Image"
              src={image ? image.preview : ""}
              sx={{
                width: 100,
                height: 100,
                position: "fixed",
                right: "50px",
                top: "50px",
              }}
            />

            <button className="btn" disabled={btnDisabled}>
              {buttonText}
            </button>

            <Box sx={{ color: red[500] }}>{message}</Box>

            <hr className="divider" />
            <p className="footer_description">
              {" "}
              Already have an account? <a href="/Login">Login</a>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
