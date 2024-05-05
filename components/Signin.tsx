"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserProps } from "@/lib/models"
import { signIn } from "next-auth/react"
import {useRouter} from 'next/navigation'
import { useState } from "react"
export default function Signin() {
    const [userInfo,setUserInfo] = useState<UserProps>({
        name:'',
        password:'',
        email:''
    
    })

    const handleSignin = async() => {
        const res = await signIn("credentials",{
            redirect:false,
            name:userInfo.name,
            email:userInfo.email,
            password:userInfo.password,
            callbackUrl:"/"
        })
        
    }
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button  className='bg-black border-2 border-black hover:text-black transition-all duration-300 hover:bg-white px-3 py-2 text-white rounded-3xl cursor-pointer'>Sign In</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Put your credentials to sign in
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              id="password"
              className="col-span-3"
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSignin} type="submit">Signin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
