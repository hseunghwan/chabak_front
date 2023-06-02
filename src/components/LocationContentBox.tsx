import React from "react";
import { Box } from "@mui/material";
import colors from "src/const/colors";
import LocationListBox from "src/components/LocationListBox";
import { CustomImg } from "src/components/CustomImg";

type LocationContentBoxProps = {
    title: string;
    icon?: string;
};
const cardStyle: React.CSSProperties = {
    padding: "20px 12.319px",
    margin: "10px",
    borderRadius: "50%",
    whiteSpace: "nowrap",
};
export default function LocationContentBox({ title, icon }: LocationContentBoxProps) {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <CustomImg src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <span style={{ alignSelf: "center" }}>{title}</span>
            </Box>
            <LocationListBox
                sx={{ flexWrap: "nowrap", overflow: "auto", scrollBehavior: "smooth", justifyContent: "flex-start" }}
                style={cardStyle}
            />
        </Box>
    );
}
