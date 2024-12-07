import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../src/pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
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
