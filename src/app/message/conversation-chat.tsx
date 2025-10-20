"use client"
import { useSidebar } from "@/contexts/sideBarContext";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";


function Conversationchat() {

    const {isCollapsedDesktop} = useSidebar();

    return (
        <div className={` flex  flex-col justify-center overflow-auto  sm:rounded-md shadow    ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
                {/* Chat Header */}
            <div className="flex-1 overflow-auto bg-white">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link href={"/message"}>
                    <div className='cursor-pointer'>
                      <ArrowLeft className='w-6 h-6 '/>
                    </div>
                    </Link>
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      SJ
                    </div>
                    <div>
                      <div className="font-semibold  text-gray-900">Sarah Johnson</div>
                      <div className="text-xs text-green-500 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Online
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className=" overflow-y-auto max-h-[400px] scrollbar-hide  p-6 space-y-6 text-sm">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 md:max-w-xs max-w-[220px] ">
                      <p className="text-gray-900">Hi! I just finished the React Hooks tutorial. It was amazing!</p>
                      <div className="text-xs text-gray-500 mt-1">10:30 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl rounded-tr-none px-4 py-3 md:max-w-xs max-w-[220px]">
                      <p className="text-white">That's great to hear! Do you have any questions?</p>
                      <div className="text-xs text-blue-100 mt-1">10:32 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 md:max-w-xs max-w-[220px]">
                      <p className="text-gray-900">Yes! Can you explain useEffect dependencies in more detail?</p>
                      <div className="text-xs text-gray-500 mt-1">10:35 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl rounded-tr-none px-4 py-3 md:max-w-xs max-w-[220px]">
                      <p className="text-white">Of course! The dependency array controls when the effect runs...</p>
                      <div className="text-xs text-blue-100 mt-1">10:37 AM</div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100   ">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 lg:focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <button className=" text-gray-500 font-medium cursor-pointer transition-all ">
                      <Send/>
                    </button>
                  </div>
                </div>
            </div>
        </div>
  );
    
}

export default Conversationchat
