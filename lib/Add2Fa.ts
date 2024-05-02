import axios from "axios"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./auth";
import db from "./db";

export const Add2Fa = async()=>{
    const session  = await getServerSession(NEXT_AUTH);
    if(!session){return {error:"You are not logged in"}};
    const response = await axios.post('http://localhost:8000/api/auth/2fa');
    const secretkey = response.data;
    const user = db.user.findFirst({
        where:{
            email:session.user.email
        }
    })
    if(!user){return {error:"User not found"}};
    const updateTwofactor = db.twofactor.create({
        data:{
            code:secretkey,
            user:{
                connect:{
                    email:session.user.email
                }
            }
        }
    })
}