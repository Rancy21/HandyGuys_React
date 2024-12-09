import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../src/pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResetPassword />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sign",
    element: <Signup />,
  },
]);

export default router;
