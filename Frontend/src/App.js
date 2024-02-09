import "./App.css";
import Dashboard from "./Components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
