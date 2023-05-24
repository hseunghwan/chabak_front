import sample_0 from "src/resource/img/sample_0.jpg";
import sample_1 from "src/resource/img/sample_1.jpg";
import sample_2 from "src/resource/img/sample_2.jpg";
import sample_3 from "src/resource/img/sample_3.jpg";
import sample_4 from "src/resource/img/sample_4.jpg";
import theme_0 from "src/resource/img/homeTheme/theme_0.jpg";
import theme_1 from "src/resource/img/homeTheme/theme_1.jpg";
import theme_2 from "src/resource/img/homeTheme/theme_2.jpg";
import theme_3 from "src/resource/img/homeTheme/theme_3.jpg";
import theme_4 from "src/resource/img/homeTheme/theme_4.jpg";
import theme_5 from "src/resource/img/homeTheme/theme_5.jpg";
import theme_6 from "src/resource/img/homeTheme/theme_6.jpg";
import theme_7 from "src/resource/img/homeTheme/theme_7.jpg";

export const BACKEND_URL = "http://3.34.98.222:8080";

export type UserModel = {
    user_id: number;
    name: string;
    email: string;
    mycar: null | string;
    phone_number: null | string;
    eco_lv: number;
    nickname: string;
};

export type PlaceModel = {
    place_id: string;
    place_name: null | string;
    address: null | string;
    contact: null | string;
    camp_env: null | string;
    season: null | string;
    operation_day: null | string;
    page_url: null | string;
    reservation: null | string;
    facils: null | string;
    theme: null | string;
    place_like: number;
};

export const sampleImages = [sample_0, sample_1, sample_2, sample_3, sample_4];
export const themeImages = [theme_0, theme_1, theme_2, theme_3, theme_4, theme_5, theme_6, theme_7];

//이메일 비밀번호 양식 정규식
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const checkEmailFormat = (email: string) => {
    return emailRegex.test(email);
};

export const checkPasswordFormat = (password: string) => {
    return passwordRegex.test(password);
};
