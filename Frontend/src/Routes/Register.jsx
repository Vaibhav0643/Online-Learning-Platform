import "../Assets/Register.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import red from "@mui/material/colors/red";
import { Avatar, Box } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../Images/jmanlogo.png";




function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  //Password Conditions ---------------------------------------
  const [capitalLetterValid, setCapitalLetterValid] = useState(false);
  const [smallLetterValid, setSmallLetterValid] = useState(false);
  const [specialCharacterValid, setSpecialCharacterValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  //----------------------------------------------------------

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const [message, setMessage] = useState("");

  const [activeField, setActiveField] = useState(""); // State to track active input field
  const navigate = useNavigate();



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      setImage(img);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Only validate password when typing in password input field
    if (activeField === 'password') {
      // Password validation regex
      const capitalLetterRegex = /[A-Z]/;
      const smallLetterRegex = /[a-z]/;
      const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const lengthRegex = /^.{8,72}$/;

      let capitalLetter = capitalLetterRegex.test(e.target.value);
      let smallLetter = smallLetterRegex.test(e.target.value);
      let specialCharacter = specialCharacterRegex.test(e.target.value);
      let length = lengthRegex.test(e.target.value);

      setCapitalLetterValid(capitalLetter);
      setSmallLetterValid(smallLetter);
      setSpecialCharacterValid(specialCharacter);
      setLengthValid(length);
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

    if (!(capitalLetterValid && smallLetterValid && specialCharacterValid && lengthValid)) {
      toast.error("Password must meet all criteria.");
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

    const formData = new FormData();
    formData.append("userEmail", email);
    formData.append("userPassword", password);
    formData.append("userName", name);
    formData.append("userImage", image.data);



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
        setTimeout(() => {
          navigate('/login')
        }, 5000);
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
    <div>
      <ToastContainer />
      <div className="signup-form-container">
        <img className="jmanLogo" src={logo} alt="jmanImage" />

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
            <hr className="signup_divider" />
          </div>

          <div className="signupDiv">
            <div className="signup_input_heading">NAME</div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setActiveField('name')} // Set active field when focused
            />
          </div>

          <div className="signupDiv">
            <div className="signup_input_heading">EMAIL</div>
            <input
              type="email"
              placeholder="name@email.com"
              className="box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => setActiveField('email')} // Set active field when focused
            />
          </div>

          <div className="signupDiv">
            <div className="signup_input_heading">PASSWORD</div>
            <input
              type="password"
              placeholder="Enter your password"
              className="box"
              value={password}
              onChange={handlePasswordChange}
              name="password" // Add name attribute to identify password field
              onFocus={() => setActiveField('password')}
            />
            <p className="error_message">
              {activeField === 'password' && password && (
                <React.Fragment>
                  {capitalLetterValid ? <span>&#10004;</span> : null} Password must contain at least one capital letter.<br />
                  {smallLetterValid ? <span>&#10004;</span> : null} Password must contain at least one small letter.<br />
                  {specialCharacterValid ? <span>&#10004;</span> : null} Password must contain at least one special character.<br />
                  {lengthValid ? <span>&#10004;</span> : null} Password must be between 8 to 72 characters long.
                </React.Fragment>
              )}
            </p>
          </div>

          <div className="signupDiv">

            <div className="signup_input_heading">User Image</div>
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
          </div>
          <button className="btn" disabled={btnDisabled}>
            {buttonText}
          </button>

          <Box sx={{ color: red[500] }}>{message}</Box>

          <hr className="signup_divider" />
          <p className="footer_description">
            {" "}
            Already have an account? <a href="/Login">Login <span>&#x2192; </span>  </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
