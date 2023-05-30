import { Box } from "@mui/material";
import colors from "src/const/colors";
import ThemeCard from "src/components/ThemeCard";
import { themeImages } from "src/const/consts";
import { CustomImg } from "src/components/CustomImg";

type ThemeContentBoxProps = {
    title: string;
    icon?: string;
};

export default function ThemeContentBox({ title, icon }: ThemeContentBoxProps) {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <CustomImg src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <span style={{ alignSelf: "center" }}>{title}</span>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    margin: "10px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                {themeImages.map((theme) => (
                    <ThemeCard key={theme.theme} title={theme.title} imgUrl={theme.img}></ThemeCard>
                ))}
            </Box>
        </Box>
    );
}
