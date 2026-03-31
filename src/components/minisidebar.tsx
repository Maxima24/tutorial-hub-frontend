"use client";

import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import { Home, BookOpen, Settings, Bell, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
};

const defaultNavItems: SidebarItem[] = [
  { id: "Profile", label: "Profile", icon: Home, href: "/profile" },
  { id: "Account", label: "Account", icon: BookOpen, href: "/account" },
  { id: "Notification", label: "Notification", icon: Settings, href: "/notification" },
  { id: "Appearance", label: "Appearance", icon: Bell, href: "/appearance" },
  { id: "Language", label: "Language Video", icon: Video, href: "/language" },
];

type MiniSidebarProps = {
  /** When provided, the sidebar works in state-driven mode (no routing) */
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Override the nav items entirely */
  items?: SidebarItem[];
};

export const MiniSidebar = ({ activeId, onSelect, items }: MiniSidebarProps) => {
  const { handleSideBarButton } = useMiniSidebar();
  const pathname = usePathname();

  const navItems = items ?? defaultNavItems;

  // State-driven mode: activeId + onSelect are both provided
  const isStateDriven = activeId !== undefined && onSelect !== undefined;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = isStateDriven
            ? activeId === item.id
            : pathname.startsWith(`/${item.id.toLowerCase()}`);

          const handleClick = () => {
            if (isStateDriven) {
              onSelect(item.id);
            } else {
              handleSideBarButton(item as any);
            }
          };

          // In state-driven mode, render a plain button (no Link wrapper)
          if (isStateDriven) {
            return (
              <button
                key={item.id}
                onClick={handleClick}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          }

          // Default route-driven mode
          return (
            <Link key={item.id} href={item.href}>
              <button
                onClick={handleClick}
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