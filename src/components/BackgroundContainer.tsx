import React from "react";
import { Box } from "@mui/material";
import icons from "src/const/icons";
import colors from "src/const/colors";
import { CustomImg } from "src/components/CustomImg";

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
            <div style={{ width: "100vW", height: "100vh", position: "fixed", backgroundColor: colors.MAIN }}></div>
            <CustomImg src={icons.tent} alt="" width="25.4%" style={{ position: "fixed", bottom: "0%", left: "5%" }} />
            <CustomImg src={icons.fire} alt="" width="7.2%" style={{ position: "fixed", bottom: "0%", left: "1%" }} />
            <CustomImg src={icons.car} alt="" width="20%" style={{ position: "fixed", bottom: "0%", right: "1%" }} />

            {children}
        </Box>
    );
}
