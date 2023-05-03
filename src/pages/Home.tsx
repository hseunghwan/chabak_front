import React, { useEffect, useState } from "react";
import "src/App.css";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import HomeContainer from "src/components/HomeContainer";
import FloatingButton from "src/components/FloatingButton";
import SpeechBubble from "src/components/SpeechBubble";

export default function Home() {
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

    const homeStyles: SxProps<Theme> = {
        position: "relative",
        left: showSpeechBubble ? "25%" : 0,
        transition: "0.5s",
        flexDirection: "column",
    };
    const theme = useTheme();
    return (
        <>
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
                <FloatingButton onClick={handleClick} sx={{ display: { xs: "none", sm: "none", md: "flex" } }} />
            </Box>
            <HomeContainer
                sx={{
                    ...homeStyles,
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                        width: "45%",
                    },
                    height: "100%",
                }}
            />
        </>
    );
}
