'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShippingAddress, ShippingRate } from '@/types';
import { getShippingRates } from '@/lib/shipping';

interface ShippingFormProps {
  onShippingSelect: (address: ShippingAddress, rate: ShippingRate) => void;
  totalWeight?: number;
}

export default function ShippingForm({ onShippingSelect, totalWeight = 1 }: ShippingFormProps) {
  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleGetRates = async () => {
    if (!address.address || !address.city || !address.state || !address.zipCode) {
      setError('Please fill in all required address fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await getShippingRates(address, totalWeight);
      setShippingRates(response.rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get shipping rates');
    } finally {
      setLoading(false);
    }
  };

  const handleRateSelect = (rate: ShippingRate) => {
    setSelectedRate(rate);
    onShippingSelect(address, rate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={address.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={address.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={address.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={address.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={address.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={address.state}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              value={address.zipCode}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={address.country}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="US">United States</option>
            </select>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGetRates}
          disabled={loading}
          className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Getting Rates...' : 'Get Shipping Rates'}
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {shippingRates.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Select Shipping Method</h4>
          <div className="space-y-3">
            {shippingRates.map((rate) => (
              <motion.div
                key={rate.rate_id}
                whileHover={{ scale: 1.01 }}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedRate?.rate_id === rate.rate_id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleRateSelect(rate)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{rate.service_name}</p>
                    <p className="text-sm text-gray-500">{rate.carrier_friendly_name}</p>
                    <p className="text-sm text-gray-500">
                      Delivery: {rate.delivery_days} business days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${parseFloat(rate.shipping_amount.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}