"use client"

import React from "react";
import { useState, useRef } from "react";

export default function ConfirmPasscode(){

    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
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
    
    return(
        <div className="lg:px-2 px-6 pt-8 h-screen"> 
        <div className=" flex flex-col h-screen justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
                <p className="text-gray-600 text-center"> We have sent a passcode to your email.{""} Please enter it below: </p>

                <form>
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
                     
            </div>
        </div>
        </div>
    )
}