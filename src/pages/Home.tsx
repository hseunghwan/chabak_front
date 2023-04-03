import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import AppToolbar from "src/components/AppToolbar";

type HomeProps = {
    sx?: SxProps<Theme>;
};
const Home = ({ sx }: HomeProps): JSX.Element => {
    return (
        <Box sx={{ ...sx, position: "relative", width: "45%", height: "100%" }}>
            <AppToolbar />
            <div style={{ width: "100%", height: "200%", backgroundColor: "gray" }} />
        </Box>
    );
};
export default Home;
