"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { fetchCategories, CategoryData } from "@/app/(academicBooks)/academic-books/fetchData";

interface TopnavProps {
  isHidden: boolean;
  isScrolled: boolean;
  changeBg: (value: boolean) => void;
}

const Categories = ({ changeBg, isHidden, isScrolled }: TopnavProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
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
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    changeBg(!!isActive);
  }, [isActive, changeBg]);

  const handleOpen = (categoryId: number) => {
    setIsActive((prev) => (isMobile ? (prev === categoryId ? null : categoryId) : categoryId));
  };

  const handleMouseEnter = (categoryId: number) => {
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

  const activeCategory = useMemo(() => categories.find(c => c.id === String(isActive)), [categories, isActive]);

  return (
    <main className="w-full h-full flex justify-center items-center z-40 relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          duration: 30,
        }}
      >
        <CarouselContent>
          {(loading || error) ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-5 w-36 mx-2 ${isScrolled || isActive ? "bg-black/30" : "bg-white/30"}`}
              />
            ))
          ) : (
            categories.map((category) => (
              <CarouselItem key={category.id} className="max-md:basis-1/8 md:basis-1/8 lg:basis-1/6 select-none">
                <button
                  className={`cursor-pointer transition ${isScrolled || isActive ? "text-black" : "text-white"}`}
                  onMouseEnter={() => handleMouseEnter(Number(category.id))}
                  onClick={() => handleOpen(Number(category.id))}
                  onMouseLeave={handleMouseLeave}
                >
                  {category.name}
                </button>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="rounded-none border-0 h-6 w-4" />
        <CarouselNext className="rounded-none border-0 h-6 w-4" />
      </Carousel>

      <div
        className={`absolute z-30 top-full mt-1 h-[400px] max-md:w-[100vw] md:w-[80vw] lg:w-[50vw] bg-white shadow-md shadow-black/30 p-4 overflow-y-auto transition-all duration-300 ease-in-out rounded ${
          isActive && (!isHidden || !isScrolled) ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-full invisible"
        }`}
        onMouseEnter={() => hideTimeout.current && clearTimeout(hideTimeout.current)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-auto grid grid-cols-4 gap-5 justify-items-center">
          {activeCategory?.sub_categories?.map((sub) => (
            <Link href="/about" key={sub.id} className="h-20 w-20 flex flex-col justify-center items-center select-none">
              <Image
                src={sub.image || "/fallback.png"}
                alt={sub.name}
                width={48}
                height={48}
                priority
                className="object-cover h-12 w-12 rounded-full"
              />
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Categories;
