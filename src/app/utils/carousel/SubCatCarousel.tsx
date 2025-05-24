"use client"; // Required in Next.js 15
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { Grid } from '@splidejs/splide-extension-grid';

interface Category {
    id: number;
    key?: string;
    name: string;
    image: string;
}

interface CarouselProps {
    categories: Category[];
}

const CatCarousel = ({ categories }: CarouselProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categories.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [categories]);

    return (
        <section className="">
            { loading ? (
                <div className=" mt-5">
                    <div className=" mt-3 mb-5">
                        <ul className="grid max-md:grid-cols-3 md:grid-cols-5 xl:grid-cols-8 grid-rows-2 gap-[10px]">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className=" group max-md:h-[80px] md:h-[100px] xl:h-[150px] shadow-slate-700  bg-black/10 rounded shadow-md ">
                                    <div className="flex flex-col items-center justify-center h-full w-full" >
                                        <div className="h-[60px] w-full flex justify-center items-center">
                                            <Skeleton className="h-[50px] w-[50px] bg-white/10"></Skeleton>
                                        </div>
                                        <div className="px-3 py-2 w-full">
                                            <Skeleton className="text-sm text-center w-full h-3 bg-white/10"></Skeleton>
                                        </div>
                                    </div>
                                </Skeleton>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <Splide 
                    options={ {
                        //type: 'loop',
                        rewind: true,
                        gap: "2rem",
                        drag: 'free',
                        focus: "center",
                        arrows: false,
                        pagination: false,
                        autoWidth: true,
                        autoHeight: false,
                        autoScroll: {
                            speed: 3,
                            autoStart: true,
                            pauseOnHover: true,
                            pauseOnFocus: false,
                        },
                        perPage: 2,
                        breakpoints: {
                            460: {
                                perPage: 2,
                            },
                            820: {
                                perPage: 4,
                            },
                            1180: {
                                perPage: 4,
                            },
                            1380: {
                                perPage: 4,
                            },
                            1750: {
                                perPage: 4,
                            },
                        },
                    } }
                    extensions={{ Grid }}
                    className="w-full">
                    {categories.map((cat, index) => (
                        <SplideSlide key={cat.key || index} className="group splide__slide group origin-center transition ease-in-out delay-150">
                            <Link
                                //href={`/product/filters?group=${cat.id}&name=${encodeURIComponent(cat.name)}`}
                                href={`#`}
                                className="flex flex-col items-center justify-center h-full w-full"
                            >
                                <div className="h-[70%] p-2 w-full flex justify-center items-center  ">
                                    <div className="h-16 w-16 p-2 flex justify-center items-center rounded-full bg-base shadow-[0px_0px_5px_0.3px_rgba(0,_0,_0,_0.15)] overflow-hidden">
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            width={50}
                                            height={ 50 }
                                            priority 
                                            className=""
                                        />
                                    </div>
                                    
                                </div>
                                <div className="px-1 h-[30%]">
                                    <p className="text-sm text-center">{cat.name}</p>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            ) }
        </section>
    );
};

export default CatCarousel;
