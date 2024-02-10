import "../Assets/Login.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user);
      navigate("/dashboard");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
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
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
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
          <button className="forgot">Forgot password?</button>
        </div>

        {/* <input type="submit" value="login"class="btn" /> */}

        <button className="btn">
          Login <span>&#x2192; </span>
        </button>

        <hr className="divider" />
        <p>
          {" "}
          don't have an account <Link to="signup">Sign Up</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
