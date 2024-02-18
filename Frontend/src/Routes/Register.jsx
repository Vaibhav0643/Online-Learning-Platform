import "../Assets/Register.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import red from "@mui/material/colors/red";
import { Box } from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Please Wait...");
    setBtnDisabled(true);
    const data = {
      userEmail: email,
      userPassword: password,
      userName: name,
    };
    console.log(data);
    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/user/createUser",
        data
      )
      .then((res) => {
        console.log(res.data);
        setBtnDisabled(false);
        setButtonText("Sign Up");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setMessage("User Already Exists");
        } else if (error.response.status === 400) {
          setMessage("Please fill all the fields");
        } else {
          setMessage("Something went wrong");
        }
        setBtnDisabled(false);
        setButtonText("Sign Up");
      });
  };

  return (
    <div className="app_content">
      <div>
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
