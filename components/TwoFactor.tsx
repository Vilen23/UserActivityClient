"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "@/states/Atoms/userAtom";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";

export function TwoFactor() {
  const router = useRouter();
  const session = useSession();
  const [code, setCode] = useState<string>("");
  const setLogin = useSetRecoilState(loginAtom);
  
  const handleInput = async () => {
    try {
      const getKey = await axios.get(
        `${BACKEND_URL}/api/auth/getToken/?id=${session.data?.user.id}`
      );
      const verify = await axios.get(
        `${BACKEND_URL}/api/auth/verifyToken/?otp=${code}&key=${getKey.data.token.code}`
      );
      if (verify.status === 200) {
        setLogin(true);
        router.push("/");
      }
    } catch (error) {}
  };
  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>Two Factor Authentication</DialogTitle>
        <DialogDescription>
          <span className="flex flex-col gap-4 items-center justify-center">
            <span>Enter the code from your authenticator</span>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => {
                setCode(value);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="bg-black text-white hover:bg-black/80 hover:text-white"
              onClick={handleInput}
            >
              Submit
            </Button>
          </span>
        </DialogDescription>
      </DialogHeader>
    </Dialog>
  );
}
