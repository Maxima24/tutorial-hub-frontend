"use client"

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { verifyCode } from "@/service/authServices/verify-code";
import { useUserStore } from "@/store/auth-store";
import axios, { GenericHTMLFormElement } from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/service/api";
 
 const  ConfirmPasscode =()=>{
  const user = useUserStore((state)=>state.user)
  const router = useRouter()
  const [isMounted,setIsMounted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResending,setIsResending] = useState<boolean>(false)
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [code,setCode] = useState<string>()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  

    const handleChange = (value: string, index: number) => {
      if (/^[0-9]?$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < otp.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };
        useEffect(()=>{setIsMounted(true)},[])
      
    React.useEffect(()=>{
        console.log(otp)
        if(otp.length === 6){
          const code = String(otp.join(""))
          setCode(code)
        }
        console.log(otp.join(""))
    },[otp])
  if(!isMounted) return null
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
        setIsLoading(false)
      try{
          if(!user) throw new Error("User not found")
            if(!code) throw new Error("No code inputed")
              const updatedCode = code
      const {email} = user
         const isVerified = await verifyCode({code:updatedCode,email})
       if(!isVerified) throw new Error("Verification failed please try again later");
        router.push("/home")
       
      }catch(err){
  if (axios.isAxiosError(err)){
          console.log("Axios Error",err.message )
          console.log("Axios error response",err.response?.data)
          console.log("status",err.response?.status )
        }
        console.error("Verification error:", err);
        alert(err)
        router.push("/signin")
      }finally{
        setIsLoading(false)
       
      }
    

    }
    const handleResend = async ()=>{
      setIsResending(true)
        try{
            if(!user) console.error("User not Found")
                const {email} = user!
        const response  = await api.post("/auth/resend-code",{email});
        console.log(response)
        if(!response) console.error("User not found")
        }catch(err){
            if (axios.isAxiosError(err)){
          console.log("Axios Error",err.message )
          console.log("Axios error response",err.response?.data)
          console.log("status",err.response?.status )

        }
        console.error("Signup error:", err);
        alert(err)
        }
        



    


    }

    if(isMounted) return(
        <div className=" lg:px-2 px-6 pt-8 h-screen "> 
        <div className="h-full flex flex-col  justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
                <p className="text-gray-600 text-center"> We have sent a passcode to your email.{""} Please enter it below: </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between my-8">
                      {otp.map((digit, index) => {
                          return (
                            <React.Fragment key={index}>
                              <input
                              type="text"
                              ref={((el) => {(inputRefs.current[index] = el)})}
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleChange(e.target.value.trim(), index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              className={`w-12 h-12 not-first:ml-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm  text-blue-600 text-center text-xl focus:outline-none focus:ring-blue-500 ${otp[index] ? "border-blue-500": "border-gray-400"} `}
                              />
                            </React.Fragment>
                            )
                        })}
                    </div>

                     <button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      disabled={isLoading}
                     >
                      {isLoading ? (
                       <div className="flex items-center gap-2">
                         <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                           Verifying code...
                         </div>
                       ) : (
                       "Verify Code"
                      )}
                     </button> 

                </form> 
               <button onClick={()=>handleResend()}>
                           <div className="text-gray-400 bg-transparent  hover:cursor-pointer shadow-transparent hover:underline mt-2 hover:shadow-2xl hover:shadow-black">
                  resend code
                  </div>
               </button>
                   
                     
            </div>
        </div>
        </div>
    );
}
export default ConfirmPasscode