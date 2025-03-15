'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const mockProducts = [
  { id: 1, name: 'Laptop Pro' },
  { id: 2, name: 'Smartphone X' },
  { id: 3, name: 'Wireless Headphones' },
  { id: 4, name: 'Gaming Mouse' },
  { id: 5, name: 'Mechanical Keyboard' },
];

const ProductSearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    if (query) {
      setFilteredProducts(
        mockProducts.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredProducts(mockProducts);
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4 mt-40">
      {/*<h1 className="text-2xl font-bold">Search Results for "{query}"</h1>*/}
      <div className="mt-4">
        {filteredProducts.length > 0 ? (
          <ul className="space-y-2">
            {filteredProducts.map((product) => (
              <li key={product.id} className="p-2 border rounded-lg">
                {product.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;
