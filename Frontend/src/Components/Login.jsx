import "../Assets/Login.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user);
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
    console.log(data);
    axios
      .post(
        "https://online-learning-platform-r55m.onrender.com/api/v1/user/login",
        data
      )
      .then((res) => {
        console.log(res.data);
        setButtonText(" Login");
        setButtonDisabled(false);
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };
  return (
    <div className="app_content">
      <div>
        <div className="login-form-container">
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
              <hr className="divider" />
            </div>

            <div className="input_heading">EMAIL</div>
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              className="box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="input_heading">PASSWORD</div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="password_hint">
              <a href="/Forgot" className="forgot">
                Forgot password?
              </a>
            </div>

            <button className="btn" disabled={buttonDisabled}>
              {buttonText}
            </button>

            <hr className="divider" />
            <p className="footer_description">
              {" "}
              Don't have an account? <Link to="/Signup">Sign Up</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
