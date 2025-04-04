// src/ui/products/ProductCard.tsx
import React from 'react';
import { Product } from '@/app/products/page';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
      <img
        alt={product.title}
        src={product.image}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </div>
  );
};

export default ProductCard;