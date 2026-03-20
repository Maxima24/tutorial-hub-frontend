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
import { useGetUser } from "@/service/mutations/auth";

export const Sidebar = () => {
  const {
    isCollapsedDesktop,
    isOpenMobile,
    toggleDesktop,
    toggleMobile,
    handleSidebarButton,
  } = useSidebar();

  const isDesktopOpen = !isCollapsedDesktop;
  const pathname = usePathname();
  const { mutateAsync: userData, isPending } = useGetUser();

  const navItems = [
    { id: "Home", label: "Home", icon: Home, path: "/home" },
    { id: "Tutorials", label: "Tutorials", icon: BookOpen, path: "/tutorials" },
    { id: "Settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "Message", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "Notifications", label: "Notifications", icon: Bell, path: "/notifications" },
    { id: "Upload-tutorial", label: "Upload Video", icon: Video, path: "/upload-tutorial" },
  ];

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <nav className="flex-1 p-4 space-y-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(`/${item.id.toLowerCase()}`);
        return (
          <Link href={item.path} key={item.id} className="mb-2" onClick={onLinkClick}>
            <button
              onClick={() => handleSidebarButton(item.id as any)}
              className={`w-full flex items-center gap-7 px-4 py-3 mb-4 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = () => (
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          JD
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm truncate">John Doe</div>
          <div className="text-xs text-gray-500">Instructor</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile hamburger button ── */}
      <button
        onClick={toggleMobile}
        className={`${isOpenMobile?"hidden":""} lg:hidden fixed top-4 left-4 z-1200 p-2 bg-white rounded-lg shadow-md border border-gray-100 text-gray-700 hover:bg-gray-50 transition-colors`}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* ── Mobile backdrop ── */}
      {isOpenMobile && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-[1099] backdrop-blur-sm"
          onClick={toggleMobile}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl z-[1100] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            LearnHub
          </div>
          <button
            onClick={toggleMobile}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <NavLinks onLinkClick={toggleMobile} />
        <UserFooter />
      </div>

      {/* ── Desktop sidebar (unchanged behaviour) ── */}
      <div
        className={`${
          isDesktopOpen ? "w-64" : "w-20"
        } bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow transition-all mt-2 mb-20 duration-300 lg:flex flex-col fixed h-[96vh] hidden z-[1100] rounded-lg`}
      >
        {/* Desktop header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          {isDesktopOpen && (
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              LearnHub
            </div>
          )}
          <button
            onClick={toggleDesktop}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isDesktopOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop nav — collapsed icons only when sidebar is narrow */}
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
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  {isDesktopOpen && (
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

        <UserFooter />
      </div>
    </>
  );
};