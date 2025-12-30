import { api } from "../api"

interface VerificationPayload{
    email:string
    code:string
}
export const verifyCode =  async (payload:VerificationPayload)=>{
    const isVerified = await api.post("/auth/verify-code",payload)
    if(!isVerified) throw new Error("Unable to verify User")
        return isVerified
}