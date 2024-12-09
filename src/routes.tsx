import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../src/pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import Signup from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Review from "./pages/Review.jsx";
import ReviewsList from "./pages/ReviewsList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "/reviewsList",
    element: <ReviewsList />,
  },
]);

export default router;
