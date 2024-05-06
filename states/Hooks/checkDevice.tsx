"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceAtom } from "../Atoms/deviceAtoms";

const useCheckDevice = () => {
    const session = useSession();
    const [devices, setDevices] = useRecoilState(deviceAtom);
    useEffect(() => {
        try {
            const ws = new WebSocket("wss://uabackend.onrender.com");
            ws.onopen = () => {
                console.log("WebSocket connection established");
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (
                    message.type === "device_removed" &&
                    session.data?.user.deviceId === message.deviceId
                ) {
                    console.log("Device removed");
                    signOut({
                        redirect: true,
                        callbackUrl: "/",
                    });
                } else if (message.type === "device_removed") {
                    console.log("Other Device got removed");
                    setDevices((prevDevices) =>
                        prevDevices.filter((device) => device.id !== message.deviceId)
                    );
                }
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };

            return () => {
                ws.close();
            };
        } catch (error) {
            console.log(error);
        }
    }, [session]);
};

export default useCheckDevice;
