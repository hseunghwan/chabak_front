import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Box, Button, TextField } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import icons from "src/const/icons";
import CenteredBox from "src/components/CenteredBox";
import userState from "src/states/userState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const setUserState = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");
        try {
            const response = await axios.post(`/api/user/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                console.log("Login success");
                handleLoginSuccess(response);
                return navigate("/");
            } else {
                setPasswordError("이메일 또는 비밀번호를 확인해 주세요");
            }
        } catch (error: any) {
            console.error("Login failed: " + error.message + "\nError Status: " + error.response.status);
            setPasswordError("이메일 또는 비밀번호를 확인해 주세요");
        }
    };

    const handleLoginSuccess = (response: AxiosResponse<any, any>) => {
        const { jwtToken, password, ...otherData } = response.data;
        // jwtToken을 로컬스토리지에 저장
        localStorage.setItem("jwtToken", jwtToken);
        // Recoil 상태 업데이트
        setUserState(otherData);
    };

    return (
        <FormContainer title="로그인">
            <CenteredBox component="form" onSubmit={handleSubmit}>
                <CenteredBox sx={{ flexDirection: "row", zIndex: 1, marginTop: "25%" }}>
                    <img src={icons.carIcon} alt="carIcon" />
                    <img src={icons.chabakchabak} alt="chabakchabak" />
                </CenteredBox>
                <CenteredBox>
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="이메일"
                        autoFocus
                        value={email}
                        error={passwordError !== ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError !== ""}
                        helperText={passwordError}
                    />
                </CenteredBox>
                <Box sx={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                    <Button>비밀번호 찾기</Button>
                    <Button href="/signup">회원가입</Button>
                </Box>
                <Button type="submit" variant="contained">
                    로그인
                </Button>
            </CenteredBox>
        </FormContainer>
    );
}
