"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Signin from "./Signin";
import { Button } from "./ui/button";
import { Add2Fa } from "@/lib/Add2Fa";
export default function LandingPage() {
  const session = useSession();
  if (!session.data?.user) {
    return <Signin />;
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
      <Button onClick={Add2Fa} variant="outline">Add 2Fa</Button>
    </div>
  );
}
