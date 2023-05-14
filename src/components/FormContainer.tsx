import React, { useEffect, useState } from "react";
import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
type FormContainerProps = {
    title?: string;
    children: React.ReactNode;
};

export default function FormContainer({ title, children }: FormContainerProps): JSX.Element {
    const [appToolbarHeight, setAppToolbarHeight] = useState<number>(0);
    const appToolbarRef = React.useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        // AppToolbar의 Height를 계산
        const updateAppToolbarHeight = () => {
            if (appToolbarRef.current) {
                const height = appToolbarRef.current.clientHeight;
                setAppToolbarHeight(height);
            }
        };

        updateAppToolbarHeight();
        window.addEventListener("resize", updateAppToolbarHeight);
        return () => {
            window.removeEventListener("resize", updateAppToolbarHeight);
        };
    }, []);

    return (
        <Box sx={homeContainerStyles}>
            <Box ref={appToolbarRef} sx={{ position: "fixed", display: "flex", top: 0, width: "inherit", backgroundColor: "white" }}>
                <ArrowBackIosNewIcon sx={{ fontSize: "64px" }} />
                <Typography variant="h4" sx={{ margin: "1rem" }}>
                    {title}
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: "transparent", height: `calc(${appToolbarHeight}px + 1px)` }}></Box>
            {children}
        </Box>
    );
}
