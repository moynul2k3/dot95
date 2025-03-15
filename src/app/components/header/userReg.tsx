"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logout from "@/app/components/registration/logout";

interface AuthProps {
  isScrolled: boolean;
  isChangeBg: boolean;
}

// Function to get cookie value (only runs on the client)
const getCookie = (name: string): string | null => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  }
  return null;
};

const AuthUser = ({ isScrolled, isChangeBg }: AuthProps) => {
  const [u_id, setUid] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Ensure hydration consistency
  const router = useRouter();

  useEffect(() => {
    setUid(getCookie("u_id")); // Get the cookie only on the client
    setIsMounted(true); // Mark component as mounted
  }, []);

  const handleButtonClick = () => {
    if (!u_id) {
      router.push("?user=_authentication-required");
    }
  };

  const textColor = isScrolled || isChangeBg ? "text-black" : "text-white";

  // Prevent rendering until after mount (fix hydration error)
  if (!isMounted) return null;

  return (
    <div className="flex justify-center items-center gap-2 text-white w-auto max-w-20 h-10 rounded cursor-pointer relative z-40">
      {u_id ? (
        <div className="group flex justify-center items-center">
          <button
            onClick={handleButtonClick}
            className={`flex justify-center items-center h-full w-full ${textColor} transition-colors duration-300 ease-in-out hover:opacity-85`}
            aria-label="User Profile"
          >
            <i className="bx bx-user text-2xl"></i>
            <span className="text-sm max-md:hidden">{u_id}</span>
          </button>
          <UserPopup />
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          className={`flex justify-center items-center h-full w-full ${textColor} transition-colors duration-300 ease-in-out`}
          aria-label="User Profile"
        >
          <i className="bx bx-user text-2xl"></i>
          <span className=" max-md:hidden">SignIn/SignUp</span>
        </button>
      )}
    </div>
  );
};

export const UserPopup = () => {
  return (
    <div className="absolute top-0 max-md:-right-2 h-auto w-40 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible pt-12 transition-all ease-in-out duration-300">
      <div className="relative flex justify-center items-center w-full h-full bg-white shadow-sm shadow-black/20 rounded text-black backdrop-blur-2xl">
        <i className="bx bxs-up-arrow absolute -top-3 max-md:right-3"></i>
        <div className="h-full w-full p-3 flex justify-start items-start gap-3 flex-col">
          <Link href="" className="flex justify-start items-center gap-3 group/item">
            <i className="bx bx-smile text-[20px] font-thin"></i>
            <p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
              My Profile
            </p>
          </Link>
          <Link href="" className="flex justify-start items-center gap-3 group/item">
            <i className="bx bxs-shopping-bag-alt text-[20px] font-thin"></i>
            <p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
              My Orders
            </p>
          </Link>
          <Link href="" className="flex justify-start items-center gap-3 group/item">
            <i className="bx bx-heart text-[20px] font-thin"></i>
            <p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
              My Wishlist
            </p>
          </Link>
          <Link href="" className="flex justify-start items-center gap-3 group/item">
            <i className="bx bx-star text-[20px] font-thin"></i>
            <p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
              My Reviews
            </p>
          </Link>
          <Link href="" className="flex justify-start items-center gap-3 group/item">
            <i className="bx bx-plus rotate-45 border-[1px] border-black/30 rounded-full text-[16px] font-thin"></i>
            <p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
              My Returns
            </p>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
