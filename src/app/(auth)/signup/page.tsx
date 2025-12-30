"use client"
import { FormErrors, NameObject } from "@/interfaces/authInterface";
import validateSignup from "@/lib/config/validate-signup";
import { signUp } from "@/service/authServices/signup";
import { useUserStore } from "@/store/auth-store";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { useState } from "react";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

function Page() {
  const router = useRouter()
  const[isMounted,setIsMounted] = React.useState<boolean |null>(null)
  
    const [isLoading, setIsLoading] = useState(false);
    const [pwdCheckerObj,setPwdChecker] = React.useState<Record<string,string>>({
      password:"",
      confirmPassword:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [nameObject,setNameObject] = useState<NameObject>({
      firstName:"",
      lastName:""
    })
    const [payload, setPayload] = useState({
     name:"",
      email: "",
      password: "",
      
    });
    useEffect(()=>{setIsMounted(true)},[])

    function handleOnChange(e: InputChangeEvent) {
      const { name, value } = e.target;
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    function handlePwdChange(e:InputChangeEvent){
      const {name,value}  = e.target
      setPwdChecker((prev)=>({
        ...prev,[name]:value
      }))
    }
    function pwdConfirm(p1:string,p2:string){
      if(p1 !== p2){
        console.log("Password must be the same")
      }else return p1
    }
    function handleNameChange(e:InputChangeEvent){
        const {name,value} = e.target
        setNameObject((prev)=>({
          ...prev,
          [name]:value
        }))
    }
    function mergeName(firstName:string,lastName:string){
      const name = firstName + " " + lastName
      return name
    }
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        const {firstName,lastName} = nameObject
        const {password,confirmPassword} = pwdCheckerObj
        const name  = mergeName(firstName,lastName)
        const confirmedPwd = pwdConfirm(password,confirmPassword)
        if(!confirmedPwd) throw new Error("password mismatch")
        setPayload((prev)=>({
            ...prev,
            name,
            password:confirmedPwd
        }))
        const newPayload = {
          ...payload,
          name,
          password:confirmedPwd
        }
        console.log(payload)
        const validationErrors = validateSignup(newPayload,nameObject)  
         setErrors(validationErrors);
     
  
        if (Object.keys(validationErrors).length === 0) {
          console.log(" Form submitted:", payload);
  
        }

         const {user,token:access_token} = await signUp(newPayload)
         console.log("sign up response", {user,access_token})
         useUserStore.getState().setUser(user, access_token);
                alert(" 😊Sign up Successful")
         router.push('/verify-email')
      } catch (err) {
        if (axios.isAxiosError(err)){
          console.log("Axios Error",err.message )
          console.log("Axios error response",err.response?.data)
          console.log("status",err.response?.status )

        }
        console.error("Signup error:", err);
     
      } finally {
        setIsLoading(false);
      }
    };
      useEffect(()=>{
      console.log(pwdCheckerObj)
      const {password,confirmPassword} = pwdCheckerObj
      const CON = pwdConfirm(password,confirmPassword)
      console.log(CON)
    },[pwdCheckerObj])
  
    if(isMounted){
      
         return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

       <div className="w-full lg:w-2/5 xl:w-2/3 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full md:max-w-[460px] max-w-[400px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8" autoComplete="off">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                <div className="group ">
                  <div className="relative ">
                  <input
                    type="text"
                    name="firstName"
                    value={nameObject.firstName}
                    onChange={handleNameChange}
                    placeholder="First name"
                    className="h-12 pl-12 pr-4 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm md:w-[220px] w-full"
                    maxLength={30}
                    autoComplete="off"
                    
                  />
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p> }
                </div>
                
                <div >
                  <div className="relative group">
                  <input
                    type="text"
                    name="lastName"
                    value={nameObject.lastName}
                    onChange={handleNameChange}
                    placeholder="Last name"
                    className="h-12 pl-12 pr-4 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm md:w-[220px] w-full"
                    maxLength={30}
                    autoComplete="off"
                    
                  />
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p> }
                </div>

              </div>
                
              <div >
                <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  className="h-12 pl-12 pr-4 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="off"
                  
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p> }
              </div>

              <div >
                <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={pwdCheckerObj.password}
                  onChange={handlePwdChange}
                  placeholder="Create a password"
                  className="h-12 pl-12 pr-12 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="new-password"
                />
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p> }
              </div>

              <div >
                <div className="relative group ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={pwdCheckerObj.confirmPassword}
                  onChange={handlePwdChange}
                  placeholder="Confirm your password"
                  className="h-12 pl-12 pr-12 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="new-password"
                />
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p> }
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm">
              <input 
              type="checkbox" 
              className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-primary" />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/logIn" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
       </div>
       <div className="hidden lg:block lg:w-3/5 xl:w-3/5 p-4 pr-6">
            <div 
            className="h-full w-full rounded-2xl bg-cover bg-center bg-no-repeat relative overflow-hidden "
            style={{
             backgroundImage: 'url("/assets/student.jpg")'
             }}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-transparent to-purple-100/30" />
            </div>
       </div>
      
    </div>
    )
    }
   
}

export default Page

