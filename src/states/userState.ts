import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type UserModel = {
    user_id: number;
    name: string;
    email: string;
    mycar: null | string;
    phone_number: null | string;
    eco_lv: number;
    nickname: string;
};

const { persistAtom } = recoilPersist();
const userState = atom<UserModel | undefined>({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default userState;
