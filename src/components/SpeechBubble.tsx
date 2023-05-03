import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

const SpeechBubble: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const { naver } = window;

        if (mapRef.current) {
            const location = new naver.maps.LatLng(37.5656, 126.9769);
            const mapOptions: naver.maps.MapOptions = {
                center: location,
                zoom: 17,
                scaleControl: false,
            };
            new window.naver.maps.Map(mapRef.current, mapOptions);
        }
    }, []);

    const mapStyles: SxProps<Theme> = {
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        border: "5px solid #ffffff",
        overflow: "hidden",
    };

    return (
        <Box
            sx={{
                position: "fixed",
                width: "calc(52.5% - 110px)",
                height: "93vh",
                top: "20px",
                left: "0px",
                paddingLeft: "10px",
                transition: "0.5s",
                transform: isOpen ? "scale(1)" : "scale(0)",
                transformOrigin: "47% 95%",
            }}
        >
            <Box ref={mapRef} sx={mapStyles} />
        </Box>
    );
};

export default SpeechBubble;
