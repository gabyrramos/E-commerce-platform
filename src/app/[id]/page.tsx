"use client";

import React, { useState, useEffect } from 'react';
import ProductDetails from '@/components/productdetail/productDetail';
import { Product } from '@/app/products/page';
import { useRouter } from 'next/router';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Usamos router.query para obtener el id de la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Asegúrate de que id esté disponible

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
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
