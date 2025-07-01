'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import products from '@/data/products.json';
import { useStore } from '@/lib/store';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  if (!product) {
    notFound();
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <button
              onClick={handleWishlistToggle}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              {inWishlist ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 border rounded-lg text-center transition-colors ${
                    selectedSize === size
                      ? 'border-primary-500 bg-primary-50 text-primary-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Premium quality materials</li>
              <li>• Comfortable fit</li>
              <li>• Easy care instructions</li>
              <li>• Available in multiple sizes</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}