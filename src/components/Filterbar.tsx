import React, { useState } from "react";
import LocationListBox from "src/components/LocationListBox";
import icon from "src/const/icons";
import colors from "src/const/colors";
import { useRecoilState, useSetRecoilState } from "recoil";
import placeState from "src/states/placeState";
import searchState from "src/states/searchState";
import { placeListByLocation, placeListByLocationTheme } from "src/const/api/place";
import ThemeListBox from "src/components/ThemeListBox";

const spanStyle: React.CSSProperties = {
    margin: "5px",
    padding: "4px 6px",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
};

export default function Filterbar() {
    const setPlaceList = useSetRecoilState(placeState);
    const [userSearchState, setUserSearchState] = useRecoilState(searchState);
    const [showLocationListBox, setShowLocationListBox] = useState<boolean>(false);
    const [showThemeListBox, setShowThemeListBox] = useState<boolean>(false);

    const onClickLocationSpan = async () => {
        setUserSearchState({ ...userSearchState, location: "전국" });
        if (userSearchState.theme === null) {
            placeListByLocation("전국")
                .then((response) => {
                    setPlaceList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            placeListByLocationTheme("전국", userSearchState.theme)
                .then((response) => {
                    setPlaceList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const onClickThemeSpan = async () => {
        setUserSearchState({ ...userSearchState, theme: null });
        placeListByLocation(userSearchState.location)
            .then((response) => {
                setPlaceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const onClickSearchSpan = async () => {
        setUserSearchState({ location: "전국", theme: null, facils: null, searchKeyword: null });
        placeListByLocation("전국")
            .then((response) => {
                setPlaceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
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
                    <span onClick={onClickLocationSpan} style={spanStyle}>
                        지역:{userSearchState.location}
                    </span>
                )}
                {userSearchState.theme && (
                    <span onClick={onClickThemeSpan} style={spanStyle}>
                        테마:{userSearchState.theme}
                    </span>
                )}
                {userSearchState.searchKeyword && (
                    <span onClick={onClickSearchSpan} style={spanStyle}>
                        검색:{userSearchState.searchKeyword}
                    </span>
                )}
            </div>
            <div
                onClick={() => setShowThemeListBox(!showThemeListBox)}
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
            <ThemeListBox
                sx={{
                    position: "absolute",
                    top: "110px",
                    right: 0,
                    transition: "max-height 0.3s ease-in-out",
                    maxHeight: showThemeListBox ? "240px" : "0",
                    margin: "1%",
                }}
            />
        </div>
    );
}
