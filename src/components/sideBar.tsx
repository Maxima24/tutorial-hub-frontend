"use client";
import React, { ReactNode, useContext } from "react";
import { cn } from "../lib/utils";
import { Home, BookOpen, Settings, MessageCircle, Bell, Menu, X, Play, Clock,Video, TrendingUp, Award, ChevronRight, Search, Filter, Star } from 'lucide-react';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";

// optional helper if you use clsx or classnames
interface SideBarContextType {
  expanded: boolean;
}

const SideBarContext = React.createContext<SideBarContextType | undefined>(undefined);

// ✅ 2️⃣ Sidebar Component
export default function SideBar({id}:{id:string}) {
 const router = useRouter()
   const [currentPage, setCurrentPage] = React.useState('');
  
 
  const [sidebarOpen, setSidebarOpen] =React.useState(true);
 const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'upload-tutorial', label: 'Upload Video', icon:Video }
  ];
  const handleClick = (id:string)=>{
     router.push(`/${id}`)
  }
  React.useEffect(()=>{
    setCurrentPage(id)
  },[id])
  return (
   <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-2xl transition-all duration-300 flex flex-col relative`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          {sidebarOpen && <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">LearnHub</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() =>handleClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-200 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">John Doe</div>
                <div className="text-xs text-gray-500">Instructor</div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}