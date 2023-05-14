import React from "react";
import { Box } from "@mui/material";
import icons from "src/const/icons";

type BackgroundContainerProps = {
    children: React.ReactNode;
};

export default function BackgroundContainer({ children }: BackgroundContainerProps): JSX.Element {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100vW", height: "100vh", position: "fixed", backgroundColor: "#164F36" }}></div>
            <img src={icons.tent} alt="" width="25.4%" style={{ position: "fixed", bottom: "0%", left: "5%" }} />
            <img src={icons.fire} alt="" width="7.2%" style={{ position: "fixed", bottom: "0%", left: "1%" }} />
            <img src={icons.car} alt="" width="20%" style={{ position: "fixed", bottom: "0%", right: "1%" }} />

            {children}
        </Box>
    );
}
