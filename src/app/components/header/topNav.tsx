"use client";
import React, { useEffect, useState, useRef } from "react";

interface TopnavProps {
  isHidden: boolean;
  isScrolled: boolean;
}

const Categories = ({isHidden, isScrolled }: TopnavProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
	const hideTimeout = useRef<NodeJS.Timeout | null>(null);
	
	console.log(isMobile)

  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

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
      <div className="flex gap-4 bg-white">
				<button
					onMouseLeave={handleMouseLeave}
				>
					hola
				</button>
				<button
					onMouseLeave={handleMouseLeave}
				>
					kola
				</button>
				<button
					onMouseLeave={handleMouseLeave}
				>
					mola
				</button>
      </div>

      <div
        className={`absolute z-30 top-full mt-1 h-[400px] max-md:w-[100vw] md:w-[80vw] lg:w-[50vw] bg-white shadow-md shadow-black/30 p-4 overflow-y-auto transition-all duration-300 ease-in-out rounded ${
          isActive && (!isHidden || !isScrolled)
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-full invisible"
        }`}
        onMouseEnter={() => hideTimeout.current && clearTimeout(hideTimeout.current)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-auto grid grid-cols-4 gap-5 justify-items-center">
          
        </div>
      </div>
    </main>
  );
};

export default Categories;
