import { Overlay } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers";
import { TRole } from "@/types";
import { hasRole } from "@/utils/auth-utils";
import { EyeIcon, HomeIcon, UserIcon, BookMarkedIcon, SearchIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../logo/Logo";
import { HeaderSidebar } from "./HeaderSidebar";

type THeaderItem =
  | {
    /* Link */
    id: string;
    title: string;
    href: string;
    icon?: React.ReactNode;
    allowedRoles?: TRole[];
    isPublic: boolean;
  }
  | {
    /* Button with children */
    id: string;
    title?: string;
    icon?: React.ReactNode;
    allowedRoles: TRole[];
    children?: React.ReactNode;
    isPublic: boolean;
    onClick?: () => void;
  };

type TSidebarProps = {
  className?: string;
};

export function Header({ className }: TSidebarProps) {

  // state
  const [openItem, setOpenItem] = useState<number | null>(null);

  // hooks
  const { user } = useAuth();
  const { open: openSidebar, isOpen: isSidebarOpen, close: closeSidebar } = useDisclosure();

  // data
  const headerItems: THeaderItem[] = useMemo(
    () => [
      {
        id: "Admin",
        title: "Admin",
        href: "/admin",
        icon: <EyeIcon size={16} />,
        allowedRoles: ["ROLE_ADMIN"],
        isPublic: false,
      },

      /* { Promjena jezika
         id: "Languages",
         icon: <LanguagesIcon size={16} />,
         allowedRoles: ["ROLE_USER"],
         isPublic: true,
         children: (
           <div className="absolute top-0 right-0 flex flex-col gap-1 mt-3 bg-background p-4 w-full rounded-md min-w-min">
             <Button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md">
               English
             </Button>
             <Button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md">
               Croatian
             </Button>
           </div>
         ),
       },*/
      { id: "Favorite",
        title: "",
        href: "/favourites",
        icon: <BookMarkedIcon size={16} />,
        isPublic: true,
        onClick:()=>{addToFavorites()}
           },
      { 
        id: "Home",
        title: "",
        href: '/feed' ,
        icon: <HomeIcon size={16} />,
        isPublic: true 
        },

      { 
        id: "StandardHome",
        title: "", 
        href: '/search',
        icon: <SearchIcon size={16} />, 
        isPublic: true,
      },
      {
        id: "Profile",
        icon: <UserIcon size={16} />,
        allowedRoles: ["ROLE_USER"],
        isPublic: true,
        href: '/guestpage', 
        //onClick: () => openSidebar(),
      },
      /*{
        id: "Login",
        title: "",
        href: "/login",
        icon: <UserIcon size={16} />,
        isPublic: true,
      }*/
    ],
    [openSidebar]
  );

  // methods
  const canDisplayItem = (item: THeaderItem) => {
    if (user && item.id == "Login") return false;
    else if (item.isPublic) return true;
    else if (!user) return false;

    return hasRole(user, item.allowedRoles);
  };
  const getItemClasses = () =>
  {
        return `flex items-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-md hover:bg-primary-darker`;
  }

  /*
  <Logo>
            <Link to="/" className="px-4 py-2 text-lg text-">
              App
            </Link>
          </Logo> */

  return (
    <>
      <header className={cn(className, "z-40")}>
        <nav className="flex justify-between gap-3">
          

            <ul className="flex justify-center gap-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 align-center z-40 bg-white/60 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-white/30">

                {headerItems.map(
                    (item, index) =>
                        canDisplayItem(item) && (
                            <li key={item.id}>
                                {"href" in item ? (
                                    <Link
                                        to={item.href}
                                        className={getItemClasses()}
                                    >
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                ) : (
                                    <div>
                                        <Button
                                            onClick={
                                                item.onClick
                                                    ? item.onClick
                                                    : () => setOpenItem(openItem === index ? null : index)}

                                            variant={"ghost"}
                                            className={getItemClasses()}
                                        >
                                            {item.icon}
                                            {item.title}
                                        </Button>
                                        {openItem === index && item.children && (
                                            <div className="absolute bottom-full mb-2">{item.children}</div>
                                        )}
                                    </div>
                                )}
                            </li>
                        )
                )}
            </ul>
        </nav>
      </header>

        {/* Sidebar */}
        <Overlay isOpen={isSidebarOpen} onClose={closeSidebar}>
            <HeaderSidebar onClose={closeSidebar}/>
        </Overlay>
    </>
  );
}
function addToFavorites() {
  throw new Error("Function not implemented.");
}

