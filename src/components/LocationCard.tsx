import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { placeListByLocation } from "src/const/api/place";
import placeState from "src/states/placeState";
import searchState from "src/states/searchState";

type LocationCardProps = {
    gpe: { key: string; value: string };
};

export default function LocationCard({ gpe }: LocationCardProps) {
    const setPlaceState = useSetRecoilState(placeState);
    const [userSearchState, setUserSearchState] = useRecoilState(searchState);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async () => {
        if (location.pathname === "/placesearchresult/true") {
            setUserSearchState({ ...userSearchState, location: gpe.value, searchKeyword: null });
            placeListByLocation(gpe.value)
                .then((response) => {
                    setPlaceState(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setUserSearchState({ location: gpe.value, theme: null, facils: null, searchKeyword: null });
            placeListByLocation(gpe.value)
                .then((response) => {
                    setPlaceState(response.data);
                    navigate(`/placesearchresult/true`);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <span
            key={gpe.key}
            onClick={handleClick}
            style={{
                borderColor: "rgba(143, 143, 143, 0.76)",
                border: "1px solid",
                padding: "2px 10px",
                margin: "10px 20px",
                borderRadius: "50px",
                cursor: "pointer",
            }}
        >
            {gpe.key}
        </span>
    );
}
