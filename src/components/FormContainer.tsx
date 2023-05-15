import React from "react";
import { AppBar, Box, SxProps, Theme, Toolbar, Typography, useTheme } from "@mui/material";
import icon from "src/const/icons";
import colors from "src/const/colors";

type FormContainerProps = {
    title?: string;
    children: React.ReactNode;
};

export default function FormContainer({ title, children }: FormContainerProps): JSX.Element {
    const theme = useTheme();
    const homeContainerStyles: SxProps<Theme> = {
        position: "relative",
        transition: "0.5s",
        flexDirection: "column",
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "45%",
        },
        height: "100%",
    };

    return (
        <Box sx={homeContainerStyles}>
            <Box sx={{ position: "fixed", top: 0, width: "inherit" }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: "white" }}>
                        <img src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                        <Typography sx={{ color: "black", fontSize: "24px" }}>{title}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ backgroundColor: colors.FORMBACKGROUND, marginTop: "65px", height: "100vh" }}>{children}</Box>
        </Box>
    );
}
