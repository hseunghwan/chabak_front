import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import LocationListBox from "src/components/LocationListBox";
import placeState from "src/states/placeState";
import colors from "src/const/colors";
import icon from "src/const/icons";

export default function PlaceSearchResult() {
    const param = useParams<{ showfilter: string; location: string; theme: string }>();
    const navigete = useNavigate();
    const placeList = useRecoilState(placeState);
    const [showLocationListBox, setShowLocationListBox] = useState<boolean>(false);

    console.log(placeList);
    return (
        <div>
            {param.showfilter === "true" && (
                <>
                    <div style={{ display: "flex", backgroundColor: colors.GARY }}>
                        <div
                            onClick={() => setShowLocationListBox(!showLocationListBox)}
                            style={{ display: "flex", padding: "10px", cursor: "pointer" }}
                        >
                            <span style={{ paddingRight: "7px" }}>{param.location}</span>
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
                        <div style={{ flexGrow: 1 }}></div>
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
                                left: 0,
                                top: "100%",
                                transition: "max-height 0.3s ease-in-out",
                                maxHeight: showLocationListBox ? "240px" : "0",
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
