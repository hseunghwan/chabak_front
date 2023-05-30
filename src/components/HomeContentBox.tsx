import { Box, SxProps, Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import colors from "src/const/colors";
import RecommendCard from "src/components/RecommendCard";
import { placeListRecommend } from "src/const/api/place";
import { PlaceModel } from "src/states/placeState";
import { CustomImg } from "src/components/CustomImg";

type HomeContentBoxProps = {
    title: string;
    icon?: string;
    sx?: SxProps<Theme>;
};

const HomeContentBox = ({ title, icon, sx }: HomeContentBoxProps): JSX.Element => {
    const [placeList, setPlaceList] = useState<Array<PlaceModel>>([]);
    const boxRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        placeListRecommend()
            .then((respond) => {
                setPlaceList(respond.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        //컨텐츠 박스 가로 스크롤
        const handleWheel = (event: WheelEvent) => {
            if (boxRef.current && boxRef.current.contains(event.target as Node)) {
                event.preventDefault();
                boxRef.current.scrollLeft += event.deltaY;
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <CustomImg src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <span style={{ alignSelf: "center" }}>{title}</span>
            </Box>
            <Box
                ref={boxRef}
                sx={{
                    display: "flex",
                    overflow: "auto",
                    margin: "10px",
                    background: "white",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    scrollBehavior: "smooth",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {placeList.map((place, index) => (
                    <RecommendCard
                        key={place.place_id}
                        placeId={place.place_id}
                        theme={place.theme || ""}
                        name={place.place_name || ""}
                        address={place.address || ""}
                        imgUrl={place.images[0] || ""}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HomeContentBox;
