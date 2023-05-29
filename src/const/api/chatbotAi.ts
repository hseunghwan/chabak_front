//import { apiClient } from "./apiClient";
import axios from "axios";

export const postChatMessage = async (data: string) => {
    return await axios({
        method: "post",
        url: `/api/chatbot`,
        data: { prompt: data },
    });
};
