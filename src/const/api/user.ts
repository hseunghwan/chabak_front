import { apiClient } from "src/const/api/apiClient";

type UserLoginModel = {
    email: string;
    password: string;
};
type UserSignupModel = {
    name: string;
    email: string;
    password: string;
    mycar?: string;
    phone_number?: string;
    nickname: string;
};
export type ChangeUserStateModel = {
    name: string;
    password: string;
    mycar?: string;
    phone_number?: string;
    nickname: string;
};

export const userLogin = async (data: UserLoginModel) => {
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

export const userSigup = async (data: UserSignupModel) => {
    return await apiClient({
        method: "post",
        url: `/api/user/join`,
        data: data,
    });
};

export const changeUserState = async (email: string, token: string | null, data: ChangeUserStateModel) => {
    return await apiClient({
        method: "petch",
        url: `/api/user/profile/${email}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
    });
};
