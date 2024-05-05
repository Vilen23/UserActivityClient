"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CiMobile3 } from "react-icons/ci";
import { FaDesktop, FaSignOutAlt } from "react-icons/fa";

interface DeviceProps {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export default function page() {
  const session = useSession();
  const [devices, setDevices] = useState<DeviceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchDevices = async () => {
        const res = await axios.get(
          `http://localhost:8000/api/devices/getDevices/?id=${session.data?.user.id}`
        );
        console.log(devices);
        setDevices(res.data.Devices);
        setLoading(false);
      };
      const ws = new WebSocket("ws://localhost:8000");
      ws.onopen = () => {
        console.log("Websocket connected");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "device_added") {
          console.log("Device added");
          setDevices((prevDevices) => [...prevDevices, message.device]);
        }
      };
      ws.onclose = () => {
        console.log("Websocket closed");
      };
      fetchDevices();
      return () => {
        ws.close();
      };
    } catch (error) {
      console.log(error);
    }
  }, [session]);

  const handleSignout = (id: string) => async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/devices/removeDevice/?deviceId=${id}`
      );
      console.log(res.data);
      setDevices((prevDevices) =>
        prevDevices.filter((device) => device.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-[100vw] h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 place-items-center">
      {devices.map((device) => {
        return (
          <Card key={device.id}>
            <CardHeader>
              <CardTitle className="text-xl flex items-center border-b-2 justify-between border-black/30 pb-3 ">
                <div className="flex items-center gap-4">
                  {device.type === "desktop" && <FaDesktop />}
                  {device.type !== "desktop" && <CiMobile3 />}
                  {device.name}
                </div>
                <Button
                  className="flex gap-2 font-normal text-rose-500  hover:scale-110 transition-all duration-400 hover:text-rose-500 cursor-pointer items-center text-sm"
                  variant="outline"
                  onClick={handleSignout(device.id)}
                >
                  Sign Out
                  <FaSignOutAlt />
                </Button>
              </CardTitle>
              <CardDescription className="text-xs">
                You are currently signed into this device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <p className="capitalize font-bold">{device.type}</p>
                <p className="text-">
                  {new Date(device.createdAt).toLocaleDateString()}
                  {"  "}
                  {new Date(device.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
