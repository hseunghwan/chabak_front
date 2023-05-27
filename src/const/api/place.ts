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
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

export const placeListByLocation = async (loc: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/location/${loc}`,
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

export const placeListByLocationTheme = async (loc: string, theme: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/${loc}/${theme}`,
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

export const placeListBySearchKeyword = async (searchKeyword: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/search/${searchKeyword}`,
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

//사용 불가능
export const placeListBySearchKeywordFilter = async (searchKeyword: string, theme: string, facils: string) => {
    return await apiClient({
        method: "get",
        url: `/api/place/search/filter/${searchKeyword}`,
        params: {
            theme: theme,
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
