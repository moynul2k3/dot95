"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  className: string;
  ButtonClass: string;
}

const SearchBar = ({ className, ButtonClass }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    // If URL changes, update local state
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      router.push(`/products?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push(`/products`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push(`/products`);
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
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2 text-gray-500 hover:text-red-500"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button type="submit" className={ButtonClass}>
          <i className="bx bx-search text-xl text-center"></i>
          <span className="max-xl:hidden">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
