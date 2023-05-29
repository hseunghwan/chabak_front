import React, { useEffect, useState } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import FloatingButton from "src/components/FloatingButton";
import FloatingChatButton from "src/components/FloatingChatButton";
import FloatingNaverMap from "src/components/FloatingNaverMap";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import placeState from "src/states/placeState";
import { placeListByLocation } from "src/const/api/place";

export default function Home() {
    const theme = useTheme();
    const [showSpeechBubble, setShowSpeechBubble] = useState(false); //true면 speechBubble 열림
    const [mapOrChat, setMapOrChat] = useState(false); //true면 map, false면 chat
    const setPlaceList = useSetRecoilState(placeState);

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
    placeListByLocation("전국")
        .then((response) => {
            setPlaceList(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

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
        display: "flex",
        transition: "0.5s",
        flexDirection: "column",
        position: "fixed",
        left: showSpeechBubble ? "calc(52.5% - 70px)" : "calc(27.5% - 70px)",
        bottom: "30px",
        gap: "10px",
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
            <FloatingNaverMap isOpen={showSpeechBubble} mapOrChat={mapOrChat} />
            <Box sx={floatingButtonContainerStyles}>
                <FloatingButton onClick={handleClick} sx={{ display: { xs: "none", sm: "none", md: "flex" } }} />
                <FloatingChatButton onClick={handleFloatingAIChattingClick} sx={{ display: { xs: "none", sm: "none", md: "flex" } }} />
            </Box>
            <Box sx={homeContainerStyles}>
                <Outlet />
            </Box>
        </>
    );
}
