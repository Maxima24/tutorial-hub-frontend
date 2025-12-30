import { api } from "../api"

export const signUp = async (payload:Record<any,any>)=>{
    const response:Record<string,any>  = await api.post("/auth/register",payload)
    if(!response) console.log("user could not be created")
     const {user,token} =response.data.user   
    console.log(user)
    localStorage.setItem("token",token)
    return {user,token}
}