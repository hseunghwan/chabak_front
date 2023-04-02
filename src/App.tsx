import React from "react";
import "src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Typography } from "@mui/material";
import Home from "src/pages/Home";
import Error from "src/pages/Error";
import About from "src/pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/about",
        element: <About />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
