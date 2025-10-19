// SidebarContext.tsx
"use client"
import { createContext, useState, useEffect,  useRef, useContext } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation"

type SidebarContextType = {
  isOpenMobile: boolean;
  toggleMobile: () => void;
  isCollapsedDesktop: boolean;
  toggleDesktop: () => void;
  sortMenu: PageType;
  handleSidebarButton: (page: PageType) => void;
  handleClickOutside: () => void;
  handleNewProducts: () =>  void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  //isMobile: boolean;
  newProducts: boolean;
};
type PageType = "Home" | "Tutorials" | "Settings" | "Messages" | "Notifications" | "Upload Video";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);


export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {

  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);
  //const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [newProducts, setNewProducts]  = useState(false);
  const pathname = usePathname();
  const[sortMenu, setSortMenu] = useState<PageType>("Home");


  const handleNewProducts = () => {
    setNewProducts(!newProducts)
  }

  const handleSidebarButton = (pathname: PageType) => {
     setSortMenu(pathname);   // set active button
     setIsOpenMobile(false); // close mobile sidebar if needed
  };
  

  const handleClickOutside = () => {
     setIsOpenMobile(false)
  };


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
     // setIsMobile(mobile);

      if (mobile) {
        // Reset desktop collapse when entering mobile
        setIsCollapsedDesktop(false);
      } else {
        // Reset mobile open when entering desktop
        setIsOpenMobile(false);
      }

    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Run once at mount
    
    return () => {
       window.removeEventListener("resize", handleResize)
    }
  }, []);
  

  const toggleMobile = () => setIsOpenMobile((prev) => !prev);
  const toggleDesktop = () => setIsCollapsedDesktop((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ isOpenMobile, sidebarRef, sortMenu, handleNewProducts, newProducts, handleClickOutside,  handleSidebarButton, toggleMobile, isCollapsedDesktop, toggleDesktop }}
    >
    {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
