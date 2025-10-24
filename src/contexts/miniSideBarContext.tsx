import React from "react";
import { usePathname } from "next/navigation";
type PageType =
| "Profile"
| "Account"
| "Notification"
| "Privacy"
| "Appearance"
| "Language";


interface MiniSideBarContext {
    isOpenMobile: boolean;
    sideBarRef: React.RefObject<HTMLDivElement | null>;
    sortMenu: PageType;
    newProducts: boolean;
    isCollapsedDesktop: boolean;
    handleNewProducts: () => void;
  handleClickOutside: () => void;
  handleSideBarButton: (page:PageType) => void;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  path:string | undefined,
  setPath: React.Dispatch<React.SetStateAction<undefined>>
}
export const useMiniSidebar = () => {
  const context = React.useContext(MiniSideBarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
};




const MiniSideBarContext = React.createContext<MiniSideBarContext | null>(null);
export const MiniSideBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenMobile, setIsOpenMobile] = React.useState<boolean>(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = React.useState<boolean>(false);
  const [path,setPath] = React.useState()
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
  const sideBarRef = React.useRef<HTMLDivElement | null>(null);
  const [newProducts, setNewProducts] = React.useState<boolean>(false);
  const pathname = usePathname();
  const [sortMenu, setSortMenu] = React.useState<PageType>("Profile");
  const handleNewProducts = () => {
    setNewProducts(!newProducts);
  };
  const handleSideBarButton = () => {
    setSortMenu(pathname.replace("/", "") as PageType);
    setIsOpenMobile(false);
  };
  const handleClickOutside = () => {
    setIsOpenMobile(false);
  };
  React.useEffect(() => {
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
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleMobile = () => setIsOpenMobile((prev) => !prev);
  const toggleDesktop = () => setIsCollapsedDesktop((prev) => !prev);
  return (
    <MiniSideBarContext.Provider
      value={{
        isOpenMobile,
        sideBarRef,
        sortMenu,
        handleNewProducts,
        newProducts,
        handleClickOutside,
        handleSideBarButton,
        toggleMobile,
        isCollapsedDesktop,
        toggleDesktop,
        path,
        setPath
      }}
    >
      {children}
    </MiniSideBarContext.Provider>
  );
};
