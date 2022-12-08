import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {useDispatch} from "react-redux";
import {initAuth} from "./store/mainSlice";

export default function App() {
    const dispatch = useDispatch();

    dispatch(initAuth());

    return <RouterProvider router={router} />;
}
