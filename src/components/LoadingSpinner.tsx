'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"
      />
    </div>
  );
}