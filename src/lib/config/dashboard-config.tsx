// Dashboard page configuration
import {
    Home,
    BookOpen,
    Settings,
    MessageCircle,
    Bell,
    Video,
    LucideIcon,
  } from "lucide-react";
  
  export interface PageConfig {
    title: string;
    icon?: LucideIcon;
    parent?: string;
  }
  
  export const dashboardPageConfig: Record<string, PageConfig> = {
    "/home": {
      title: "Home",
      icon: Home,
    },
    "/tutorials": {
      title: "Tutorials",
      icon: BookOpen,
    },
    "/notifications": {
      title: "Notification",
      icon: Bell,
    },
    "/settings": {
      title: "Settings",
      icon: Settings,
    },
    "/message": {
      title: "Messages",
      icon: MessageCircle,
    },
    "/upload-tutorial": {
      title: "Upload Videos",
      icon: Video,
    },
  };
  
  // ✅ Helper function to get page config safely
  export function getPageConfig(pathname: string): PageConfig {
    
    if (dashboardPageConfig[pathname]) return dashboardPageConfig[pathname];
  
    if (pathname.startsWith("/tutorials/")) {
      const slug = pathname.split("/")[2]?.replace(/-/g, " "); // e.g. /tutorials/get-books → "get books"
      const formattedTitle = slug
        ? slug.charAt(0).toUpperCase() + slug.slice(1)
        : "Tutorial Details";
  
      return {
        title: formattedTitle,
        parent: "/tutorials",
        icon: BookOpen,
      };
    }
  
    return {
      title: "Dashboard",
      icon: Home,
    };
  }
  