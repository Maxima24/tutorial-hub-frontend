"use client"
import {  ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

function Page() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        < div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

       <div className="w-full lg:w-2/5 xl:w-2/3 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full md:max-w-[410px] max-w-[400px] mx-auto">
            <Link href="/logIn">
               <div className="flex gap-2 mb-6 cursor-pointer"><ArrowLeft/> Back </div>
            </Link>
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to retrieve your account.</p>
          </div>

          {/* Sign Up Form */}
          <form  className="space-y-6 mb-8" autoComplete="off">
            <div className="space-y-4">
                
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="h-12 pl-12 pr-4 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="off"
                  required
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>

            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending reset link...
                </div>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link href="/logIn" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Login
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

export default Page
