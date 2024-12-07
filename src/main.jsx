import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import Login from "./pages/Login.jsx";
import { RouterProvider } from "react-router";
import router from "./routes.tsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
