//import React, { useState } from "react";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Box, SxProps, Theme } from "@mui/material";
import Home from "src/pages/Home";
import "src/App.css";
//import Error from "src/pages/Error";
//import About from "src/pages/About";
import BackgroundContainer from "src/components/BackgroundContainer";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//         errorElement: <Error />,
//     },
//     {
//         path: "/about",
//         element: <About />,
//     },
// ]);

export default function App() {
    //return <RouterProvider router={router} />;
    return (
        <BackgroundContainer>
            <Home />
        </BackgroundContainer>
    );
}
