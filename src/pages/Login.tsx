import React from "react";
import { Box, Button, SxProps, Theme } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import SignupInput from "src/components/SignupInput";
import icons from "src/const/icons";

const boxStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    gap: "15px",
};

export default function Login() {
    return (
        <FormContainer title="로그인">
            <Box sx={boxStyle}>
                <Box sx={{ ...boxStyle, flexDirection: "row" }}>
                    <img src={icons.carIcon} alt="carIcon" />
                    <img src={icons.chabakchabak} alt="chabakchabak" />
                </Box>
                <Box sx={boxStyle}>
                    <SignupInput label="이메일" />
                    <SignupInput label="비밀번호" />
                </Box>
                <Box sx={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                    <Button href="/signup">비밀번호 찾기</Button>
                    <Button href="/signup">회원가입</Button>
                </Box>
                <Button variant="contained">로그인</Button>
            </Box>
        </FormContainer>
    );
}
