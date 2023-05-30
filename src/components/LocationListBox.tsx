import { Box, SxProps, Theme } from "@mui/material";
import LocationCard from "src/components/LocationCard";
import { gpe } from "src/const/consts";

type LocationListBoxProps = {
    sx?: SxProps<Theme>;
    setShowLocationListBox?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationListBox({ sx, setShowLocationListBox }: LocationListBoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                margin: "10px",
                background: "white",
                borderRadius: "10px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                ...sx,
            }}
        >
            {gpe.map((loc) => (
                <LocationCard key={loc.key} gpe={loc} setShowLocationListBox={setShowLocationListBox} />
            ))}
        </Box>
    );
}
