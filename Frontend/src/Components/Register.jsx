import "../Assets/Register.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        navigate("/login");
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
    setBtnDisabled(false);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Create your account.</h3>
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
          Sign Up <span>&#x2192; </span>
        </button>

        <hr className="divider" />
        <p>
          {" "}
          Already have an account? <Link href="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Register;
