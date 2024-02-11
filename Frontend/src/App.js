import "./App.css";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Forgot from "./Components/Forgot";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Home />}/>
        <Route path="/Forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
