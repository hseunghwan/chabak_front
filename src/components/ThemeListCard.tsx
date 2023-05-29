import { useRecoilState, useSetRecoilState } from "recoil";
import { placeListByLocationTheme } from "src/const/api/place";
import placeState from "src/states/placeState";
import searchState from "src/states/searchState";

type ThemeListCardProps = {
    theme: string;
};

export default function ThemeListCard({ theme }: ThemeListCardProps) {
    const setPlaceList = useSetRecoilState(placeState);
    const [userSearchState, setUserSearchState] = useRecoilState(searchState);

    const handleClick = async () => {
        setUserSearchState({ ...userSearchState, theme: theme, searchKeyword: null });
        placeListByLocationTheme(userSearchState.location, theme)
            .then((response) => {
                setPlaceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <p
            key={theme}
            onClick={handleClick}
            style={{
                borderColor: "rgba(143, 143, 143, 0.76)",
                border: "1px solid",
                padding: "2px 10px",
                margin: "10px 20px",
                borderRadius: "50px",
                cursor: "pointer",
                textAlign: "center",
            }}
        >
            {theme}
        </p>
    );
}
