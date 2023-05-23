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

//이메일 비밀번호 양식 정규식
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const checkEmailFormat = (email: string) => {
    return emailRegex.test(email);
};

export const checkPasswordFormat = (password: string) => {
    return passwordRegex.test(password);
};
