import React from "react";
import { Box, Typography } from "@mui/material";
import colors from "src/const/colors";
import ThemeCard from "src/components/ThemeCard";
import { themeImages } from "src/const/consts";

type ThemeContentBoxProps = {
    title: string;
    icon?: string;
};

const themeList: string[] = ["밤하늘", "불멍", "산", "바다", "평지", "반려동물", "낚시", "문화"];
export default function ThemeContentBox({ title, icon }: ThemeContentBoxProps) {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px", boxShadow: "0px 7px 5px -5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <img src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <Typography alignSelf="center">{title}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {themeList.map((title, index) => (
                    <ThemeCard key={index} title={title} imgUrl={themeImages[index]}></ThemeCard>
                ))}
            </Box>
        </Box>
    );
}
