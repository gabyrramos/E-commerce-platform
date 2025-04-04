// ui/filter/FilterNav.tsx
"use client";

import { useRouter } from "next/router";

interface FilterNavProps {
  categories: string[];
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterNav({
  categories,
  currentCategory,
  onCategoryChange,
}: FilterNavProps) {
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
    router.push(`/productos?category=${selectedCategory}&page=1`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg">Filtrar por categoría</h3>
      <select
        value={currentCategory}
        onChange={handleCategoryChange}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
