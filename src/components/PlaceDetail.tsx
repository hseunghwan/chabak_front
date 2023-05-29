import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { placeDetailById } from "src/const/api/place";
import placeState from "src/states/placeState";
import { PlaceModel } from "src/states/placeState";
import { IconButton, Toolbar } from "@mui/material";
import colors from "src/const/colors";
import icon from "src/const/icons";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";

const pStyle: React.CSSProperties = {
    margin: "0 0 5px 5px",
    fontSize: "20px",
    textJustify: "auto",
};

type MapProps = {
    lat: number;
    lng: number;
};
interface Facilities {
    [key: string]: string;
}
const facilities: Facilities = {
    ground: "운동장",
    hotwater: "온수",
    mart: "마트.편의점",
    playzone: "놀이터",
    pool: "물놀이장",
    sports: "운동시설",
    tramp: "트렘폴린",
    volt: "전기",
    walk: "산책로",
    wifi: "와이파이",
    wood: "장작판매",
};
function getKeyValue(key: string): string {
    const facilitieslist = key.split(",");
    console.log(facilitieslist);
    let result = "";
    // eslint-disable-next-line array-callback-return
    facilitieslist.map((facility) => {
        console.log(facility);
        if (facility in facilities) {
            result += facilities[facility] + " ";
            console.log(result);
        }
    });
    return result;
}
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
        <MapDiv style={{ position: "relative", width: "96%", height: "600px", margin: "2%", borderRadius: "10px", overflow: "hidden" }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
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

export default function PlaceDetail() {
    const [placeData, setPlaceData] = useState<PlaceModel>({} as PlaceModel);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const setPlaceList = useSetRecoilState(placeState);
    useEffect(() => {
        id &&
            placeDetailById(id).then((response) => {
                setPlaceList([response.data]);
                setPlaceData(response.data);
            });
    }, [id, setPlaceList]);
    return (
        <div style={{ backgroundColor: "white", paddingBottom: "10px" }}>
            <Toolbar sx={{ color: colors.MAIN, backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                <IconButton onClick={() => navigate(-1)} color="inherit">
                    <img src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                </IconButton>
                <span style={{ fontSize: "24px" }}>{placeData.place_name}</span>
            </Toolbar>
            <div style={{ maxHeight: "50vh", overflow: "hidden" }}>
                <img src={placeData.images?.[0] || ""} alt=" " style={{ width: "100%" }} />
            </div>
            <div style={{ padding: "10px" }}>
                <p style={{ ...pStyle, color: "#0072BC", fontWeight: "bold" }}>{placeData.facils}</p>
                <p style={{ ...pStyle, color: "#0072BC", fontWeight: "bold", fontSize: "16px" }}>{getKeyValue(placeData.amenities ?? " ")}</p>
                <p style={{ ...pStyle, fontWeight: "bold" }}>{placeData.place_name}</p>
                <p style={{ ...pStyle, color: "#64748B" }}>
                    <HomeTwoToneIcon sx={{ marginRight: "5px" }} />
                    {placeData.page_url}
                </p>
                <p style={{ ...pStyle, color: "#64748B" }}>
                    <PlaceTwoToneIcon sx={{ marginRight: "5px" }} />
                    {placeData.address}
                </p>
                <p style={{ ...pStyle, color: "#64748B" }}>
                    <PhoneTwoToneIcon sx={{ marginRight: "5px" }} />
                    {placeData.contact}
                </p>
            </div>
            <Map lat={Number(placeData.longitude)} lng={Number(placeData.latitude)} />
        </div>
    );
}
