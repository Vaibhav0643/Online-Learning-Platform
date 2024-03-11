import "../Assets/Login.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../Images/jmanlogo.png";



function Login() {
  let navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Login");




  const handleSubmit = (e) => {
    setButtonText("Please Wait...");
    setButtonDisabled(true);
    e.preventDefault();

    const data = {
      userEmail: email,
      userPassword: password,
    };

    if (!email && !password) {
      toast.error("Please Fill In All The Details.");
      setButtonText("Login");
      setButtonDisabled(false);
      return;
    }
    else if (email && !password) {
      toast.error("Please Fill The Password.");
      setButtonText("Login");
      setButtonDisabled(false);
      return;
    }
    else if (!email && password) {
      toast.error("Please Fill The Email.");
      setButtonText("Login");
      setButtonDisabled(false);
      return;
    }


    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/user/login",
        data
      )

      .then((res) => {
        console.log(res.data);
        setButtonText(" Login");
        setButtonDisabled(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        cookies.set("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        { (email && password) && toast.error("Invalid Email or Password") }
        setButtonText("Login");
        setButtonDisabled(false);
      });
  };




  return (
      <div>

        <ToastContainer />

        <div className="login-form-container">
        <Link to="/"><img className="jmanLogo" src={logo} alt="jmanImage"  /></Link>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Sign in to your account.</h3>
              <p className="header_description">
                <span>
                  Open the Door to Infinite Learning Opportunities.
                  <br />
                  Join Us to Shape Your Future Today.
                </span>
              </p>
              <hr className="login-divider" />
            </div>

            <div className="loginDiv">
              <label className="login_input_heading">EMAIL</label>
              <input
                id="email"
                type="email"
                placeholder="name@email.com"
                className="box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="loginDiv">
              <label className="login_input_heading">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <div className="password_hint">
              <a href="/Forgot" className="forgot">
                Forgot password?
              </a>
            </div> */}

            <button className="login_btn" disabled={buttonDisabled}>
              {buttonText}
            </button>

            <hr className="login-divider" />
            <p className="footer_description">
              {" "}
              Don't have an account? <Link to="/Signup">Sign Up  <span>&#x2192; </span>  </Link>{" "}
            </p>
          </form>
        </div>
      </div>
  );
}

export default Login;
