import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SimpleInput, { CustomInput } from "src/components/SimpleInput";
import { styled } from "@mui/system";

export default function MypageProfile() {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignContent: "center" }}>
            <Typography sx={{ fontSize: "1.5rem" }}>프로필</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Box sx={{ width: "75%", marginTop: "1rem" }}>
                    <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem" }}>이메일</Typography>
                    <StyledInputRoot sx={{ width: "100%" }}>
                        <StyledInputElement>hsh9298080@naver.com</StyledInputElement>
                    </StyledInputRoot>
                </Box>
                <Box sx={{ width: "15%", marginTop: "1rem" }}>
                    <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", whiteSpace: "nowrap" }}>에코 LV</Typography>
                    <StyledInputRoot sx={{ width: "100%" }}>
                        <StyledInputElement>5</StyledInputElement>
                    </StyledInputRoot>
                </Box>
            </Box>
            <Typography sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>회원정보 수정</Typography>
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>이름</Typography>
            <CustomInput />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>전화번호</Typography>
            <CustomInput />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>비밀번호</Typography>
            <SimpleInput />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>비밀번호 확인</Typography>
            <SimpleInput />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차량</Typography>
            <CustomInput />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>닉네임</Typography>
            <CustomInput />
            <Button>저장</Button>
        </Box>
    );
}

const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    900: "#1A2027",
};

const StyledInputRoot = styled("div")(`
  width: 75%;
  max-height: 36px;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  background: #D9D9D9;
  border: 1px solid ${grey[200]};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`);

const StyledInputElement = styled("p")(`
  margin: 0 0;
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 6px 12px;
  outline: 0;
`);
