import { Box, SxProps, Theme } from "@mui/material";
import { themeImages } from "src/const/consts";
import ThemeListCard from "src/components/ThemeListCard";

type ThemeListBoxProps = {
    sx?: SxProps<Theme>;
    setShowThemeListBox?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ThemeListBox({ sx, setShowThemeListBox }: ThemeListBoxProps) {
    return (
        <Box
            sx={{
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
            {themeImages.map((theme) => (
                <ThemeListCard key={theme.theme} theme={theme.title} setShowThemeListBox={setShowThemeListBox} />
            ))}
        </Box>
    );
}
