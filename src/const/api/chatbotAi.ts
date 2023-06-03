//import { apiClient } from "./apiClient";
import axios from "axios";

export const postChatMessage = async (data: string) => {
    return await axios({
        method: "post",
        url: `http://15.165.95.222:5000/api/chatbot`,
        data: { prompt: data },
    });
};
