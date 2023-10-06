//

import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// layouts
import LandingPageLayout from "../Layouts/LandingPageLayout";
// pages
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
// auth
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "signup",
          element: (
            <GuestGuard>
              <SignUp />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "/",
      element: (
        <AuthGuard>
          <LandingPageLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={"/home"} replace />, index: true },
        { path: "home", element: <Home /> },
        { path: "profile/:id", element: <Profile /> },
      ],
    },
  ]);
}
