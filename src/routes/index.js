import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Auth from "../pages/Auth";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Template from "../pages/Template";

const routes = [
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "/register",
        element: <Register />
    }
]

export default createBrowserRouter(routes);