"use client";
import { useState, useEffect, useRef, useCallback  } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Categories from "./categories";
import AuthUser from "./userReg";
import SearchBar from "./searchBar";
import MyCart from "./myCart";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChangeBg, setIsChangeBg] = useState(false);
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, handleScroll]); // No ESLint warning, optimized re-renders

  return (
    <main className={`fixed top-0 left-0 w-full h-auto z-50`}>
      <header
        className={`${
          isScrolled || isChangeBg ? "bg-white" : "bg-transparent"
        } transition-colors duration-300 ease-in-out relative z-50 max-md:h-10 md:h-16 max-md:px-4 md:px-8 lg:px-20 xl:px-32 flex justify-between items-center gap-5`}
      >
				<Link href="/" className="h-full w-auto flex justify-start items-center gap-1">
					<Image
						src="/dot95.png"
						alt="Vercel logomark"
						width={100}
						height={100}
						className='h-full py-1.5 w-auto'
					/>
          <div className={ `w-full flex justify-center items-start flex-col gap-0 text-inherit max-md:hidden transition-all duration-300 ease-in-out 
          ${ isScrolled ? "text-black" : "text-white" }` }>
						<p className='md:text-2xl xl:text-3xl font-bold'>DOT 95</p>
						<p className='md:text-[7px] xl:text-[9px]'>Where find your comfort</p>
					</div>
				</Link>
				<div className={`w-1/2 h-10 max-md:hidden`}>
          <SearchBar
            className={`flex justify-center w-full h-full max-h-12 rounded-lg shadow-sm bg-black/5 border-[1px] border-black/10 max-md:hidden ${ isScrolled ? "visible opacity-100 " : "invisible opacity-0" }`}
            ButtonClass="text-white h-full w-10 bg-gradient_bg hover:opacity-85 flex justify-center items-center gap-2 rounded-lg md:px-5 xl:px-14" />
				</div>
				<div className='flex justify-end items-center gap-4 h-full w-auto text-inherit text-sm'>
          <AuthUser isScrolled={ isScrolled } isChangeBg={isChangeBg} />
          <hr className={ `h-3 w-0.5 transition-all duration-300 ease-in-out p-0 m-0 border-0 max-md:hidden 
          ${ isScrolled || isChangeBg ? "bg-black/20" : "bg-white/80" }` } />
					<MyCart isScrolled={isScrolled} isChangeBg={isChangeBg} />
				</div>
      </header>

      {pathname !== "/products" && <nav
        className={`z-40 ${
          isScrolled || isChangeBg ? "bg-white shadow-sm" : "bg-transparent"
        }  w-full flex justify-center items-center h-10 transition-all duration-300 ease-in-out 
        ${isHidden && isScrolled ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Categories isHidden={isHidden} isScrolled={isScrolled} changeBg={setIsChangeBg} />
      </nav>}
    </main>
  );
};

export default Navbar;
