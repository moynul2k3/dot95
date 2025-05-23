//import Image from 'next/image';
import { getBooksBoxCombinedData } from '@/app/(main)/biko/bookBoxData';
import SubCategories from "@/app/utils/carousel/SubCatCarousel"
import ItemCarousel from '@/app/utils/carousel/bookBoxCarrousel';
import Banner from "@/app/utils/carousel/BooksBannerCarousel";


const BoxDesign = async () => {
	const { categories, items, banners } = await getBooksBoxCombinedData();
	const half = Math.ceil(items.length / 2);
	const itemsFirstHalf = items.slice(0, half);
	const itemsSecondHalf = items.slice(half);

	const slide: string[] = banners
		.map((banner) => banner.image);

	return (
			<div className='h-full w-full  md:pt-2 md:p-3 shadow-[0px_0px_5px_0.3px_rgba(0,_0,_0,_0.15)] rounded md:rounded-[10] overflow-hidden mt-10 md:mt-20'
			>
				<p className='text-center md:font-bold text-2xl md:text-3xl'>Books</p>
				<hr className='h-[2px] w-full bg-black/10' />
				<div className='h-full w-full rounded md:rounded-[15] flex max-md:flex-col justify-between items-start md:mt-5'>
						<div className='max-md:w-full md:w-1/3 h-full max-md:hidden'>
							<Banner slides={slide} />
						</div>
						
						<div className='max-md:w-full md:w-2/3 md:h-full flex flex-col max-md:mt-3'>
							<div className='max-md:order-3 md:order-1'>
								<ItemCarousel speed={3} items={itemsFirstHalf} />
								<ItemCarousel speed={2} items={itemsSecondHalf} />
							</div>
							<hr className='w-full h-3 mt-2 text-black/10 order-2' />
							<div className='w-full md:h-[15%] max-md:order-1 md:order-3'>
								<SubCategories categories={categories} />
							</div>
						</div>
				</div>
			</div>
		)
}

export default BoxDesign;



