"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProps } from "@/lib/models";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AlertError } from "./AlertError";
export default function Signin() {
  const [userInfo, setUserInfo] = useState<UserProps>({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleSignin = async () => {
    if (!userInfo.email || !userInfo.password || !userInfo.name) {
      console.log("hello");
      setError("Please fill all the fields");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: "/",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <button className="bg-black border-2 border-black hover:text-black transition-all duration-300 hover:bg-white px-3 py-2 text-white rounded-3xl cursor-pointer">
            Sign In
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription className="text-[12px] md:text-[14px] ">
            {error ? (
              <AlertError error={error} />
            ) : (
              "Put your credentials to sign in"
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onClick={() => setError("")}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 justify-">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              onClick={() => setError("")}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              id="email"
              className="col-span-3"
              type="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              onClick={() => setError("")}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              id="password"
              className="col-span-3"
              type="password"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-center w-full items-center">
          <Button
            onClick={handleSignin}
            type="submit"
            variant="outline"
            className="w-fit font-semibold uppercase hover:bg-black hover:text-white transition-all duration-400"
          >
            Sign in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
