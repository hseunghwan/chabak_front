import React, { useState } from "react";
import "src/App.css";
import { Box, SxProps, Theme } from "@mui/material";
import HomeContainer from "src/components/HomeContainer";
import FloatingButton from "src/components/FloatingButton";
import SpeechBubble from "src/components/SpeechBubble";
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

export default function Home() {
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
        <BackgroundContainer>
            <SpeechBubble isOpen={showSpeechBubble} />
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
            <HomeContainer sx={homeStyles} />
        </BackgroundContainer>
    );
}
