'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ShippingForm from '@/components/ShippingForm';
import { useStore } from '@/lib/store';
import { ShippingAddress, ShippingRate } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useStore();
  const [shippingInfo, setShippingInfo] = useState<{
    address: ShippingAddress | null;
    rate: ShippingRate | null;
  }>({ address: null, rate: null });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shippingCost = shippingInfo.rate ? parseFloat(shippingInfo.rate.shipping_amount.amount) : 0;
  const total = subtotal + shippingCost;
  const totalWeight = cart.reduce((weight, item) => weight + item.quantity * 1, 0); // Assume 1 lb per item

  const handleShippingSelect = (address: ShippingAddress, rate: ShippingRate) => {
    setShippingInfo({ address, rate });
  };

  const handlePlaceOrder = async () => {
    if (!shippingInfo.address || !shippingInfo.rate) {
      alert('Please complete shipping information');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push('/order-confirmation');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="text-gray-500 mb-8">Your cart is empty</p>
          <a
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ShippingForm onShippingSelect={handleShippingSelect} totalWeight={totalWeight} />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center gap-4">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingInfo.rate ? `$${shippingCost.toFixed(2)}` : 'TBD'}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              disabled={!shippingInfo.address || !shippingInfo.rate || isProcessing}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}