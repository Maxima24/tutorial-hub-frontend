"use client";

import { useSidebar } from "@/contexts/sideBarContext";
import {
  Home,
  BookOpen,
  Settings,
  MessageCircle,
  Bell,
  Menu,
  X,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useGetUser} from "@/service/mutations/auth"

export const Sidebar = () => {
  const {
    isCollapsedDesktop,
    isOpenMobile,
    toggleDesktop,
    toggleMobile,
    handleSidebarButton,
  } = useSidebar();

  const isSidebarOpen = isOpenMobile || !isCollapsedDesktop;
  const pathname = usePathname();
  const {mutateAsync:userData,isPending} = useGetUser()

  const navItems = [
    { id: "Home", label: "Home", icon: Home, path: "/home" },
    { id: "Tutorials", label: "Tutorials", icon: BookOpen, path: "/tutorials" },
    { id: "Settings", label: "Settings", icon: Settings, path: "/settings" },
    {
      id: "Message",
      label: "Messages",
      icon: MessageCircle,
      path: "/messages",
    },
    {
      id: "Notifications",
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      id: "Upload-tutorial",
      label: "Upload Video",
      icon: Video,
      path: "/upload-tutorial",
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      }  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow transition-all mt-2 mb-20 duration-300  lg:flex flex-col fixed  h-[96vh] hidden z-[1100] rounded-lg`}
    >
      {/* Header Section */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        {isSidebarOpen && (
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            LearnHub
          </div>
        )}
        <button
          onClick={toggleDesktop}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(`/${item.id.toLowerCase()}`);

          return (
            <Link href={item.path} key={item.id} className="mb-2">
              <button
                onClick={() => handleSidebarButton(item.id as any)}
                className={`w-full flex items-center gap-7 px-4 py-3 mb-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 py-2"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 py-2"
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Admin Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">
                John Doe
              </div>
              <div className="text-xs text-gray-500">Instructor</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
