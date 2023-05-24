import React from "react";
import { Box, Typography } from "@mui/material";
import colors from "src/const/colors";

type LocationContentBoxProps = {
    title: string;
    icon?: string;
};

const gpe: string[] = [
    "전국",
    "서울",
    "경기",
    "부산",
    "울산",
    "충남",
    "충북",
    "대전",
    "경남",
    "경북",
    "대구",
    "전남",
    "전북",
    "인천",
    "세종",
    "강원",
    "제주",
];
export default function LocationContentBox({ title, icon }: LocationContentBoxProps) {
    return (
        <Box sx={{ width: "100%", marginBottom: "5px" }}>
            <Box sx={{ display: "flex", backgroundColor: "white", borderBottom: `solid ${colors.MAIN}` }}>
                {icon && <img src={icon} alt="icon" style={{ padding: "3px", width: "20px" }} />}
                <Typography alignSelf="center">{title}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    margin: "10px",
                    padding: "10px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                {gpe.map((title, index) => (
                    <span
                        style={{
                            borderColor: "rgba(143, 143, 143, 0.76)",
                            border: "1px solid",
                            padding: "2px 10px",
                            margin: "10px",
                            borderRadius: "50px",
                        }}
                    >
                        {title}
                    </span>
                ))}
            </Box>
        </Box>
    );
}
