import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import colors from "src/const/colors";
import RecommendCard from "src/components/RecommendCard";
import { placeListRecommend } from "src/const/api/place";
import { PlaceModel } from "src/const/consts";
import { sampleImages } from "src/const/consts";
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
                console.log(error);
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
        <Box sx={{ width: "100%", marginBottom: "5px", boxShadow: "0px 7px 5px -5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <img src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <Typography alignSelf="center">{title}</Typography>
            </Box>
            <Box
                ref={boxRef}
                sx={{
                    display: "flex",
                    overflow: "auto",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {placeList.map((place, index) => (
                    <RecommendCard
                        placeId={place.place_id}
                        theme={place.theme || ""}
                        name={place.place_name || ""}
                        address={place.address || ""}
                        imgUrl={sampleImages[index]}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HomeContentBox;
