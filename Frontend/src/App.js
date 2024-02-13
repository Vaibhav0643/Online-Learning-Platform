import "./App.css";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Forgot from "./Components/Forgot";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enrollment from "./Components/Enrollment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Enrollment" element={<Enrollment />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/Forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
