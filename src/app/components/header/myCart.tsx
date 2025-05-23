import React from "react";
import Link from "next/link";
//const API_URL =
//  process.env.NEXT_PUBLIC_PRODUCTION === "true"
//    ? process.env.NEXT_PUBLIC_PRODUCTION_API
//    : process.env.NEXT_PUBLIC_LOCAL_API;

//interface TopnavProps {
//  isScrolled: boolean;
//  isChangeBg: boolean;
//}


const Categories = () => {

  return (
    <Link href="/" className="max-md:hidden flex justify-center items-center  text-white hover:opacity-70 transition-all duration-300 ease-in-out  h-auto w-auto rounded relative " aria-label="User Profile">
			<div className={`flex justify-center items-center w-14  h-10 text-black transition-colors duration-300 ease-in-out`}>
				<i className='bx bx-cart text-2xl'></i>
				<span className={`h-6 w-6 text-[12px] bg-[#3a3a3a80] text-white transition-colors duration-300 ease-in-out rounded-full absolute -top-1 -right-1 flex justify-center items-center`}>5</span>
			</div>
		</Link>
  );
};

export default Categories;
