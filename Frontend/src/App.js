import "./App.css";
import Dashboard from "./Components/Dashboard";

import Login from "./Components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
