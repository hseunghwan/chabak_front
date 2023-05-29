import { apiClient } from "src/const/api/apiClient";
export type UserPlaceRegisterModel = {
    fullAddress: string;
    userPlaceName: string;
    descript: string;
    tags: string;
    latitude: string;
    longitude: string;
};

//사용자 장소 등록
export const userPlaceRegister = async (data: UserPlaceRegisterModel) => {
    return await apiClient({
        method: "post",
        url: `/api/register/address`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
        },
        data: data,
    });
};
