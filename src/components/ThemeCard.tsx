import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { placeListByTheme } from "src/const/api/place";
import searchState from "src/states/searchState";
import placeState from "src/states/placeState";
type ThemeCardProps = {
    title: string;
    imgUrl: string;
};
export default function ThemeCard({ title, imgUrl }: ThemeCardProps) {
    const navigate = useNavigate();
    const setUserSearchState = useSetRecoilState(searchState);
    const setPlaceState = useSetRecoilState(placeState);

    const handleClick = async () => {
        setUserSearchState({ location: "전국", theme: title, facils: null, searchKeyword: null });
        placeListByTheme(title)
            .then((response) => {
                setPlaceState(response.data);
                navigate(`/placesearchresult`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: "30%",
                minWidth: "110px",
                maxWidth: "200px",
                margin: "10px",
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "auto",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
            }}
        >
            <p style={{ fontWeight: "bolder", fontSize: "17px", color: "white", padding: "0px 5px 40px 15px " }}>{title}</p>
        </div>
    );
}
