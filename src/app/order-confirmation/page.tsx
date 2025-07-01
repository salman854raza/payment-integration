'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}