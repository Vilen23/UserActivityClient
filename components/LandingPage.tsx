"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Signin from "./Signin";
import { Button } from "./ui/button";
import axios from "axios";
import CheckTwoCode from "./CheckTwoCode";
import {TwoFactor} from "./TwoFactor";
import { useRecoilState } from "recoil";
import { loginAtom } from "@/states/userAtom";
export default function LandingPage() {
  const session = useSession();
  const [login,setLogin] = useRecoilState(loginAtom);

  const Add2Fa = async () => {
    if (!session.data?.user) return { error: "You are not logged in" };
    const response = await axios.post("http://localhost:8000/api/auth/2fa", {
      id: session.data.user.id,
    });
    if (response.status === 200) {
      console.log("2fa added");
    }
  };

  if (!session.data?.user) {
    return <Signin />;
  }

  if(session.data.user.Twofactor && !login){
    return <TwoFactor/>
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
      {session.data.user.Twofactor ? (
        <CheckTwoCode />
      ) : (
        <Button onClick={Add2Fa} variant="outline">
          Add 2Fa
        </Button>
      )}
    </div>
  );
}
