import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const gpe: string[] = [
    "전국",
    "서울",
    "경기",
    "인천",
    "강원",
    "충북",
    "충남",
    "세종",
    "대전",
    "경북",
    "경남",
    "대구",
    "전북",
    "전남",
    "광주",
    "울산",
    "부산",
    "제주",
];
type LocationListBoxProps = {
    sx?: SxProps<Theme>;
};
export default function LocationListBox({ sx }: LocationListBoxProps) {
    const navigate = useNavigate();
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
            {gpe.map((title) => (
                <span
                    key={title}
                    onClick={() => navigate(`/placesearchresult/true/${title}/all`)}
                    style={{
                        borderColor: "rgba(143, 143, 143, 0.76)",
                        border: "1px solid",
                        padding: "2px 10px",
                        margin: "10px 20px",
                        borderRadius: "50px",
                        cursor: "pointer",
                    }}
                >
                    {title}
                </span>
            ))}
        </Box>
    );
}
