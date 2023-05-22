import { apiClient } from "src/const/api/apiClient";

export const userLogin = async (data: { email: string; password: string }) => {
    return await apiClient({
        method: "post",
        url: `/api/user/login`,
        data: data,
    });
};

export const userLogout = async (token: string | null) => {
    return await apiClient({
        method: "post",
        url: `/api/user/logout`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
