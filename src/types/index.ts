export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'kids';
  price: number;
  description: string;
  image: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShippingRate {
  service_code: string;
  service_name: string;
  rate_id: string;
  shipping_amount: {
    amount: string;
    currency: string;
  };
  delivery_days: number;
  carrier_friendly_name: string;
}

export interface ShippingRateResponse {
  rates: ShippingRate[];
}