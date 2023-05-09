//import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Box, SxProps, Theme } from "@mui/material";
import Home from "src/pages/Home";
import Error from "src/pages/Error";
import Mypage from "src/pages/Mypage";
import BackgroundContainer from "src/components/BackgroundContainer";
import HomeContainer from "src/components/HomeContainer";
import PlaceDetail from "src/components/PlaceDetail";
import Search from "src/components/Search";
import Filter from "src/components/Filter";
import HomeContents from "src/components/HomeContents";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                element: <HomeContainer />,
                children: [
                    { index: true, element: <HomeContents /> },
                    { path: "/placedetail", element: <PlaceDetail /> },
                ],
            },
            { path: "/search", element: <Search /> },
            { path: "/filter", element: <Filter /> },
        ],
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
