"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define the type for the slides prop
interface MySwiperProps {
    slides: string[]; // Expecting an array of image URLs
}

const MySwiper: React.FC<MySwiperProps> = ({ slides }) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    useEffect(() => {
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, []);

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
            effect="fade" // Fade effect for transitions
            pagination={{ dynamicBullets: true, clickable: true }} // Pagination settings
            modules={[EffectFade, Pagination, Autoplay]} // Swiper modules
            autoplay={{ delay: 3000 }} // Automatic slide transition every 3 seconds
            className="w-full h-full transition-all ease-in-out duration-700 mt-3"
        >
            {slides.map((image, index) => (
                <SwiperSlide key={index} className="h-full w-full ">
                    <div className="w-full h-full ">
                        <Image 
                            src={ image } 
                            height={ 100 }
                            width={100}
                            alt={`Slide ${index + 1}`}
                            className="h-full w-full object-cover"
                            priority
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MySwiper;
