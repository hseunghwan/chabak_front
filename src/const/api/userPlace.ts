import { apiClient } from "src/const/api/apiClient";
export type UserPlaceRegisterModel = {
    address: string;
    userPlaceName: string;
    descript: string;
    tags: string;
    latitude: string;
    longitude: string;
};
// export type UserPlaceModel = {
//     userPlaceId: number;
//     user_id: number;
//     address: string;
//     userPlaceName: string;
//     descript: string;
//     tags: string;
//     latitude: string;
//     longitude: string;
//     userplace_like: number;
//     report: number;
// };

export type UserPlaceModelWithEmail = {
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
    userEmail: string | null;
};
//사용자 장소 등록
export const userPlaceRegister = async (data: UserPlaceRegisterModel, userId: number) => {
    return await apiClient({
        method: "post",
        url: `/api/register/address/${userId}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
        data: data,
    });
};

export const getAllUserPlace = async () => {
    return await apiClient({
        method: "get",
        url: `/api/userplace`,
    });
};

export const getUserPlaceById = async (userId: number) => {
    return await apiClient({
        method: "get",
        url: `/api/user/place/${userId}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};

export const getUserPlaceByPlaceId = async (placeId: number) => {
    return await apiClient({
        method: "get",
        url: `/api/userplace/${placeId}`,
        // headers: {
        //     Authorization: `${localStorage.getItem("jwtToken")}`,
        // },
    });
};

export const changeUserPlaceByPlaceId = async (placeId: number, data: { userPlaceName: string; descript: string; tags: string }) => {
    return await apiClient({
        method: "patch",
        url: `/api/user/edit/${placeId}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
        data: data,
    });
};

export const deleteUserPlaceByPlaceId = async (placeId: number) => {
    return await apiClient({
        method: "delete",
        url: `/api/user/place/${placeId}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};
