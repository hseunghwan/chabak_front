import { Box } from "@mui/material";
import React from "react";
import HomeContentBox from "src/components/HomeContentBox";
import icons from "src/const/icons";
import colors from "src/const/colors";
import ThemeContentBox from "src/components/ThemeContentBox";
import LocationContentBox from "src/components/LocationContentBox";
import { useNavigate } from "react-router-dom";
import userState from "src/states/userState";
import { useRecoilValue } from "recoil";

export default function HomeContents() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    return (
        <Box sx={{ backgroundColor: colors.FORMBACKGROUND, paddingBottom: "1px" }}>
            <div style={{ display: "flex" }}>
                <span style={{ display: "flex", alignItems: "center", fontSize: "20px", color: colors.MAIN, flexGrow: 1 }}>
                    AI로 쉽게 찾는 캠핑/차박지
                </span>
                <span
                    onClick={() => navigate("/registeredplacelist")}
                    style={{
                        fontSize: "16px",
                        color: colors.MAIN,
                        cursor: "pointer",
                        backgroundColor: "#75a961",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "5px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    차박지 보기
                </span>
                <span
                    onClick={() => {
                        if (user) navigate("/registerplace");
                        else navigate("/login");
                    }}
                    style={{
                        fontSize: "16px",
                        color: colors.MAIN,
                        cursor: "pointer",
                        backgroundColor: "#75a961",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "5px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    차박지 등록
                </span>
            </div>
            <>
                <LocationContentBox title="지역 선택" icon={icons.location} />
                <HomeContentBox title="이런 곳은 어때요?" icon={icons.mountain} />
                <ThemeContentBox title="추천 테마" icon={icons.campping} />
            </>
        </Box>
    );
}
