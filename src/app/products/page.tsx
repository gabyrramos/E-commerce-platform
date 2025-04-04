// src/app/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/ui/products/ProductCard";
import ProductFilters from "@/components/filters/ProductFilters";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Filters {
  category?: string;
  page: number;
  priceRange?: { min?: number; max?: number };
  sortBy?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const fetchProducts = async (filters: Filters): Promise<Product[]> => {
  let url = "https://fakestoreapi.com/products";
  const queryParams = [];

  if (filters.category) {
    queryParams.push(`category=${filters.category}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const response = await fetch(url);
  return (await response.json()) as Product[];
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    page: 1,
    priceRange: { min: undefined, max: undefined },
    sortBy: ""
  });

  const { data: allProducts, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", filters.category], 
    queryFn: () => fetchProducts(filters),
  });


  const ITEMS_PER_PAGE = 10;
  const filteredAndSortedProducts = useMemo(() => {
    if (!allProducts) return [];

    return allProducts
      .filter(product => {
        if (filters.priceRange?.min && product.price < filters.priceRange.min) return false;
        if (filters.priceRange?.max && product.price > filters.priceRange.max) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [allProducts, filters.priceRange, filters.sortBy]);

  const paginatedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(
      (filters.page - 1) * ITEMS_PER_PAGE,
      filters.page * ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, filters.page]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); 
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return <p className="text-center py-8">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">Error loading products</p>;
  }

  return (
    <div className="bg-white p-4">
      <div className="mx-auto max-w-7xl">
        <ProductFilters
          onFiltersChange={handleFiltersChange}
          initialCategory={initialCategory}
        />
        <h2 className="text-2xl font-bold text-gray-900 mt-6">Product Catalog</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {filters.page} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}