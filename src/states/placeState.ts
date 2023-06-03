import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type PlaceModel = {
    place_id: string;
    place_name: string;
    address: null | string;
    contact: null | string;
    camp_env: null;
    season: null | string;
    operation_day: null | string;
    page_url: null | string;
    reservation: null | string;
    facils: null | string;
    theme: string;
    place_like: number;
    images: string[];
    latitude: null | string;
    longitude: null | string;
    amenities: null | string;
};

const { persistAtom } = recoilPersist();
const placeState = atom<PlaceModel[]>({
    key: "placeState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export const placeDetailState = atom<PlaceModel | undefined>({
    key: "placeDetailState",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

export default placeState;
