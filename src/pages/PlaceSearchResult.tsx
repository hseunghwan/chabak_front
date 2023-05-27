import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import LocationListBox from "src/components/LocationListBox";
import placeState from "src/states/placeState";
import colors from "src/const/colors";
import icon from "src/const/icons";
import searchState from "src/states/searchState";
import PlaceListCard from "src/components/PlaceListCard";
import { placeListByLocation, placeListByLocationTheme } from "src/const/api/place";

const spanStyle: React.CSSProperties = {
    margin: "5px",
    padding: "4px 6px",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
};

export default function PlaceSearchResult() {
    const param = useParams<{ showfilter: string }>();
    const navigete = useNavigate();
    const [placeList, setPlaceList] = useRecoilState(placeState);
    const [userSearchState, setUserSearchState] = useRecoilState(searchState);
    const [showLocationListBox, setShowLocationListBox] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);

    //무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "20px", threshold: 1.0 }
        );

        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, []);
    const itemPerPage = 10;
    const displayedItems = placeList.slice(0, itemPerPage * page);
    useEffect(() => {
        //필터에 의한 변경에 따른 상태변경, 반영
        if (userSearchState.theme === null && userSearchState.facils === null && userSearchState.searchKeyword === null) {
            placeListByLocation(userSearchState.location)
                .then((response) => {
                    if (response.status === 200) {
                        setPlaceList(response.data);
                    } else if (response.status === 304) {
                        console.log("304");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (userSearchState.theme !== null && userSearchState.facils === null && userSearchState.searchKeyword === null) {
            placeListByLocationTheme(userSearchState.location, userSearchState.theme)
                .then((response) => {
                    if (response.status === 200) {
                        setPlaceList(response.data);
                    } else if (response.status === 304) {
                        console.log("304");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [setPlaceList, userSearchState]);

    return (
        <div style={{ backgroundColor: colors.FORMBACKGROUND }}>
            {param.showfilter === "true" && (
                <div style={{ display: "flex", backgroundColor: colors.GARY }}>
                    <div onClick={() => setShowLocationListBox(!showLocationListBox)} style={{ display: "flex", padding: "10px", cursor: "pointer" }}>
                        <span style={{ paddingRight: "7px" }}>{userSearchState.location}</span>
                        <img
                            src={icon.arrowDown}
                            alt="arrowDown"
                            style={{
                                rotate: "180deg",
                                width: "13px",
                                transition: "transform 0.3s",
                                transform: showLocationListBox ? "rotate(180deg)" : undefined,
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", alignContent: "center", flexGrow: 1 }}>
                        {userSearchState.location && (
                            <span onClick={() => setUserSearchState({ ...userSearchState, location: "전국" })} style={spanStyle}>
                                지역:{userSearchState.location}
                            </span>
                        )}
                        {userSearchState.theme && (
                            <span onClick={() => setUserSearchState({ ...userSearchState, theme: null })} style={spanStyle}>
                                테마:{userSearchState.theme}
                            </span>
                        )}
                        {userSearchState.facils && (
                            <span onClick={() => setUserSearchState({ ...userSearchState, facils: null })} style={spanStyle}>
                                시설:{userSearchState.facils}
                            </span>
                        )}
                        {userSearchState.searchKeyword && (
                            <span onClick={() => setUserSearchState({ ...userSearchState, searchKeyword: null })} style={spanStyle}>
                                검색:{userSearchState.searchKeyword}
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => navigete(`/filter`)}
                        style={{
                            display: "flex",
                            margin: "6px",
                            padding: "4px 6px",
                            cursor: "pointer",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <img src={icon.filter} alt="filter" style={{ width: "13px" }} />
                        <span style={{ paddingLeft: "5px" }}>필터</span>
                    </div>
                    <LocationListBox
                        sx={{
                            position: "absolute",
                            top: "110px",
                            transition: "max-height 0.3s ease-in-out",
                            maxHeight: showLocationListBox ? "240px" : "0",
                            margin: "1%",
                        }}
                    />
                </div>
            )}
            <div>
                {/* 무한스크롤 구현 */}
                {displayedItems.map((place) => (
                    <PlaceListCard
                        key={place.place_id}
                        placeId={place.place_id}
                        theme={place.theme || ""}
                        name={place.place_name || ""}
                        address={place.address || ""}
                        imgUrl={place.images[0]}
                    />
                ))}
                <div ref={loader}>
                    <h2>Loading...</h2>
                </div>
            </div>
        </div>
    );
}
