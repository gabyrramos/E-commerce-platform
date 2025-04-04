// src/app/products/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ProductDetails from '@/components/productdetail/productDetail';
import { Product } from '@/app/products/page';

interface ProductDetailPageProps {
  params: { id: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as Product;
        setProduct(data);
      } catch (err: any) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div className="py-10 text-center text-gray-500">Loading product details...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="py-10 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;