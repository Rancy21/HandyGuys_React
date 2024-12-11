import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../src/pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Review from "./pages/Review.jsx";
import ReviewsList from "./pages/ReviewsList.jsx";
import Helpers from "./admin pages/Helpers.jsx";
import UsersManagement from "./admin pages/Users.jsx";
import ServiceProviderProfile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/reset",
    element: <ResetPassword />
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
    element: <ServiceProviderProfile />
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
  },
  {
    path: "/users",
    element: <UsersManagement />
  }
]);

export default router;
