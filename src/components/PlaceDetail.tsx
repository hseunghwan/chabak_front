import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function PlaceDetail() {
    const style = useOutletContext<SxProps<Theme>>();

    return <Box sx={{ ...style }}>PlaceDetail</Box>;
}
