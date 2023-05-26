import sample_0 from "src/resource/img/sample_0.jpg";
import sample_1 from "src/resource/img/sample_1.jpg";
import sample_2 from "src/resource/img/sample_2.jpg";
import sample_3 from "src/resource/img/sample_3.jpg";
import sample_4 from "src/resource/img/sample_4.jpg";
import star from "src/resource/img/homeTheme/star.jpg";
import beach from "src/resource/img/homeTheme/beach.jpg";
import family from "src/resource/img/homeTheme/family.jpg";
import pets from "src/resource/img/homeTheme/pets.jpg";
import couple from "src/resource/img/homeTheme/couple.jpg";
import healing from "src/resource/img/homeTheme/healing.jpg";

export const BACKEND_URL = "http://3.34.98.222:8080";

export const sampleImages = [sample_0, sample_1, sample_2, sample_3, sample_4];
export const themeImages = [
    { theme: "star", title: "별", img: star },
    { theme: "beach", title: "바다", img: beach },
    { theme: "family", title: "가족", img: family },
    { theme: "pets", title: "반려동물", img: pets },
    { theme: "couple", title: "커플", img: couple },
    { theme: "healing", title: "힐링", img: healing },
];

export const gpe: { key: string; value: string }[] = [
    { key: "전국", value: "전국" },
    { key: "서울", value: "서울" },
    { key: "경기", value: "경기" },
    { key: "인천", value: "인천" },
    { key: "강원", value: "강원" },
    { key: "충북", value: "충청북도" },
    { key: "충남", value: "충청남도" },
    { key: "세종", value: "세종" },
    { key: "대전", value: "대전" },
    { key: "경북", value: "경상북도" },
    { key: "경남", value: "경상남도" },
    { key: "대구", value: "대구" },
    { key: "전북", value: "전라북도" },
    { key: "전남", value: "전라남도" },
    { key: "광주", value: "광주" },
    { key: "울산", value: "울산" },
    { key: "부산", value: "부산" },
    { key: "제주", value: "제주" },
];

//이메일 비밀번호 양식 정규식
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const checkEmailFormat = (email: string) => {
    return emailRegex.test(email);
};

export const checkPasswordFormat = (password: string) => {
    return passwordRegex.test(password);
};
