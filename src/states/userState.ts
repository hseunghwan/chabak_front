import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const userState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: { token: null }, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default userState;
