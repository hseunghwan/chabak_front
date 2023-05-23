import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SimpleInput, { CustomInput } from "src/components/SimpleInput";
import { styled } from "@mui/system";
import { useRecoilState } from "recoil";
import userState from "src/states/userState";
import { changeUserState } from "src/const/api/user";
import { checkPasswordFormat } from "src/const/consts";
import { ChangeUserStateModel } from "src/const/api/user";

export default function MypageProfile() {
    const [userData, setData] = useRecoilState(userState);
    const defaultPasswordError = "영어, 숫자, 특수문자를 포함한 8자리 이상";

    const [name, setName] = useState(userData?.name || "");
    const [phone_number, setphoneNumber] = useState(userData?.phone_number || "");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(defaultPasswordError);
    const [varifyPassword, setVarifyPassword] = useState("");
    const [varifyPasswordError, setVarifyPasswordError] = useState("");
    const [mycar, setMycar] = useState(userData?.mycar || "");
    const [nickname, setNickname] = useState(userData?.nickname || "");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");
        setVarifyPasswordError("");
        if (!checkPasswordFormat(password)) {
            return setPasswordError("비밀번호 형식이 올바르지 않습니다.");
        }
        if (password !== varifyPassword) {
            return setVarifyPasswordError("비밀번호가 일치하지 않습니다.");
        }
        const changedData: ChangeUserStateModel = { name, phone_number, mycar, password, nickname };
        userData &&
            changeUserState(userData.email, localStorage.getItem("jwtToken"), changedData)
                .then((response) => {
                    const { password, ...otherData } = changedData;
                    console.log("Change success");

                    setData(() => {
                        return { ...userData, ...otherData };
                    });
                })
                .catch((error) => {
                    console.error("Login failed: " + error.message + "\nError Status: " + error.response.status);
                    setPasswordError("이메일 또는 비밀번호를 확인해 주세요");
                });
    };
    return (
        <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignContent: "center" }}>
            <Typography sx={{ fontSize: "1.5rem" }}>프로필</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Box sx={{ width: "75%", marginTop: "1rem" }}>
                    <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem" }}>이메일</Typography>
                    <StyledInputRoot sx={{ width: "100%" }}>
                        <StyledInputElement>{userData?.email}</StyledInputElement>
                    </StyledInputRoot>
                </Box>
                <Box sx={{ width: "15%", marginTop: "1rem" }}>
                    <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", whiteSpace: "nowrap" }}>에코 LV</Typography>
                    <StyledInputRoot sx={{ width: "100%" }}>
                        <StyledInputElement>{userData?.eco_lv}</StyledInputElement>
                    </StyledInputRoot>
                </Box>
            </Box>
            <Typography sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>회원정보 수정</Typography>
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>이름</Typography>
            <CustomInput value={name} onChange={(e) => setName(e.target.value)} />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>전화번호</Typography>
            <CustomInput value={phone_number} onChange={(e) => setphoneNumber(e.target.value)} />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>비밀번호 {passwordError}</Typography>
            <SimpleInput onChange={(e) => setPassword(e.target.value)} error={passwordError !== ""} />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>비밀번호 확인 {varifyPasswordError}</Typography>
            <SimpleInput onChange={(e) => setVarifyPassword(e.target.value)} error={varifyPasswordError !== ""} />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차량</Typography>
            <CustomInput value={mycar} onChange={(e) => setMycar(e.target.value)} />
            <Typography sx={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>닉네임</Typography>
            <CustomInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <Button type="submit">저장</Button>
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
