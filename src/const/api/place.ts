import { apiClient } from "src/const/api/apiClient";

export const placeListRecommend = async () => {
    return await apiClient({
        method: "get",
        url: `/api/place/recommend`,
    });
};

export const placeListByTheme = async (theme: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/theme/${theme}`,
    });
};

export const placeListByLocation = async (loc: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/theme/${loc}`,
    });
};

export const placeDetailById = async (place_id: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/detail/${place_id}`,
    });
};
