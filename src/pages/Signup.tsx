import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import CenteredBox from "src/components/CenteredBox";
import icons from "src/const/icons";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [varifyPassword, setVarifyPassword] = useState("");

    return (
        <FormContainer title="회원가입">
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
                        label="이름"
                        autoFocus
                        value={name}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError !== ""}
                        helperText={emailError}
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
                        error={passwordError !== ""}
                        helperText={passwordError}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="비밀번호 확인"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError !== ""}
                        helperText={passwordError}
                    />
                    <TextField
                        variant="filled"
                        color="success"
                        required
                        fullWidth
                        label="닉네임"
                        autoFocus
                        value={name}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError !== ""}
                        helperText={emailError}
                    />
                </CenteredBox>
                <Button variant="contained">회원가입</Button>
            </CenteredBox>
        </FormContainer>
    );
}
