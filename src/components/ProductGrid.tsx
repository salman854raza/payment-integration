'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useStore } from '@/lib/store';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  const { searchQuery } = useStore();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {searchQuery ? `No products found for "${searchQuery}"` : 'No products available'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}