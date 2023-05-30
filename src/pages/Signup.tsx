import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import CenteredBox from "src/components/CenteredBox";
import icons from "src/const/icons";
import { checkEmailFormat, checkPasswordFormat } from "src/const/consts";
import { userSigup } from "src/const/api/user";
import { useNavigate } from "react-router-dom";
import { CustomImg } from "src/components/CustomImg";

export default function Signup() {
    const defaultPasswordError = "영어, 숫자, 특수문자를 포함한 8자리 이상";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(defaultPasswordError);
    const [varifyPassword, setVarifyPassword] = useState("");
    const [varifyPasswordError, setVarifyPasswordError] = useState("");
    const [nickname, setNickname] = useState("");
    const [successSignup, setSuccessSignup] = useState(false); // 회원가입 성공 여부
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setVarifyPasswordError("");

        if (!checkEmailFormat(email)) {
            return setEmailError("이메일 형식이 올바르지 않습니다.");
        }
        if (!checkPasswordFormat(password)) {
            return setPasswordError("비밀번호 형식이 올바르지 않습니다.");
        }
        if (password !== varifyPassword) {
            return setVarifyPasswordError("비밀번호가 일치하지 않습니다.");
        }
        userSigup({ name, email, password, nickname })
            .then((response) => {
                console.log("Signup success");
                setSuccessSignup(true);
            })
            .catch((error) => {
                console.error("Signup failed: " + error.message + "\nError Status: " + error.response.status);
                if (error.response.status === 409) {
                    setEmailError("이미 가입된 이메일입니다.");
                }
            });
    };

    return (
        <FormContainer title="회원가입">
            <CenteredBox component="form" onSubmit={handleSubmit}>
                <CenteredBox sx={{ flexDirection: "row", zIndex: 1, marginTop: "5%" }}>
                    <CustomImg src={icons.carIcon} alt="carIcon" />
                    <CustomImg src={icons.chabakchabak} alt="chabakchabak" />
                </CenteredBox>
                <CenteredBox>
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="이름"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
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
                        error={passwordError !== defaultPasswordError && passwordError !== ""}
                        helperText={passwordError}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="비밀번호 확인"
                        type="password"
                        value={varifyPassword}
                        onChange={(e) => setVarifyPassword(e.target.value)}
                        error={varifyPasswordError !== ""}
                        helperText={varifyPasswordError}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </CenteredBox>
                <Button type="submit" variant="contained">
                    회원가입
                </Button>
                {successSignup && (
                    <Box display={"flex"}>
                        <span style={{ zIndex: 1, alignSelf: "center", marginRight: "15px" }}>회원가입 완료!</span>
                        <Button onClick={() => navigate("/")}>메인으로 돌아가기</Button>
                    </Box>
                )}
            </CenteredBox>
        </FormContainer>
    );
}
