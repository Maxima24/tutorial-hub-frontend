import { useSidebar } from "@/contexts/sideBarContext"
import { getPageConfig, PageConfig } from "@/lib/config/dashboard-config"
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const Navbar  = ({title, icon: Icon, parent}: PageConfig) =>{

    const {isCollapsedDesktop} = useSidebar();
    const pathname = usePathname();
    const currentPage = getPageConfig(pathname);
    const parentPage = currentPage.parent ? getPageConfig(currentPage.parent) : null;
    return(
        <div className= {`lg:px-8 px-2 py-6 shadow bg-white lg:flex hidden  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
            
            <div className="flex items-center gap-2">
                {currentPage.icon && <currentPage.icon className="w-6 h-6 text-blue-700 ml-2" />}
                {parentPage && (
                   <>
                      <Link href={currentPage.parent!} className=" lg:text-2xl text-xl hover:text-blue-500 font-bold">
                       {parentPage.title}
                      </Link>
                      <span className="text-gray-400"><ChevronRight/></span>
                     </>
                )}
                <span className="text-neutral-800 font-semibold lg:text-2xl text-xl">{currentPage.title}</span>
            </div>
        </div>
    )
}