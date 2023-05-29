import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type PlaceListCardProps = {
    placeId: string;
    theme: string;
    name: string;
    address: string;
    imgUrl: string;
};
const pStyle: React.CSSProperties = {
    margin: "2px 7px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
};

export default function PlaceListCard({ placeId, theme, name, address, imgUrl }: PlaceListCardProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => navigate(`/placedetail/${placeId}`)}
            sx={{
                display: "flex",
                width: "96%",
                minWidth: "200px",
                margin: "2%",
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
        >
            <img src={imgUrl} alt=" " style={{ width: "20%", minWidth: "100px", maxHeight: "100px" }} />
            <Box>
                <p style={{ ...pStyle, fontSize: "12px" }}>{theme}</p>
                <p style={{ ...pStyle, fontSize: "18px" }}>{name}</p>
                <p style={{ ...pStyle, fontSize: "10px", marginBottom: "10px" }}>{address}</p>
            </Box>
        </Box>
    );
}
