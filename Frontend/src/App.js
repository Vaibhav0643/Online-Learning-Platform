import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Forgot from "./Components/Forgot";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
