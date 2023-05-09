//import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Box, SxProps, Theme } from "@mui/material";
import Home from "src/pages/Home";
import Error from "src/pages/Error";
import Mypage from "src/pages/Mypage";
import BackgroundContainer from "src/components/BackgroundContainer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/mypage",
        element: <Mypage />,
    },
]);

export default function App() {
    return (
        <BackgroundContainer>
            <RouterProvider router={router} />;
        </BackgroundContainer>
    );
}
