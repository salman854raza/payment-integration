import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import products from '@/data/products.json';

export default function Home() {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductGrid products={featuredProducts} title="Featured Products" />
      </div>
    </div>
  );
}