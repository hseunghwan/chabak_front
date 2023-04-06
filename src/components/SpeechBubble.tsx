import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

const SpeechBubble: React.FC<{ google: any }> = ({ google }) => {
    const mapStyles: SxProps<Theme> = {
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        overflow: "hidden",
        border: "5px solid #ffffff",
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
                animation: "expand .5s ease-out forwards",
                transformOrigin: "100% 100%",
            }}
        >
            <Map google={google} zoom={14} initialCenter={{ lat: 37.5665, lng: 126.978 }} style={mapStyles} />
        </Box>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
})(SpeechBubble);
