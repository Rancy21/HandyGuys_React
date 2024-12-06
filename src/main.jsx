import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <Login />
  </BrowserRouter>
);
