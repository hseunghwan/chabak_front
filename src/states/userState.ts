import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserModel } from "src/const/consts";
const { persistAtom } = recoilPersist();
const userState = atom<UserModel | undefined>({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default userState;
