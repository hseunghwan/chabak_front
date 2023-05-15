import React, { useEffect, useState } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import FloatingButton from "src/components/FloatingButton";
import SpeechBubble from "src/components/SpeechBubble";
import { Outlet } from "react-router-dom";

export default function Home() {
    const theme = useTheme();
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);

    const handleClick = () => {
        setShowSpeechBubble(!showSpeechBubble);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setShowSpeechBubble(false);
            }
        };
        handleResize(); // 컴포넌트가 마운트되면 한 번 호출합니다.
        window.addEventListener("resize", handleResize); // 이벤트 리스너를 추가합니다.
        // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const floatingButtonContainerStyles: SxProps<Theme> = {
        transition: "0.5s",
        flexDirection: "column",
        position: "fixed",
        left: showSpeechBubble ? "calc(52.5% - 70px)" : "calc(27.5% - 70px)",
        bottom: "30px",
        zIndex: 100,
    };

    const homeContainerStyles: SxProps<Theme> = {
        position: "relative",
        left: showSpeechBubble ? "25%" : 0,
        transition: "left 0.5s",
        flexDirection: "column",
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "45%",
        },
        height: "100%",
    };

    return (
        <>
            <SpeechBubble isOpen={showSpeechBubble} />
            <Box sx={floatingButtonContainerStyles}>
                <FloatingButton onClick={handleClick} sx={{ display: { xs: "none", sm: "none", md: "flex" } }} />
            </Box>
            <Box sx={homeContainerStyles}>
                <Outlet />
            </Box>
        </>
    );
}
