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
import PrivateRoute from "src/components/PrivateRoute";
import HomeContents from "src/components/HomeContents";
import Login from "src/pages/Login";
import Signup from "src/pages/Signup";
import Settings from "src/pages/Settings";
import RegisterPlace from "src/pages/RegisterPlace";
import RegisteredPlace from "src/pages/RegisteredPlace";

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
                    { path: "/registeredplace", element: <RegisteredPlace /> },
                    { path: "/registerplace", element: <PrivateRoute />, children: [{ index: true, element: <RegisterPlace /> }] },
                    { path: "/search", element: <Search /> },
                    { path: "/filter", element: <Filter /> },
                ],
            },
        ],
    },
    { path: "/mypage", element: <PrivateRoute />, children: [{ index: true, element: <Mypage /> }] },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/settings", element: <PrivateRoute />, children: [{ index: true, element: <Settings /> }] },
]);

export default function App() {
    return (
        <BackgroundContainer>
            <RouterProvider router={router} />
        </BackgroundContainer>
    );
}
