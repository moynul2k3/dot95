"use client";
import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";
//import { Splide, SplideSlide } from "@splidejs/react-splide";
//import "@splidejs/splide/css";
//import "@splidejs/splide/css/core";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const API_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API
    : process.env.NEXT_PUBLIC_LOCAL_API;

interface TopnavProps {
  isHidden: boolean;
  isScrolled: boolean;
  changeBg: (value: boolean) => void;
}

interface Subcategory {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const Categories = ({ changeBg, isHidden, isScrolled }: TopnavProps) => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateDeviceType = debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 200);

    window.addEventListener("resize", updateDeviceType);
    updateDeviceType();

    return () => {
      window.removeEventListener("resize", updateDeviceType);
      updateDeviceType.cancel();
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories/`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    changeBg(!!isActive);
  }, [isActive, changeBg]);

  const handleOpen = (categoryId: string) => {
    setIsActive((prev) => (isMobile ? (prev === categoryId ? null : categoryId) : categoryId));
  };

  const handleMouseEnter = (categoryId: string) => {
    if (!isMobile) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setIsActive(categoryId);
    }
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsActive(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <main className="w-full h-full flex justify-center items-center z-40 relative">
      <Carousel
        opts={{
          align: "start",
          loop: true, // ✅ Enables infinite scrolling
          dragFree: true, // ✅ Allows smooth swiping
          duration: 30, // ✅ Adjusts animation speed (lower = smoother)
        }}
      >
        <CarouselContent className="">
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            categories.map((category) => (
              <CarouselItem key={category.id} className="max-md:basis-1/8 md:basis-1/8 lg:basis-1/6 select-none">
                <button
                  className={ `cursor-pointer transition ${ isScrolled || isActive ? 'text-black' : 'text-white' }` }
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleOpen(category.id)}
                >
                  {category.name}
                </button>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent hover:bg-transparent rounded-none border-0 h-6 w-4" />
        <CarouselNext className="bg-transparent hover:bg-transparent rounded-none border-0 h-6 w-4" />
      </Carousel>


      {/* Subcategories Dropdown */}
      <div
        className={`absolute z-30 top-full mt-1 h-[400px] max-md:w-[100vw] md:w-[80vw] lg:w-[50vw] bg-white shadow-md shadow-black/30 p-4 overflow-y-auto transition-all duration-300 ease-in-out rounded ${
          isActive && (!isHidden || !isScrolled) ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-full invisible"
        }`}
        onMouseEnter={() => hideTimeout.current && clearTimeout(hideTimeout.current)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-auto grid grid-cols-4 gap-5 justify-items-center">
          {categories
            .find((category) => category.id === isActive)
            ?.subcategories.map((sub) => (
              <Link href="/about" key={sub.id} className="h-20 w-20 flex flex-col justify-center items-center select-none">
                <Image src={sub.image} alt="" width={48} height={48} className="object-cover h-12 w-12 rounded-full" />
                {sub.name}
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Categories;

