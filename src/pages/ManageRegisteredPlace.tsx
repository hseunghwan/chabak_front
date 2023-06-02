import React, { useEffect, useState } from "react";
import { UserPlaceModelWithEmail, changeUserPlaceByPlaceId, deleteUserPlaceByPlaceId, getUserPlaceByPlaceId } from "src/const/api/userPlace";
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { CustomInput } from "src/components/SimpleInput";
import FormContainer from "src/components/FormContainer";

type MapProps = {
    lat: number;
    lng: number;
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

export default function ManageRegisteredPlace() {
    const { id } = useParams<{ id: string }>();
    const [place, setPlace] = useState<UserPlaceModelWithEmail>({} as UserPlaceModelWithEmail);
    const [userPlaceName, setUserPlaceName] = useState(place.userPlaceName);
    const [descript, setDescript] = useState(place.descript);
    const [tags, setTags] = useState(place.tags);

    useEffect(() => {
        getUserPlaceByPlaceId(Number(id))
            .then((response) => {
                setPlace(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        changeUserPlaceByPlaceId(place.userPlaceId, { userPlaceName, descript, tags })
            .then((response) => {
                if (response.status === 200) {
                    setPlace({ ...place, userPlaceName, descript, tags });
                    alert("차박지 수정이 완료되었습니다.");
                } else {
                    alert("차박지 수정에 실패하였습니다.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = async () => {
        deleteUserPlaceByPlaceId(place.userPlaceId)
            .then((response) => {
                if (response.status === 200) {
                    alert("차박지 삭제가 완료되었습니다.");
                } else {
                    alert("차박지 삭제에 실패하였습니다.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <FormContainer title={place.userPlaceName} sx={{ display: "block" }}>
            <div style={{ marginTop: "77px" }}>
                <Map lat={Number(place.latitude)} lng={Number(place.longitude)} />
            </div>
            <Box
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignContent: "center",
                    paddingBottom: "20px",
                }}
            >
                <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차박지 이름</span>
                <CustomInput value={userPlaceName} onChange={(e) => setUserPlaceName(e.target.value)} />
                <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차박지 설명</span>
                <CustomInput value={descript} onChange={(e) => setDescript(e.target.value)} sx={{ height: "200px", overflow: "auto" }} />
                <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>해시태그</span>
                <CustomInput value={tags} onChange={(e) => setTags(e.target.value)} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="submit">수정</Button>
                    <Button onClick={handleDelete}>삭제</Button>
                </div>
            </Box>
        </FormContainer>
    );
}
