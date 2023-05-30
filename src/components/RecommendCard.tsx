import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomImg } from "src/components/CustomImg";

type RecommendCardProps = {
    placeId: string;
    theme: string;
    name: string;
    address: string;
    imgUrl: string;
};
const pStyle: React.CSSProperties = {
    margin: "2px 7px",
    fontStyle: "normal",
    fontWeight: "400",
};

export default function RecommendCard({ placeId, theme, name, address, imgUrl }: RecommendCardProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => navigate(`/placedetail/${placeId}`)}
            sx={{
                width: "100%",
                minWidth: "200px",
                margin: "10px",
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "auto",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <CustomImg src={imgUrl} alt=" " style={{ width: "100%", maxHeight: "132px" }} />
            <p style={{ ...pStyle, fontSize: "12px" }}>{theme}</p>
            <p style={{ ...pStyle, fontSize: "18px" }}>{name}</p>
            <p style={{ ...pStyle, fontSize: "10px", marginBottom: "10px" }}>{address}</p>
        </Box>
    );
}
