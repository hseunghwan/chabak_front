import React, { useState } from "react";
import "src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "src/pages/Home";
import Error from "src/pages/Error";
import About from "src/pages/About";
import car from "src/resource/img/car.svg";
import FloatingButton from "src/components/FloatingButton";
import SpeechBubble from "src/components/SpeechBubble";
import { Box, SxProps, Theme } from "@mui/material";

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
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);

    const handleClick = () => {
        setShowSpeechBubble(!showSpeechBubble);
    };
    const homeStyles: SxProps<Theme> = {
        position: "relative",
        left: showSpeechBubble ? "25%" : 0,
        transition: "0.5s",
        flexDirection: "column",
    };
    //return <RouterProvider router={router} />;
    return (
        <Box
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundColor: "#164F36",
                overflow: "auto",
                display: "flex", // Add display flex
                justifyContent: "center", // Add justifyContent
            }}
        >
            {showSpeechBubble && <SpeechBubble />}
            <Box
                sx={{
                    ...homeStyles,
                    position: "fixed",
                    left: showSpeechBubble ? "calc(52.5% - 70px)" : "calc(27.5% - 70px)",
                    bottom: "30px",
                    zIndex: 100,
                }}
            >
                <FloatingButton onClick={handleClick} />
            </Box>
            <Home sx={homeStyles} />
        </Box>
    );
}
