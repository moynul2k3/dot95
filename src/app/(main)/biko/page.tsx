import React from 'react';
import { Metadata } from "next";
//import Banner from "@/app/utils/carousel/BannerCarousel";
import Video from "@/app/utils/wrapper/videos";
//import {BannerItem, fetchBanners, fetchTopCategories, TopCategoryData, ItemsData, fetchTopSales, fetchBrandVid } from "./fetchData";
import {fetchBrandVid, ItemsData, fetchTopSales } from "./fetchData";
//import ItemCarousel from '@/app/utils/carousel/ItemsCarousel';
//import ContentCarousel from '@/app/utils/carousel/ContentCarousel';
import Image from 'next/image';
import Link from 'next/link';
import BestBooks from './bestBooks'
//import BookBoxDesign from '@/app/utils/wrapper/bookBoxs';

export const metadata: Metadata = {
  title: "Home",
};


export default async function Home() {
	//const bannerData: BannerItem[] = await fetchBanners();
  //const Categories: CategoryData[] = await fetchItems();
  //const TopCategories: TopCategoryData[] = await fetchTopCategories();
  const BestSales: ItemsData[] = await fetchTopSales();
	const BrandVideo = await fetchBrandVid();
	//const BoxItems: BoxItemsData[] = await fetchBoxItems();

  //const slide1: string[] = bannerData
  //  .filter((banner) => banner.position === 'top_banner')
	//	.map((banner) => banner.banner);
	

  //const slide2: string[] = bannerData
  //  .filter((banner) => banner.position === 'bottom_banner')
  //  .map((banner) => banner.banner);

  return (
		<main className='min-h-screen max-md:px-2 md:px-8 lg:px-10 xl:px-24 h-auto w-full mt-16 md:mt-32'>
			<div id='Hero' className='grid max-md:grid-cols-1 md:grid-cols-4 grid-rows-3 gap-x-5 gap-y-10'>
				<div className='h-auto p-7 rounded-md shadow-[2px_3px_5px_5px_rgba(0,_0,_0,_0.05)]'>
					<div className='text-xl font-semibold border-b-[1px] border-black/10 '>
						<p className='pb-1'>You may like</p>
						<hr className='w-20 h-[2px] rounded-full bg-base border-0' />
					</div>
					<div className='mt-5 flex flex-col gap-3'>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/ganbistar.png" alt="alt" width={ 100 } height={ 100 } className='h-[40%] w-auto max-md:hidden' />
								জ্ঞানবিস্তার
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/beg_main.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden' />
								এডুকেশনাল গ্যালারি
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/non_academic_books.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden max-md:px-4' />
								নন-একাডেমিক বই
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/academic_books.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden' />
								একাডেমিক বই
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/best_books.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden' />
								সেরা বই
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/biko_mart.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden' />
								মার্ট
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
						<Link href="/" className='h-11  px-3 w-full rounded-sm shadow-[0px_0px_2px_1px_rgba(0,_0,_0,_0.10)] flex justify-between items-center group'>
							<div className='flex justify-start items-center gap-3 w-full h-full'>
								<Image src="/sectors/medical_treatment.png" alt="alt" width={100} height={100} className='h-[40%] w-auto max-md:hidden' />
								টেলিমেডিসিন
							</div>
							<svg viewBox="0 0 24 24" className="size-5 stroke-[2px] fill-none stroke-current opacity-50 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
								<line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
								<polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
							</svg>
						</Link>
					</div>
				</div>
				<div className="md:col-span-3 h-[400px]">
					{BrandVideo ? (
						<Video videoID={BrandVideo} />
					) : (
					  <Video videoID="bikoallinone" /> // Optionally handle the case when there's no videoID
					)}
				</div>
				<div className='md:row-span-2 md:row-start-2 h-auto p-7 rounded-md shadow-[2px_3px_5px_5px_rgba(0,_0,_0,_0.05)] '>
					<div className='text-xl font-semibold border-b-[1px] border-black/10 '>
						<p className='pb-1'>Best Sales</p>
						<hr className='w-20 h-[2px] rounded-full bg-base border-0' />
					</div>
					<div className='h-auto w-full'>
						<BestBooks Items={BestSales} />
					</div>
				</div>
				<div className="md:col-span-3 md:row-start-2 h-[100px]">4</div>
				<div className="md:col-span-3 md:col-start-2 row-start-3">5</div>
			</div>
		</main>
  );
}
