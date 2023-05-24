import React from "react";
import { useNavigate } from "react-router-dom";
type ThemeCardProps = {
    title: string;
    imgUrl: string;
};
export default function ThemeCard({ title, imgUrl }: ThemeCardProps) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/placesearchresult`)}
            style={{
                width: "20%",
                minWidth: "110px",
                maxWidth: "140px",
                margin: "10px",
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "auto",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
            }}
        >
            <p style={{ fontWeight: "bolder", fontSize: "17px", color: "white", padding: "0px 5px 10px 5px " }}>{title}</p>
        </div>
    );
}
