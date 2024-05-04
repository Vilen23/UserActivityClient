import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const userAtom = atom({
    key: "user",
    default: {
        name: "",
        email: "",
        password: "",
    },
    effects_UNSTABLE: [persistAtom],
})
export const loginAtom = atom({
    key: "login",
    default: false,
})