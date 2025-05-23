'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ColorThief from 'colorthief';

interface Items {
  key: string;
  slug: string;
  name: string;
  image: string;
  author: {
    name: string;
  };
}

interface ItemsProps {
  Items: Items[];
}

const BestSales = ({ Items }: ItemsProps) => {
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

  return (
    <div className="flex flex-col gap-3 mt-2">
      {Items.map((item) => (
        <div
          key={item.key}
          className="w-full h-[152.96px] rounded-md overflow-hidden border-[1px] border-black/15 flex justify-between items-start"
          style={{ backgroundColor: bgColors[item.key] || 'rgba(0,0,0,0.1)' }}
        >
          <div className="relative h-full w-2/5">
            <Image
              src={item.image}
              alt={item.name}
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
              <p className="text-xs text-inherit text-[10px] noto_sans">{item.author?.name || ''}</p>
            </div>
            <div className="w-full px-2 pb-2 bottom-0 absolute">
              <p className="text-xs text-inherit text-center mb-3 text-[12px] font-thin noto_sans">hola</p>
              <a href="#" className="mb-3">
                <p className="h-8 w-full border-[1px] text-inherit border-black/40 rounded-md flex justify-center items-center">
                  Buy Now
                </p>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSales;
