"use client";
import { useState, useEffect, useRef, useCallback  } from "react";
//import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
//import Categories from "./categories";
import AuthUser from "./userReg";
import SearchBar from "./searchBar";
import MyCart from "./myCart";
import TopNav from "./topNav";

const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  //const [isChangeBg, setIsChangeBg] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsHidden(currentScrollY > lastScrollY.current);

    if (pathname === "/") {
      setIsScrolled(currentScrollY > 100);
    } else {
      setIsScrolled(true);
    }

    lastScrollY.current = currentScrollY;
  }, [pathname]); // Only updates when pathname changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    if (pathname === "/") {
      setIsScrolled(window.scrollY > 100);
    } else {
      setIsScrolled(true);
    }
    setLoading(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, handleScroll]); // No ESLint warning, optimized re-renders

  //if (loading) return null;

  return (
    <main className={`fixed top-0 left-0 w-full h-auto z-50 transition-all ease-in-out duration-300 ${
      loading ? "-translate-y-full" : "translate-y-0"
    }`}>
      <header
        className={`bg-white transition-colors duration-300 ease-in-out relative z-50 max-md:h-10 md:h-16 max-md:px-4 md:px-8 lg:px-10 xl:px-24 flex justify-between items-center gap-5 max-md:border-b-[1px] border-black/10`}
      >
				<a href="/biko#" className="h-full w-auto flex justify-start items-center gap-1">
					<Image
						src="/logos/biko.png"
						alt="Biko"
						width={50}
						height={50}
            className='h-full py-1.5 w-auto'
            priority
					/>
				</a>
				<div className={`w-1/2 h-10 max-md:hidden`}>
          <SearchBar
            className={`flex justify-center w-full h-full max-h-12 rounded-lg shadow-[0px_0px_0.5px_0.5px_rgba(0,_0,_0,_0.25)] border-[1px] border-black/10 max-md:hidden `}
            ButtonClass="text-white h-full w-10 bg-red-600 hover:opacity-85 flex justify-center items-center gap-2 rounded-lg md:px-5 xl:px-14" />
				</div>
				<div className='flex justify-end items-center gap-4 h-full w-auto text-inherit text-sm'>
          <AuthUser />
          <hr className={ `h-3 w-0.5 transition-all duration-300 ease-in-out p-0 m-0 border-0 max-md:hidden bg-black/20` } />
					<MyCart />
				</div>
      </header>

      {pathname !== "/products" && <nav
        className={`z-40 border-black/10 border-b-[1px] bg-white w-full flex justify-center items-center h-10 transition-all duration-300 ease-in-out max-md:hidden 
        ${isHidden && isScrolled ? "-translate-y-full" : "translate-y-0"}`}
      >
        {/*<Categories isHidden={isHidden} isScrolled={isScrolled} changeBg={setIsChangeBg} />*/}
        <TopNav isHidden={isHidden} isScrolled={isScrolled} />
      </nav>}
    </main>
  );
};

export default Navbar;
