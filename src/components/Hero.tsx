'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Premium clothing for men, women, and kids. Find the perfect outfit for every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/category/women"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Women's
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/category/men"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Shop Men's
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}