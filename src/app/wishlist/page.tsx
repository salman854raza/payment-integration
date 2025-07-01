'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/ProductGrid';
import { useStore } from '@/lib/store';

export default function WishlistPage() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
          <p className="text-gray-500 mb-8">Your wishlist is empty</p>
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductGrid products={wishlist} title="Your Wishlist" />
      </motion.div>
    </div>
  );
}