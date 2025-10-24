"use client";

import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import { Home, BookOpen, Settings, Bell, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MiniSidebar = () => {
  const {
    isCollapsedDesktop,
    isOpenMobile,
    toggleDesktop,
    toggleMobile,
    handleSideBarButton,
  } = useMiniSidebar();

  const pathname = usePathname();
   
  const navItems = [
    { id: "Profile", label: "Profile", icon: Home, href: "/profile" },
    { id: "Account", label: "Account", icon: BookOpen, href: "/account" },
    { id: "Notification", label: "Notification", icon: Settings, href: "/notification" },
    { id: "Appearance", label: "Appearance", icon: Bell, href: "/appearance" },
    { id: "Language", label: "Language Video", icon: Video, href: "/language" },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow p-4 space-y-2 sticky top-8">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
       
           const isActive =  pathname.startsWith(`/${item.id.toLowerCase()}`);
          return (
            <Link key={item.id} href={item.href}>
              <button
                onClick={()=>handleSideBarButton(item as any)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
