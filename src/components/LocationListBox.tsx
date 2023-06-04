import { Box, SxProps, Theme } from "@mui/material";
import { useEffect, useRef } from "react";
import LocationCard from "src/components/LocationCard";
import { gpe } from "src/const/consts";

type LocationListBoxProps = {
    sx?: SxProps<Theme>;
    setShowLocationListBox?: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties;
};

export default function LocationListBox({ sx, setShowLocationListBox, style }: LocationListBoxProps) {
    const boxRef = useRef<HTMLDivElement | null>(null);

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
        <Box
            ref={boxRef}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                background: "white",
                borderRadius: "10px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&::-webkit-scrollbar": {
                    height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#C1C1C1",
                    borderRadius: "10px",
                    backgroundClip: "padding-box",
                    border: "2px solid transparent",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#F1F1F1",
                    borderRadius: "10px",
                },
                scrollSnapType: "x mandatory", // Here
                ...sx,
            }}
        >
            {gpe.map((loc) => (
                <LocationCard key={loc.key} gpe={loc} setShowLocationListBox={setShowLocationListBox} style={style} />
            ))}
        </Box>
    );
}
