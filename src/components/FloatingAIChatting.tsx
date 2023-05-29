import { Box, SxProps, Theme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ChattingInput from "src/components/Chatting/ChattingInput";
import AITalkBox from "src/components/Chatting/AITalkBox";
import UserTalkBox from "src/components/Chatting/UserTalkBox";
import colors from "src/const/colors";
import { postChatMessage } from "src/const/api/chatbotAi";
import { useSetRecoilState } from "recoil";
import placeState from "src/states/placeState";
import { useNavigate } from "react-router-dom";

type ChatMessage = {
    sender: "AI" | "User";
    content: string;
};
const FloatingAIChatting: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const setPlaceList = useSetRecoilState(placeState);
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            sender: "AI",
            content:
                "안녕하세요! 차박 정보 도우미 챗봇입니다! 🚐 🏕️ 차박 여행, 준비물, 캠핑장 추천, 안전 팁 등 다양한 차박 관련 정보를 도와드릴 수 있어요. 궁금한 사항이 있으시면 언제든지 질문해주세요! 😊",
        },
        // { sender: "User", content: "Hi there!" },
        // ... 추가적인 초기 메시지들
    ]);
    const addNewMessage = (messageContent: string) => {
        const newUserMessage: ChatMessage = { sender: "User", content: messageContent };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);

        postChatMessage(newUserMessage.content)
            .then((response) => {
                setMessages((prevMessages) => [...prevMessages, { sender: "AI", content: response.data.response }]); // 챗봇 응답 추가
                if (response.data.place_list) setPlaceList(response.data.place_list);
                navigate("/placesearchresult/true");
            })
            .catch((error) => {
                console.log("postChatMessage err");
                console.error(error);
            });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);
    return (
        <Box sx={{ ...sx, backgroundColor: colors.FORMBACKGROUND }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "#74D689" }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {messages.map((message, i) =>
                        message.sender === "AI" ? <AITalkBox key={i} content={message.content} /> : <UserTalkBox key={i} content={message.content} />
                    )}
                    <div ref={messagesEndRef} />
                </Box>
                <ChattingInput onSendMessage={addNewMessage} />
            </div>
        </Box>
    );
};
export default FloatingAIChatting;