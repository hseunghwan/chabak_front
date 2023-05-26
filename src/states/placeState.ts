import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

const { persistAtom } = recoilPersist();
const placeState = atom<PlaceModel | undefined>({
    key: "placeState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default placeState;
