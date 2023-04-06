import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type HomeContentBoxProps = {
    title: string;
    icon?: string;
    contents?: Array<JSX.Element>;
    sx?: SxProps<Theme>;
};

const HomeContentBox = ({ title, icon, contents, sx }: HomeContentBoxProps): JSX.Element => {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ backgroundColor: "white", borderBottom: "solid #164F36" }}>
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Divider />
            <Box sx={{ backgroundColor: "gray" }}>
                <div style={{ width: "30px", height: "30px", backgroundColor: "yellow" }}></div>
                <div style={{ width: "30px", height: "30px", backgroundColor: "yellow" }}></div>
                <div style={{ width: "30px", height: "30px", backgroundColor: "yellow" }}></div>
            </Box>
        </Box>
    );
};

export default HomeContentBox;
