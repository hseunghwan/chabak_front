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

export default function Signup() {
    return (
        <FormContainer title="회원가입">
            <Box sx={boxStyle}>
                <Box sx={{ ...boxStyle, flexDirection: "row" }}>
                    <img src={icons.carIcon} alt="carIcon" />
                    <img src={icons.chabakchabak} alt="chabakchabak" />
                </Box>
                <Box sx={boxStyle}>
                    <SignupInput label="이름" />
                    <SignupInput label="이메일" />
                    <SignupInput label="비밀번호" />
                    <SignupInput label="비밀번호 확인" />
                    <SignupInput label="주소" />
                </Box>
                <Button variant="contained">회원가입</Button>
            </Box>
        </FormContainer>
    );
}
