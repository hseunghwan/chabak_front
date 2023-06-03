import { Box } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomImg } from "src/components/CustomImg";

type PlaceListCardProps = {
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

export default function PlaceListCard({ placeId, theme, name, address, imgUrl }: PlaceListCardProps): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Box
            onClick={() => {
                if (location.pathname === "/mypage") navigate(`/placedetail/${placeId}`, { state: { fromMyPage: true } });
                else if (placeId) navigate(`/placedetail/${placeId}`);
            }}
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
            <CustomImg src={imgUrl} alt=" " style={{ width: "20%", minWidth: "100px", maxHeight: "100px" }} />
            <Box>
                <p style={{ ...pStyle, fontSize: "12px" }}>{theme}</p>
                <p style={{ ...pStyle, fontSize: "18px" }}>{name}</p>
                <p style={{ ...pStyle, fontSize: "10px", marginBottom: "10px" }}>{address}</p>
            </Box>
        </Box>
    );
}
