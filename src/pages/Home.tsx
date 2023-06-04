import React, { useState } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import FloatingButton from "src/components/FloatingButton";
import FloatingChatButton from "src/components/FloatingChatButton";
import FloatingNaverMap from "src/components/FloatingNaverMap";
import { Outlet } from "react-router-dom";
import colors from "src/const/colors";

export default function Home() {
    const theme = useTheme();
    const [showSpeechBubble, setShowSpeechBubble] = useState(false); //true면 speechBubble 열림
    const [mapOrChat, setMapOrChat] = useState(true); //true면 map, false면 chat

    //map 누름
    const handleClick = () => {
        //열려있고 map이면 닫고
        if (showSpeechBubble && mapOrChat) setShowSpeechBubble(!showSpeechBubble);
        //열려있고 chat이면 map으로 바꿈
        else if (showSpeechBubble && !mapOrChat) setMapOrChat(!mapOrChat);
        //닫혀있으면 map 염
        else {
            setShowSpeechBubble(!showSpeechBubble);
            setMapOrChat(true);
        }
    };
    //chat 누름
    const handleFloatingAIChattingClick = () => {
        //열려있고 map이면 chat으로 바꿈
        if (showSpeechBubble && mapOrChat) setMapOrChat(!mapOrChat);
        //열려있고 chat이면 닫음
        else if (showSpeechBubble && !mapOrChat) setShowSpeechBubble(!showSpeechBubble);
        //닫혀있으면 chat 염
        else {
            setShowSpeechBubble(!showSpeechBubble);
            setMapOrChat(false);
        }
    };

    const floatingButtonContainerStyles: SxProps<Theme> = {
        display: "flex",
        transition: "0.5s",
        flexDirection: { xs: "row", sm: "row", md: "column" },
        position: "fixed",
        left: { xs: "30px", sm: "30px", md: showSpeechBubble ? "calc(52.5% - 70px)" : "calc(27.5% - 70px)" },
        bottom: "30px",
        gap: "10px",
        zIndex: 100,
    };

    const homeContainerStyles: SxProps<Theme> = {
        position: "relative",
        transition: "left 0.5s",
        flexDirection: "column",
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "45%",
            left: showSpeechBubble ? "25%" : 0,
        },
        height: "100%",
    };

    return (
        <>
            <FloatingNaverMap isOpen={showSpeechBubble} mapOrChat={mapOrChat} />
            <Box sx={floatingButtonContainerStyles}>
                <FloatingButton onClick={handleClick} />
                <FloatingChatButton onClick={handleFloatingAIChattingClick} />
            </Box>
            <Box sx={homeContainerStyles}>
                <Outlet />
                <Box
                    sx={{
                        backgroundColor: colors.FORMBACKGROUND,
                        position: "fixed",
                        width: "inherit",
                        height: "100%",
                        zIndex: 0,
                    }}
                ></Box>
            </Box>
        </>
    );
}
