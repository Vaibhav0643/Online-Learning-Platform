import "./App.css";
import Dashboard from "./Routes/dashboard.jsx";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Forgot from "./Routes/Forgot";
import Register from "./Routes/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enrollment from "./Routes/Enrollment";
import Upload from "./Routes/Upload";
import Courses from "./Routes/Courses";
import IndividualCourse from "./Routes/IndividualCourse.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Enrollment" element={<Enrollment />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/" element={<Home />} />
        <Route path="/IndividualCourse" element={<IndividualCourse />} />
        <Route path="/Forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
