import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import icons from "src/const/icons";
import CenteredBox from "src/components/CenteredBox";
import userState from "src/states/userState";
import { useSetRecoilState } from "recoil";
import { redirect } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const setUser = useSetRecoilState(userState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        try {
            const response = await axios.post("/api/user/login", {
                email,
                password,
            });

            if (response.status === 200) {
                setUser({ token: response.data.token }); // 인증 토큰 저장
                redirect("/");
            } else {
                setEmailError(response.data.email);
                setPasswordError(response.data.password);
                throw new Error("No token received"); // 토큰이 없는 경우 에러를 던짐
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setEmailError(error.response.data.email);
                setPasswordError(error.response.data.password);
                alert("Login failed: " + error.message); // 로그인 실패 알림
            } else {
                // error가 Error 인스턴스가 아닌 경우의 처리
                console.error(error);
                alert("An unexpected error occurred.");
            }
        }
    };
    return (
        <FormContainer title="로그인">
            <form onSubmit={handleSubmit}>
                <CenteredBox>
                    <CenteredBox sx={{ flexDirection: "row" }}>
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
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError !== ""}
                            helperText={emailError}
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
                        <Button href="/signup">비밀번호 찾기</Button>
                        <Button href="/signup">회원가입</Button>
                    </Box>
                    <Button fullWidth type="submit" variant="contained">
                        로그인
                    </Button>
                </CenteredBox>
            </form>
        </FormContainer>
    );
}
