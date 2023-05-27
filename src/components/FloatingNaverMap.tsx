import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Container as MapDiv, NaverMap, useNavermaps, Overlay, useMap } from "react-naver-maps";
import placeState from "src/states/placeState";
import { useRecoilValue } from "recoil";
import { makeMarkerClustering } from "src/marker-cluster";

function MarkerCluster() {
    // https://github.com/navermaps/marker-tools.js/blob/master/marker-clustering/src/MarkerClustering.js
    // 예제에서 제공된 코드를 그대로 사용하되 naver 객체를 주입 받도록 간단히 makeMarkerClustering로 Wrapping 합니다.

    const navermaps = useNavermaps();
    const map = useMap();
    const placeList = useRecoilValue(placeState);

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
        // eslint-disable-next-line array-callback-return
        placeList.map((place) => {
            let lat = place.latitude === null ? false : Number(place.latitude);
            let lng = place.longitude === null ? false : Number(place.longitude);
            if (lat !== false && lng !== false) {
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(lng, lat),
                });
                markers.push(marker);
            }
        });

        const newCluster = new MarkerClustering({
            minClusterSize: 2,
            maxZoom: 8,
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
    }, [placeList]);
    // @ts-ignore
    return cluster ? <Overlay element={cluster} /> : null;
}

const mapStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    border: "5px solid #ffffff",
    overflow: "hidden",
};

const FloatingNaverMap: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const navermaps = useNavermaps();

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
            <MapDiv style={mapStyles}>
                <NaverMap defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)} defaultZoom={8}>
                    <MarkerCluster />
                </NaverMap>
            </MapDiv>
        </Box>
    );
};

export default FloatingNaverMap;
