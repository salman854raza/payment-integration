'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, selectedSize);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/products/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={handleWishlistToggle}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            {inWishlist ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <label htmlFor={`size-${product.id}`} className="text-sm font-medium text-gray-700">
            Size:
          </label>
          <select
            id={`size-${product.id}`}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <ShoppingBagIcon className="h-4 w-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      </div>
    </motion.div>
  );
}