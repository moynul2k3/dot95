"use client"; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/react-splide/css/core';
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import React from 'react';

const formatDateToBengali = (isoDate: string): string => {
  const date = new Date(isoDate);

  const formatter = new Intl.DateTimeFormat('bn-BD', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
};

interface Items {
    slug: string;
    title: string;
    banner: string;
		video: string;
		created_at: string;
		writer: {
			name: string;
			photo: string;
			occupation: string;
			institution: string;
		}
}

interface CarouselProps {
    Items: Items[];
}

const ContentCarousel = ({ Items }: CarouselProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Items.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [Items]);

    return (
        <section className="">
            { loading
                ? (
                    <div className="overflow-hidden ">
                        <div className="py-1">
                            <ul className=" h-auto w-auto mt-5 flex flex-nowrap gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className='relative rounded shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#C80404,1px_0px_5px_#FC4F2F] transition-shadow duration-300 h-auto max-md:w-full md:w-1/2 xl:w-1/4 overflow-hidden'>
                                    <Skeleton className="w-full flex flex-col max-md:h-[230px] md:h-[250px] xl:h-[300px] bg-white">
                                        <Skeleton className="w-full h-[70%] flex justify-center  overflow-hidden relative z-20  bg-black/30">
																					
                                        </Skeleton>
																				<div className="w-full h-[30%] flex justify-between items-center max-xl:gap-2 xl:gap-3 max-md:px-1 md:px-2">
																					<Skeleton className='max-md:h-[50px] md:h-[60px] xl:h-[70px] max-md:w-[50px] md:w-[60px] xl:w-[70px] rounded-full bg-black/30'></Skeleton>
																					<div className="flex flex-col justify-center items-start gap-2 h-full noto_sans leading-5 flex-1">
																						<Skeleton className="line-clamp-1 font-semibold max-md:text-sm md:text-lg xl:text-xl bg-black/30 h-4 w-40"></Skeleton>
																						<Skeleton className="line-clamp-1 font-semibold max-md:text-sm md:text-lg xl:text-xl bg-black/30 h-4 w-36 "></Skeleton>
																						<Skeleton className="max-md:text-[10px] md:text-[12px] xl:text-[14px] font-bengali bg-black/30 h-2 w-28"></Skeleton>
																					</div>
																				</div>
                                    </Skeleton>
                                </div>
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
                            gap: "2rem",
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
                                    perPage: 1,
                                },
                                820: {
                                    perPage: 2,
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
                        className="mt-3 py-2 pb-10 "
                    >
                        {Items.map((Item) => (
                            <SplideSlide key={Item.slug} className="py-5 pb-10">
                                <div className='relative rounded shadow-[10px_0px_15px_3px_rgba(0,_0,_0,_0.35)] hover:shadow-[-1px_0px_15px_#204775,1px_0px_15px_#142f4d] transition-shadow duration-300 h-auto w-auto overflow-hidden'>
                                    <Link href="/biko" className="w-auto flex flex-col max-md:h-[230px] md:h-[250px] xl:h-[320px] bg-white p-2">
                                        <div className="w-full h-[70%] flex justify-center  overflow-hidden relative z-20">
																					<Image
                                                src={ Item.banner }
                                                alt={ Item.title }
                                                loading="eager"
                                                fill priority
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className=" object-cover absolute top-0 left-0 h-full w-full z-20" 
                                          />
                                        </div>
																				<div className="w-full h-[30%] flex justify-between items-center max-xl:gap-2 xl:gap-3 max-md:px-1 md:px-2">
																					<Image src={Item.writer.photo} alt="alt" width={100} height={100} className='max-md:h-[50px] md:h-[60px] xl:h-[70px] max-md:w-[50px] md:w-[60px] xl:w-[70px] rounded-full' />
																					<div className="flex flex-col justify-center items-start h-full noto_sans leading-5 flex-1">
																						<p className="line-clamp-1 font-semibold max-md:text-sm md:text-lg xl:text-xl">{Item.title}</p>
																						<p className="max-md:text-xs md:text-sm xl:text-lg"><span>{ Item.writer.name }</span> - <span>{ Item.writer.occupation }</span> - <span>{ Item.writer.institution }</span></p>
																						<p className="max-md:text-[10px] md:text-[12px] xl:text-[14px] font-bengali">প্রকাশিত: {formatDateToBengali(Item.created_at)}</p>
																					</div>
																				</div>
                                    </Link>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
            )}
            
        </section>
    );
};

export default ContentCarousel;



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



			//{Item.banner?
      //                                      <Image
      //                                          src={ Item.banner }
      //                                          alt={ Item.title }
      //                                          loading="eager"
      //                                          fill priority
      //                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      //                                          className=" object-cover absolute top-0 left-0 h-full w-full z-20" />
			//																		: ""}