import React from "react";
import { Container, SxProps, Theme } from "@mui/material";
import fire from "src/resource/img/fire.svg";
import tent from "src/resource/img/tent.svg";
import car from "src/resource/img/car.svg";

type BackgroundContainerProps = {
    children: React.ReactNode;
    showLogo?: boolean;
    sx?: SxProps<Theme>;
};
export default function BackgroundContainer({ children, showLogo = true, sx }: BackgroundContainerProps): JSX.Element {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex", // Add display flex
                justifyContent: "center", // Add justifyContent
                //position: "relative",
                //height: "100%",
                backgroundColor: "#164F36",
                //overflow: "auto",
            }}
        >
            <img src={tent} alt="" width="25.4%" style={{ position: "fixed", bottom: "0%", left: "5%" }} />
            <img src={fire} alt="" width="7.2%" style={{ position: "fixed", bottom: "0%", left: "1%" }} />
            <img src={car} alt="" width="20%" style={{ position: "fixed", bottom: "0%", right: "1%" }} />

            {children}
        </Container>
    );
}
