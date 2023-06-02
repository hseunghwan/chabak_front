import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomImg } from "src/components/CustomImg";
import { UserPlaceModelWithEmail } from "src/const/api/userPlace";
import car from "src/resource/img/car.svg";

type RegisteredPlaceCardProps = {
    userPlace: UserPlaceModelWithEmail;
};

const pStyle: React.CSSProperties = {
    margin: "7px",
    fontStyle: "normal",
    fontWeight: "400",
};

export default function RegisteredPlaceCard({ userPlace }: RegisteredPlaceCardProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => navigate(`/registeredplace/${userPlace.userPlaceId}`)}
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
            <CustomImg src={car} alt=" " style={{ width: "20%", minWidth: "100px", maxHeight: "100px" }} />
            <Box>
                <p style={{ ...pStyle, fontSize: "18px" }}>{userPlace.userPlaceName}</p>
                <p style={{ ...pStyle, fontSize: "12px" }}>{userPlace.descript}</p>
                <p style={{ ...pStyle, fontSize: "10px" }}>{userPlace.address}</p>
                <p style={{ ...pStyle, fontSize: "8px", marginBottom: "10px 0px", color: "gray" }}>{userPlace.userEmail}</p>
            </Box>
        </Box>
    );
}
