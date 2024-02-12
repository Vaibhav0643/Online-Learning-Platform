import "../Assets/Login.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isBtnDisabled, setBtnDisabled] = useState("");

  const handleSubmit = (e) => {
    setBtnDisabled("disabled");
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
    setBtnDisabled("");
  };
  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign in to your account.</h3>
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

        <button className="btn" disabled={isBtnDisabled}>
          Login <span>&#x2192; </span>
        </button>

        <hr className="divider" />
        <p>
          {" "}
          don't have an account <a href="/signup">Sign Up</a>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
