import React, { useEffect, useState } from "react";
import { UserPlaceModelWithEmail, getUserPlaceByPlaceId } from "src/const/api/userPlace";
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import { IconButton, Toolbar } from "@mui/material";
import { CustomImg } from "src/components/CustomImg";
import colors from "src/const/colors";
import icon from "src/const/icons";
import { useNavigate, useParams } from "react-router-dom";

type MapProps = {
    lat: number;
    lng: number;
};

const pStyle: React.CSSProperties = {
    margin: "10px 0px 0px 20px",
    fontStyle: "normal",
    fontWeight: "400",
};

const Map = ({ lat, lng }: MapProps) => {
    const navermaps = useNavermaps();
    const [mapTypeId, setMapTypeId] = useState(navermaps.MapTypeId.SATELLITE);
    const buttons = [
        {
            typeId: navermaps.MapTypeId.NORMAL,
            text: "일반지도",
        },
        {
            typeId: navermaps.MapTypeId.TERRAIN,
            text: "지형도",
        },
        {
            typeId: navermaps.MapTypeId.SATELLITE,
            text: "위성지도",
        },
        {
            typeId: navermaps.MapTypeId.HYBRID,
            text: "겹쳐보기",
        },
    ];

    return (
        <MapDiv style={{ position: "relative", width: "96%", height: "300px", margin: "2%", borderRadius: "10px", overflow: "hidden" }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    padding: 5,
                }}
            >
                {buttons.map((btn) => {
                    return (
                        <button
                            key={btn.typeId}
                            style={{
                                border: "solid 1px #333",
                                outline: "0 none",
                                borderRadius: "5px",
                                boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.5)",
                                margin: "0 5px 5px 0",
                                backgroundColor: btn.typeId === mapTypeId ? "#2780E3" : "white",
                                color: btn.typeId === mapTypeId ? "white" : "black",
                            }}
                            onClick={() => {
                                setMapTypeId(btn.typeId);
                            }}
                        >
                            {btn.text}
                        </button>
                    );
                })}
            </div>
            <NaverMap
                // uncontrolled KVO
                defaultZoom={15}
                center={new navermaps.LatLng(lat, lng)}
                // controlled KVO
                mapTypeId={mapTypeId}
            >
                <Marker position={new navermaps.LatLng(lat, lng)} />
            </NaverMap>
        </MapDiv>
    );
};

export default function RegisteredPlace() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [place, setPlace] = useState<UserPlaceModelWithEmail>({} as UserPlaceModelWithEmail);

    useEffect(() => {
        getUserPlaceByPlaceId(Number(id))
            .then((response) => {
                setPlace(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    return (
        <div style={{ backgroundColor: "white" }}>
            <Toolbar sx={{ color: colors.MAIN, borderBottom: `solid ${colors.MAIN}`, padding: 0 }}>
                <IconButton onClick={() => navigate(-1)} color="inherit">
                    <CustomImg src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                </IconButton>
                <span style={{ fontSize: "24px" }}>{place.userPlaceName}</span>
            </Toolbar>
            <Map lat={Number(place.latitude)} lng={Number(place.longitude)} />
            <div>
                <p style={{ ...pStyle, fontSize: "18px" }}>{`장소 이름: ${place.userPlaceName}`}</p>
                <p style={{ ...pStyle, fontSize: "12px" }}>{`설명: ${place.descript}`}</p>
                <p style={{ ...pStyle, fontSize: "10px", marginBottom: "0px" }}>{`주소: ${place.address}`}</p>
            </div>
        </div>
    );
}
