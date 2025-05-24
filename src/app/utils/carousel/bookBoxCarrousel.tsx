"use client"; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/react-splide/css/core';
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ColorThief from 'colorthief';

interface Item {
    key: string;
    slug: string;
    name?: string;
    image: string;
}

interface CarouselProps {
    Items: Item[];
    speed?: number;
    className?: string;
}

const ItemCarousel = ({ Items, speed=3, className }: CarouselProps) => {
    const [loading, setLoading] = useState(true);

    const [bgColors, setBgColors] = useState<{ [key: string]: string }>({});
      const imgRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});
    
      const handleImageLoad = (key: string) => {
        const img = imgRefs.current[key];
        if (img && img.complete) {
          try {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            const rgba = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`;
            setBgColors(prev => ({ ...prev, [key]: rgba }));
          } catch (err) {
            console.error('Color extraction failed:', err);
          }
        }
      };

    useEffect(() => {
        if (Items.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [Items]);

    return (
        <section className={`${className}`}>
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
                        options={ {
                            type: 'loop',
                            omitEnd  : true,
                            rewind: false,
                            gap: "1rem",
                            drag: 'free',
                            focus: 'center',
                            arrows: false,
                            pagination: false,
                            autoWidth: false,
                            autoHeight: false,
                            autoScroll: {
                                speed: speed,
                                autoStart: true,
                                pauseOnHover: true,
                                pauseOnFocus: false,
                            },
                            perPage: 6,
                            breakpoints: {
                                460: {
                                    perPage: 1,
                                },
                                820: {
                                    perPage: 1,
                                },
                                1180: {
                                    perPage: 2,
                                },
                                1380: {
                                    perPage: 2,
                                },
                                1750: {
                                    perPage: 3,
                                },
                            },
                            
                        } }
                        extensions={{ AutoScroll }}
                        className="py-2"
                    >
                        {Items.map((item, index) => (
                            <SplideSlide key={ item.slug || item.key || index }
                                className="w-full h-[190px] rounded-md overflow-hidden border-[1px] border-black/15 flex justify-between items-start"
                                style={{ backgroundColor: bgColors[item.key] || 'rgba(0,0,0,0.1)' }}
                            >
                                <div className="relative h-full w-2/5">
                                  <Image
                                    src={item.image}
                                    alt=" "
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-cover border-[1px] border-white/50"
                                    ref={(el) => {
                                      imgRefs.current[item.key] = el;
                                    } }
                                    onLoad={() => handleImageLoad(item.key)}
                                    priority
                                  />
                                  
                                </div>
                                <div className="w-3/5 h-full relative">
                                  <div className="text-end p-2">
                                    <p className="text-xl text-inherit noto_sans line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-inherit text-[10px] noto_sans">dfgd</p>
                                  </div>
                                  <div className="w-full px-2 pb-2 bottom-0 absolute">
                                    <p className="text-xs text-inherit text-center mb-3 text-[12px] font-thin noto_sans">hola</p>
                                    <div className='flex justify-center items-center gap-1 w-full h-8'>
                                      <Link href="#" className="h-full w-[80%] border-[1px] border-white/40 rounded-sm flex justify-center items-center bg-gradient_bg text-white">
                                        <p className="">
                                          Buy Now
                                        </p>
                                      </Link>
                                      <Link href="#" className='h-full w-[20%] border-[1px] border-white/40 rounded-sm flex justify-center items-center bg-gradient_bg text-white'>
                                        <span><i className='bx bxs-cart-add text-xl'></i></span>
                                      </Link>
                                    </div>
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