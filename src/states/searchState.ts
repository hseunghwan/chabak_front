import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type SearchStateModel = {
    location: string;
    theme: null | string;
    facils: null | string;
    searchKeyword: null | string;
};

const { persistAtom } = recoilPersist();
const searchState = atom<SearchStateModel>({
    key: "searchState", // unique ID (with respect to other atoms/selectors)
    default: { location: "전국", theme: null, facils: null, searchKeyword: null }, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default searchState;
