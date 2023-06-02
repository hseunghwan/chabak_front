import { apiClient } from "src/const/api/apiClient";
export type UserPlaceRegisterModel = {
    address: string;
    userPlaceName: string;
    descript: string;
    tags: string;
    latitude: string;
    longitude: string;
};
export type UserPlaceModel = {
    userPlaceId: number;
    user_id: number;
    address: string;
    userPlaceName: string;
    descript: string;
    tags: string;
    latitude: string;
    longitude: string;
    userplace_like: number;
    report: number;
};
//사용자 장소 등록
export const userPlaceRegister = async (data: UserPlaceRegisterModel, userId: number) => {
    return await apiClient({
        method: "post",
        url: `/api/register/address/${userId}`,
        // headers: {
        //     Authorization: `${localStorage.getItem("jwtToken")}`,
        // },
        data: data,
    });
};

export const getUserPlaceById = async (userId: number) => {
    return await apiClient({
        method: "get",
        url: `/api/user/place/${userId}`,
        // headers: {
        //     Authorization: `${localStorage.getItem("jwtToken")}`,
        // },
    });
};
