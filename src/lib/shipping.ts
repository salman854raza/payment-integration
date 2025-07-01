import axios from 'axios';
import { ShippingAddress, ShippingRateResponse } from '@/types';

export async function getShippingRates(
  address: ShippingAddress,
  totalWeight: number = 1
): Promise<ShippingRateResponse> {
  try {
    const response = await axios.post('/api/shipping-rates', {
      address,
      weight: totalWeight,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    throw new Error('Unable to fetch shipping rates. Please try again.');
  }
}