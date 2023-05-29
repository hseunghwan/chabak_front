import { IconButton, InputBase } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import colors from "src/const/colors";
type ChattingInputProps = {
    style?: React.CSSProperties;
    onSendMessage: (message: string) => void;
};

export default function ChattingInput({ style, onSendMessage }: ChattingInputProps) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null); // InputBase 타입의 ref 생성

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        onSendMessage(inputValue);
        setInputValue(""); // 입력 필드 초기화
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleButtonClick();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [inputValue]);

    return (
        <div style={{ ...style, display: "flex", padding: "7px", margin: "10px", borderRadius: "10px", backgroundColor: colors.FORMBACKGROUND }}>
            <InputBase
                type="text"
                style={{ flexGrow: 1, borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.5)", padding: "0px 7px" }}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={inputValue}
                inputProps={{ ref: inputRef }} // 생성한 ref를 해당 엘리먼트에 연결
            />
            <IconButton onClick={handleButtonClick}>
                <SendRoundedIcon />
            </IconButton>
        </div>
    );
}
