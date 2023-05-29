import React from "react";

type UserTalkBoxProps = {
    content: string;
};

const pStyle: React.CSSProperties = {
    margin: 0,
    wordWrap: "break-word",
};

export default function UserTalkBox({ content }: UserTalkBoxProps) {
    return (
        <div style={{ margin: "10px 5% 10px auto", padding: "7px", borderRadius: "10px", maxWidth: "65%", backgroundColor: "#B6ECE9" }}>
            <p style={pStyle}>{content}</p>
        </div>
    );
}
