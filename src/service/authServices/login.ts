import { api } from "../api"
import { User } from '@/interfaces/authInterface';

export const login =async(payload:Record<string,string>)=>{
    const response  = await api.post("/auth/login",payload)
    if(!response) throw new Error("Login attempt failed")
    const {safeUser,token} = response.data
    return {safeUser,token}
}