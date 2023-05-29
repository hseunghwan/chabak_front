import React from "react";
import { Box, Typography } from "@mui/material";
import colors from "src/const/colors";
import LocationListBox from "src/components/LocationListBox";
import { CustomImg } from "src/components/CustomImg";

type LocationContentBoxProps = {
    title: string;
    icon?: string;
};

export default function LocationContentBox({ title, icon }: LocationContentBoxProps) {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <CustomImg src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <Typography alignSelf="center">{title}</Typography>
            </Box>
            <LocationListBox />
        </Box>
    );
}
