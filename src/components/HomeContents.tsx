import { Box, Typography } from "@mui/material";
import React from "react";
import HomeContentBox from "src/components/HomeContentBox";
import icons from "src/const/icons";
import colors from "src/const/colors";
import ThemeContentBox from "src/components/ThemeContentBox";
import LocationContentBox from "src/components/LocationContentBox";

export default function HomeContents() {
    return (
        <Box sx={{ backgroundColor: colors.FORMBACKGROUND, paddingBottom: "1px" }}>
            <Typography sx={{ fontSize: "20px", color: colors.MAIN, padding: "3px" }}>AI로 쉽게 찾는 캠핑/차박지</Typography>
            <HomeContentBox title="이런 곳은 어때요?" icon={icons.mountain} />
            <ThemeContentBox title="추천 테마" icon={icons.campping} />
            <LocationContentBox title="지역 선택" icon={icons.location} />
        </Box>
    );
}
