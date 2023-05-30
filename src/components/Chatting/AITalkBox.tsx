import React from "react";
import colors from "src/const/colors";

type AITalkBoxProps = {
    content: string;
};

const pStyle: React.CSSProperties = {
    margin: 0,
    wordWrap: "break-word",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 23,
    lineHeight: "28px",
};

export default function AITalkBox({ content }: AITalkBoxProps) {
    return (
        <div style={{ margin: "10px 0px 10px 5%", borderRadius: "10px", padding: 7, maxWidth: "65%", backgroundColor: colors.FORMBACKGROUND }}>
            <p style={pStyle}>{content}</p>
        </div>
    );
}
