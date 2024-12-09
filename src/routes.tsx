import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../src/pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import Signup from "./pages/SignUp.jsx";
import Review from "./pages/Review.jsx";
import ReviewsList from "./pages/ReviewsList.jsx";
import Helpers from "./admin pages/Helpers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/sign",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/review",
    element: <Review />
  },
  {
    path: "/reviewsList",
    element: <ReviewsList />
  },
  {
    path: "/helpers",
    element: <Helpers />
  }
]);

export default router;
