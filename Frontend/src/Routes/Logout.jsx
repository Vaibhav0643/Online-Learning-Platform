import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    // Add any additional logout logic here
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
