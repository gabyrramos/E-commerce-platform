// src/components/filters/ProductFilters.tsx
"use client";

import { useState } from "react";

interface ProductFiltersProps {
  onFiltersChange: (filters: { category?: string; priceRange?: { min?: number; max?: number }; sortBy?: string }) => void;
  initialCategory?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFiltersChange, initialCategory }) => {
  const [category, setCategory] = useState(initialCategory || "");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("");
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    onFiltersChange({ category: newCategory }); 
  };
  
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = event.target.value ? parseInt(event.target.value, 10) : undefined;
    setMinPrice(newMinPrice);
    onFiltersChange({ priceRange: { min: newMinPrice, max: maxPrice } });
  };
  
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = event.target.value ? parseInt(event.target.value, 10) : undefined;
    setMaxPrice(newMaxPrice);
    onFiltersChange({ priceRange: { min: minPrice, max: newMaxPrice } }); 
  };
  
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onFiltersChange({ sortBy: newSortBy }); 
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men&rsquo;s Clothing</option>
          <option value="women's clothing">Women&rsquo;s Clothing</option>
         
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Price Range:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice !== undefined ? minPrice : ""}
            onChange={handleMinPriceChange}
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice !== undefined ? maxPrice : ""}
            onChange={handleMaxPriceChange}
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mb-2">
        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
          Sort By:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
         
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;