import React from "react"

import { useSidebar } from "@/contexts/sideBarContext"
import { getPageConfig, PageConfig } from "@/lib/config/dashboard-config"
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const Navbar  = ({title, icon: Icon, parent}: PageConfig) =>{
    const [scrolled,setScrolled] = React.useState<boolean>(false)
    const {isCollapsedDesktop} = useSidebar();
    const pathname = usePathname();
    const currentPage = getPageConfig(pathname);
    const parentPage = currentPage.parent ? getPageConfig(currentPage.parent) : null;
    React.useEffect(()=>{
        const handleScroll =()=>{
             setScrolled(window.scrollY > 50)
        }
       window.addEventListener("scroll",handleScroll)
       return ()=>window.removeEventListener("scroll",handleScroll)
    },[])

    return(
        <div className= {`top-0 z-[1000]  sticky lg:px-8 px-2 py-6 shadow bg-white   ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"} ${scrolled?"bg-white/20 backdrop-blur-md shadow-md":"bg-white"}`}>
            
            <div className="flex items-center gap-2">
                {currentPage.icon && <currentPage.icon className="w-6 h-6 text-blue-700 ml-2" />}
                {parentPage ? (
                   <>
                      <Link href={currentPage.parent!} className=" lg:text-2xl text-xl hover:text-blue-500 font-bold">
                       {parentPage.title}
                      </Link>
                      <span className="text-gray-400"><ChevronRight/></span>
                      {/*<span className="text-neutral-800 font-semibold lg:text-2xl text-xl">{currentPage.title}</span>*/}
                     </>
                ): (
                                <>
                      <h1 className=" lg:text-2xl text-xl hover:text-blue-500 font-bold">
                       {currentPage.title}
                      </h1>
                      <span className="text-gray-400"><ChevronRight/></span>
                     </>
                )}
            </div>
        </div>
    )
}