import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Auth from "../pages/Auth";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/auth",
        element: <Profile />
    }
]

export default createBrowserRouter(routes);