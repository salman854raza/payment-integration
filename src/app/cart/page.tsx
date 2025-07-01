'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <p className="text-gray-500 mb-8">Your cart is empty</p>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-gray-500">Size: {item.selectedSize}</p>
                  <p className="text-lg font-semibold text-gray-900">${item.product.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}