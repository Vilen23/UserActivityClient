import { atom } from "recoil";

interface DeviceProps {
    id: string;
    name: string;
    type: string;
    createdAt: string;
  }

export const deviceAtom = atom({
    key:"deviceAtom",
    default:[] as DeviceProps[]
})