"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import { Button } from "./ui/button";
import axios from "axios";
import CheckTwoCode from "./CheckTwoCode";
import { TwoFactor } from "./TwoFactor";
import { useRecoilState } from "recoil";
import { loginAtom, twofactorAtom } from "@/states/Atoms/userAtom";
import { useRouter } from "next/navigation";
import useCheckDevice from "@/states/Hooks/checkDevice";
export default function LandingPage() {
  const session = useSession();
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginAtom);
  const [twofactor, setTwofactor] = useRecoilState(twofactorAtom);
  useCheckDevice();

  const Add2Fa = async () => {
    if (!session.data?.user) return { error: "You are not logged in" };
    const response = await axios.post("http://localhost:8000/api/auth/2fa", {
      id: session.data.user.id,
    });
    if (response.status === 200) {
      setTwofactor(true);
    }
  };

  if (!session.data?.user) {
    return <Signin />;
  }
  if (session.data.user.Twofactor && !login) {
    return <TwoFactor />;
  }
  console.log(session.data);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
        {session.data.user.Twofactor || twofactor ? (
          <CheckTwoCode />
        ) : (
          <Button onClick={Add2Fa} variant="outline">
            Add 2Fa
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => {
            router.push("/history");
          }}
        >
          Check History
        </Button>
      </div>
    </div>
  );
}
