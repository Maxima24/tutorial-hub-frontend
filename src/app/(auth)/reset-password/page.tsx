"use client"
import { Eye, EyeOff, Lock } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react";


function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <p className="text-gray-600">Enter a new password</p>
          </div>

          {/* Sign Up Form */}
          <form  className="space-y-6 mb-8" autoComplete="off">
            <div className="space-y-4">
            <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="h-12 pl-12 pr-12 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="new-password"
                  required
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

              <div className="relative group ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="h-12 pl-12 pr-12 rounded-xl outline-none border-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-white/50 backdrop-blur-sm w-full"
                  autoComplete="new-password"
                  required
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

            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                     Resetting Password...
                </div>
              ) : (
                "Reset Password"
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
