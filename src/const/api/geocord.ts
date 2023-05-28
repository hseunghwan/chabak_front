import axios from "axios";
const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID as string;
const NAVER_MAPS_CLIENT_SECRET = process.env.REACT_APP_NAVER_MAPS_CLIENT_SECRET as string;

export const getCoordinates = async (fullAddress: string) => {
    return await axios.get("/map-geocode/v2/geocode", {
        params: {
            query: fullAddress,
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": NAVER_MAPS_CLIENT_ID, // 애플리케이션 등록 시 발급받은 client id값을 넣으세요
            "X-NCP-APIGW-API-KEY": NAVER_MAPS_CLIENT_SECRET, // 애플리케이션 등록 시 발급받은 client secret값을 넣으세요
        },
    });
};
