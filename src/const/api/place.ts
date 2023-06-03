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
        url: `/api/place/location/${loc}`,
    });
};

export const placeListByLocationTheme = async (loc: string, theme: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/${loc}/${theme}`,
    });
};

export const placeListBySearchKeyword = async (searchKeyword: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/search/${searchKeyword}`,
    });
};

export const placeListBySearchKeywordFilter = async (searchKeyword: string, theme: string, facils: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/search/filter/${searchKeyword}`,
        params: {
            themes: theme,
            facils: facils,
        },
    });
};

export const placeDetailById = async (place_id: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/detail/${place_id}`,
    });
};

export const placeBookmarkPost = async (place_id: string) => {
    return await apiClient({
        method: "post",
        url: `/api/bookmark/${place_id}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};

export const placeBookmarkDelete = async (place_id: string) => {
    return await apiClient({
        method: "delete",
        url: `/api/bookmark/${place_id}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};

export const placeBookmarkList = async () => {
    return await apiClient({
        method: "get",
        url: `/api/bookmark`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};
export const placeLike = async (place_id: string) => {
    return await apiClient({
        method: "patch",
        url: `/api/place/like/${place_id}}`,
        headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        },
    });
};
