import React from "react";
import { AppBar, Box, IconButton, SxProps, Theme, Toolbar, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import icon from "src/const/icons";
import colors from "src/const/colors";

type FormContainerProps = {
    title?: string;
    children: React.ReactNode;
};

export default function FormContainer({ title, children }: FormContainerProps): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();

    const homeContainerStyles: SxProps<Theme> = {
        position: "relative",
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
                    <Toolbar sx={{ color: colors.MAIN, backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                        <IconButton onClick={() => navigate(-1)} color="inherit">
                            <img src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                        </IconButton>
                        <Typography sx={{ fontSize: "24px" }}>{title}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                    backgroundColor: colors.FORMBACKGROUND,
                    marginTop: "65px",
                    height: "calc(100vh - 65px)",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
