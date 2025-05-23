import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function footer() {
	return (
		<footer className="grid max-md:grid-cols-1 max-xl::grid-cols-2 xl:grid-cols-5 max-md:px-4 md:px-8 lg:px-10 xl:px-24 pb-20 lg-pb-0  text-white/70 bg-[#343434] relative mt-10">
    <div className="mt-10 lg:mt-28 h-auto  ">
        <Link href="/" className="mt-3 hover:text-[#f00] transition-colors ease-in-out duration-300">Follow Us</Link>
        <p className=" text-lg">Help Desk</p>
        <div className="mt-2 flex justify-start items-center gap-4">
            <a href="mailto:helpdesk@bikoallinone.com" target="_blank"><Image alt="alt" width={100} height={100} src="/icons/gmail.png"  className="w-8"/></a>
            <a href="https://wa.link/5p1gzi" target="_blank"><Image alt="alt" width={100} height={100} src="/icons/whatsapp.png"  className="w-8"/></a>
        </div>
    </div>

    <div className="mt-10 lg:mt-28 h-auto ">
        <ul className="mt-1">
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">About Biko</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Journey of Biko</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Biko Team</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Biko Gallery</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Massage from our well wisher</Link></li>
        </ul>
    </div>

    <div className="mt-10 lg:mt-28 h-auto ">
        <ul className="mt-1">
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Become an Entrepreneur </Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Earn With Biko</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Biko Campus Ambassador</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Educational Gallery Instructor</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Biko Volunteer</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Biko Agent</Link></li>
        </ul>
    </div>

    <div className="mt-10 lg:mt-28 h-auto ">
        <ul className="mt-1">
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Terms and Conditions</Link></li>
            <li><Link href="/" className="hover:text-[#f00] transition-colors ease-in-out duration-300">Refund</Link></li>
            <p className="mt-3">Trade License: <br/>18488/02-015-18488</p>
        </ul>
    </div>

    <div className="mt-10 lg:mt-28 h-auto  bg-white text-black/80 p-8 rounded-lg ">
        <Image alt="alt" width={100} height={100} src="/logos/biko.png"  className="w-20"/>
        <p className="noto_sans mt-3 text-sm">ডাউনলোড করুন আমাদের মোবাইল অ্যাপ</p>
        <div className="flex gap-5 mt-2">
            <a href="https://play.google.com/store/apps/details?id=com.bikoallinone.bikoallinone" download target="_blank">
                <Image alt="alt" width={100} height={100} src="/tags/g_play.png"  className="h-10 " />
            </a>
            <div id="app_store">
                <Image alt="alt" width={100} height={100} src="/tags/app_store.png"  className="h-10 " />
            </div>
        </div>
        <p id="error_text" className="text-sm mt-2 text-red-600 font-semibold hidden">App_store not available right now.</p>
    </div>
    <div className=" w-full h-auto flex flex-col justify-center items-center  mt-5 md:col-span-2 xl:col-span-5">
        <Image alt="alt" width={500} height={500} src="/banner/ssl.jpg" className="w-full"/>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-20 flex flex-col justify-center items-center ">
        <p className="noto_sans max-md:text-sm md:text-lg">স্বত্ব (c) ২০২০ - ২০২৪ বিকো কর্তৃক সর্বস্বত্ব সংরক্ষিত</p>
    </div>
</footer>
	)
}
