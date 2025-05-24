"use client"; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/react-splide/css/core';
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Item {
    key: string;
    slug: string;
    name?: string;
    image: string;
}

interface CarouselProps {
    items: Item[];
    small?: number;
    medium?: number;
    large?: number;
    extraLarge?: number;
}

const ItemCarousel = ({ items, small=2, medium=3, large=4, extraLarge=5 }: CarouselProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [items]);

    return (
        <section className="">
            { loading
                ? (
                    <div className="overflow-hidden ">
                        <div className=" mt-3 py-5 pb-10">
                            <ul className=" h-auto max-md:w-[180px] md:w-[300px] mt-5 flex flex-nowrap gap-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <li key={index} className=" relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2 bg-black/10">
                                        <div className="">
                                            <Skeleton className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-black/20">
                                                <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm w-8"></p>
                                            </Skeleton>
                                            <div className="w-full flex justify-center max-md:h-[150px] md:h-[200px] xl:h-[250px]">
                                        
                                            </div>
                                            <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                                                <Skeleton className="bg-black/20 max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2 w-full h-4"></Skeleton>
                                                <div className="flex justify-between items-center gap-10 max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                                    <Skeleton className="bg-black/20 w-10 h-3 max-md:text-[10px] md:text-sm xl:text-lg"></Skeleton>
                                                    <Skeleton className="bg-black/20 w-10 h-3 max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                                        
                                                    </Skeleton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                                            <Skeleton  className="bg-black/20 w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md  hover:opacity-85 max-md:text-xs text-white">Buy Now</Skeleton>
                                            <Skeleton className="bg-black/20 max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md hover:opacity-85 max-md:text-xs text-white">
                                                <span className='max-md:hidden'>Add to Cart</span>
                                                <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                                            </Skeleton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
                : (
                    <Splide
                        options={{
                            type: 'loop',
                            rewind: false,
                            gap: "1rem",
                            drag: 'free',
                            focus: 'center',
                            arrows: false,
                            pagination: false,
                            autoWidth: false,
                            autoHeight: false,
                            autoScroll: {
                                speed: 3,
                                autoStart: true,
                                pauseOnHover: true,
                                pauseOnFocus: false,
                            },
                            perPage: 6,
                            breakpoints: {
                                460: {
                                    perPage: small,
                                },
                                820: {
                                    perPage: medium,
                                },
                                1180: {
                                    perPage: medium,
                                },
                                1380: {
                                    perPage: large,
                                },
                                1750: {
                                    perPage: extraLarge,
                                },
                            },
                            
                        } }
                        extensions={{ AutoScroll }}
                        className="mt-3 py-2 pb-10 "
                    >
                        {items.map((item, index) => (
                            <SplideSlide key={item.slug || item.key || index} className="py-1">
                                <div className='relative max-xl:rounded-md xl:rounded-xl shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#C80404,1px_0px_5px_#FC4F2F] transition-shadow duration-300 pb-2 h-auto w-auto overflow-hidden'>
                                    <Link href="/biko" className="w-auto flex flex-col ">
                                        <div className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-gradient_bg  z-30">
                                            <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm ">- 40%</p>
                                        </div>
                                        <div className="w-full flex justify-center max-md:h-[150px] md:h-[250px] overflow-hidden relative z-20">
                                            <Image
                                                src={ item.image || "/biko.png" }
                                                alt={ item.name || 'Biko'  }
                                                loading="eager"
                                                fill priority
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className=" object-cover absolute top-0 left-0 h-full w-full z-20"
                                            />
                                        </div>
                                        <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                                            <p className="max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2">{item.name}</p>
                                            <div className="flex justify-between items-center max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                                <p className="max-md:text-[10px] md:text-sm xl:text-lg">Points: 43</p>
                                                <p className="max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                                    <del className=""><span className="noto_sans">৳</span>800</del>&nbsp;&nbsp;&nbsp;
                                                    <span className="noto_sans max-md:text-[14px] md:text-[20px]">৳</span>&nbsp;
                                                    <span className="max-md:text-[12px] md:text-[16px]">400</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                                        <Link href="/" className="w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">Buy Now</Link>
                                        <Link href="/" className="max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">
                                            <span className='max-md:hidden'>Add to Cart</span>
                                            <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
            )}
            
        </section>
    );
};

export default ItemCarousel;



{/*<Splide
        options={{
          //type: "loop",
          gap: "5rem",
          drag: "free",
          //focus: "center",
          pagination: false,
          arrows: true,
          breakpoints: {
            768: {
              arrows: false,
              gap: "2rem",
            },
          },
          autoWidth: true,
          autoHeight: false,
          autoplay: false,
          pauseOnHover: true,
          pauseOnFocus: false,
          speed: 600,
          easing: "ease",
        }}
        className="relative max-md:w-[100vw] md:w-[80vw] lg:w-[60vw] h-full max-md:px-5 md:px-20 flex justify-center items-center"
      >
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          categories.map((category) => (
            <SplideSlide key={category.id}>
              <button
                className={`cursor-pointer transition ${isScrolled || isActive?'text-black':'text-white'}`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleOpen(category.id)}
              >
                {category.name}
              </button>
            </SplideSlide>
          ))
        )}
      </Splide>*/}