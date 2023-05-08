import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type HomeContentBoxProps = {
    title: string;
    icon?: string;
    contents?: Array<JSX.Element>;
    sx?: SxProps<Theme>;
};

const HomeContentBox = ({ title, icon, contents, sx }: HomeContentBoxProps): JSX.Element => {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px", boxShadow: "0px 7px 5px -5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: "solid #164F36" }}>
                {icon && <img src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <Typography alignSelf="center">{title}</Typography>
            </Box>
            <Box sx={{ backgroundColor: "gray" }}>
                <div style={{ width: "30px", height: "30px", backgroundColor: "yellow" }}></div>
                <div style={{ width: "30px", height: "30px", backgroundColor: "yellow" }}></div>
            </Box>
        </Box>
    );
};

export default HomeContentBox;
