import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Container as MapDiv, NaverMap, useNavermaps, Overlay, useMap } from "react-naver-maps";
import placeState, { placeDetailState } from "src/states/placeState";
import searchState from "src/states/searchState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeMarkerClustering } from "src/marker-cluster";
import FloatingAIChatting from "./FloatingAIChatting";
import { useNavigate } from "react-router-dom";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { placeListByLocation } from "src/const/api/place";

function MarkerCluster() {
    const navermaps = useNavermaps();
    const map = useMap();
    const placeList = useRecoilValue(placeState);
    const placeDetail = useRecoilValue(placeDetailState);
    const navigate = useNavigate();

    // https://github.com/zeakd/react-naver-maps/blob/main/website/src/samples/marker-cluster.js
    const MarkerClustering = makeMarkerClustering(window.naver);

    const htmlMarker1 = {
        content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
        size: new navermaps.Size(40, 40),
        anchor: new navermaps.Point(20, 20),
    };
    const htmlMarker2 = {
        content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
        size: new navermaps.Size(40, 40),
        anchor: new navermaps.Point(20, 20),
    };
    const htmlMarker3 = {
        content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
        size: new navermaps.Size(40, 40),
        anchor: new navermaps.Point(20, 20),
    };
    const htmlMarker4 = {
        content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
        size: new navermaps.Size(40, 40),
        anchor: new navermaps.Point(20, 20),
    };
    const htmlMarker5 = {
        content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
        size: new navermaps.Size(40, 40),
        anchor: new navermaps.Point(20, 20),
    };

    const [cluster, setCluster] = useState();
    useEffect(() => {
        // 이거 없으면 장소리스트 바뀔때마다 클러스터링이 계속 생성서 겹쳐보임
        if (cluster) {
            // @ts-ignore
            cluster.setMap(null);
        }
        if (placeList === null || placeList === undefined) return;
        const markers: naver.maps.Marker[] = [];
        //placeDetailState가 null이 아니라면 placeDetailState를 사용하고, 그렇지 않으면 placeState를 사용합니다.
        let places = placeDetail !== undefined ? [placeDetail] : placeList;

        if (Array.isArray(places)) {
            // eslint-disable-next-line array-callback-return
            places.map((place) => {
                let lat = place.latitude === null ? false : Number(place.latitude);
                let lng = place.longitude === null ? false : Number(place.longitude);
                if (lat !== false && lng !== false) {
                    let marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(lng, lat),
                        title: place.place_id,
                    });
                    marker.setClickable(true);
                    marker.addListener("click", () => {
                        navigate(`/placedetail/${place.place_id}`);
                    });
                    markers.push(marker);
                }
            });
        }
        const newCluster = new MarkerClustering({
            minClusterSize: 2,
            maxZoom: 15,
            map: map,
            markers: markers,
            disableClickZoom: false,
            gridSize: 120,
            icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
            indexGenerator: [10, 100, 200, 500, 1000],
            stylingFunction: function (
                clusterMarker: {
                    getElement: () => {
                        (): any;
                        new (): any;
                        querySelector: { (arg0: string): { (): any; new (): any; innerText: any }; new (): any };
                    };
                },
                count: any
            ) {
                clusterMarker.getElement().querySelector("div:first-child").innerText = count;
            },
        });
        // @ts-ignore
        setCluster(newCluster);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeList, placeDetail]);
    return cluster ? <Overlay element={cluster} /> : <></>;
}

const mapStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    border: "5px solid #ffffff",
    overflow: "hidden",
};

const FloatingNaverMap: React.FC<{ isOpen: boolean; mapOrChat: boolean }> = ({ isOpen, mapOrChat }) => {
    const navermaps = useNavermaps();
    const [mapTypeId, setMapTypeId] = useState(navermaps.MapTypeId.NORMAL);
    const setPlaceList = useSetRecoilState(placeState);
    const setUserSearchState = useSetRecoilState(searchState);

    const setPlaceListReset = () => {
        setUserSearchState({ location: "전국", theme: null, facils: null, searchKeyword: null });
        placeListByLocation("전국")
            .then((response) => {
                setPlaceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
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
        <Box
            sx={{
                position: "fixed",
                width: "calc(52.5% - 110px)",
                height: "93vh",
                top: "20px",
                left: "0px",
                paddingLeft: "10px",
                transition: "0.5s",
                transform: isOpen ? "scale(1)" : "scale(0)",
                transformOrigin: "47% 95%",
            }}
        >
            <MapDiv style={{ ...mapStyles, display: mapOrChat ? "block" : "none" }}>
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
                    <IconButton
                        onClick={setPlaceListReset}
                        sx={{
                            backgroundColor: "white",
                            padding: "3px",
                            "&:hover": {
                                backgroundColor: "gray",
                            },
                        }}
                    >
                        <RefreshRoundedIcon />
                    </IconButton>
                </div>
                <NaverMap defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)} defaultZoom={8} mapTypeId={mapTypeId}>
                    <MarkerCluster />
                </NaverMap>
            </MapDiv>
            <FloatingAIChatting sx={{ ...mapStyles, display: mapOrChat ? "none" : "block" }} />
        </Box>
    );
};

export default FloatingNaverMap;
