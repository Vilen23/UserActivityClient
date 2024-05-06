"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Copy } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/config";

export default function CheckTwoCode() {
  const session = useSession();
  const [token,setToken] = useState("");
  
  useEffect(()=>{
    const getToken = async()=>{
      const res = await axios.get(`${BACKEND_URL}/api/auth/getToken/?id=${session.data?.user.id}`);
      setToken(res.data.token.code);
    }       
    getToken();                              
  },[])

  const copyToClipboard = () => {
    const input = document.getElementById('link') as HTMLInputElement;
    if (input && input.value) { 
      navigator.clipboard.writeText(input.value)
        .then(() => {
          console.log('Content copied to clipboard successfully!');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };
  

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-black text-white hover:bg-white hover:text-black border-2 hover:border-2 border-black transition-all duration-300">Get Code</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keep this secret</DialogTitle>
          <DialogDescription>
            Copy this code into google authenticator app
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={token}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Copy  className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent> 
      </Dialog>
    </div>
  );
}
