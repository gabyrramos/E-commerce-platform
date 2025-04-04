// src/components/products/ProductDetails.tsx
import React from 'react';
import Image from 'next/image';
import {Product} from '@/app/products/page';

interface ProductDetailsProps {
  product: Product | null; 
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  if (!product) {
    return <div className="py-10 text-center text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 w-full aspect-h-1 aspect-w-1 max-w-lg">
              <Image
                src={product.image}
                alt={product.title}
                width={800}
                height={800}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>


          <div className="mt-10 px-4 sm:px-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg">{product.description}</p>
              </div>
            </div>

    
            <div className="mt-10">
              <div className="flex items-center space-x-4">
    
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>

                
                <button
                  className="flex-1 rounded-md bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;