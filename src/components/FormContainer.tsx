import React from "react";
import { AppBar, Box, IconButton, SxProps, Theme, Toolbar, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import icon from "src/const/icons";
import colors from "src/const/colors";
import { CustomImg } from "src/components/CustomImg";

type FormContainerProps = {
    title?: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

export default function FormContainer({ title, children, sx }: FormContainerProps): JSX.Element {
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
            <Box sx={{ position: "fixed", top: 0, width: "inherit", zIndex: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ color: colors.MAIN, backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                        <IconButton onClick={() => navigate(-1)} color="inherit">
                            <CustomImg src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                        </IconButton>
                        <span style={{ fontSize: "24px" }}>{title}</span>
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
                    position: "fixed",
                    width: "inherit",
                    height: "100%",
                    ...sx,
                }}
            ></Box>
            <Box sx={{ marginTop: "65px" }}></Box>
            {children}
        </Box>
    );
}
