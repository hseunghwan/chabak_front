import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import icons from "src/const/icons";

type BackgroundContainerProps = {
    children: React.ReactNode;
    showLogo?: boolean;
    sx?: SxProps<Theme>;
};
export default function BackgroundContainer({ children, showLogo = true, sx }: BackgroundContainerProps): JSX.Element {
    return (
        <Box
            sx={{
                display: "flex", // Add display flex
                justifyContent: "center", // Add justifyContent
                //position: "relative",
                //height: "100%",
                backgroundColor: "#164F36",
                //overflow: "auto",
                // paddingLeft: 0,
                // paddingRight: 0,
            }}
        >
            <img src={icons.tent} alt="" width="25.4%" style={{ position: "fixed", bottom: "0%", left: "5%" }} />
            <img src={icons.fire} alt="" width="7.2%" style={{ position: "fixed", bottom: "0%", left: "1%" }} />
            <img src={icons.car} alt="" width="20%" style={{ position: "fixed", bottom: "0%", right: "1%" }} />

            {children}
        </Box>
    );
}
