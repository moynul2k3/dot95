'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  className: string;
  ButtonClass: string;
}


const SearchBar = ({ className, ButtonClass }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={className}>
        <form onSubmit={handleSearch} className="flex items-center w-full h-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-grow p-2 ps-5 outline-none bg-transparent h-full"
            />
            <button type="submit" className={ButtonClass}>
                <i className="bx bx-search text-xl text-center"></i>
                <span className="max-xl:hidden">Search</span>
            </button>
        </form>
    </div>
  );
};

export default SearchBar;
