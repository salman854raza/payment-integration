import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import products from '@/data/products.json';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryTitles = {
  men: "Men's Clothing",
  women: "Women's Clothing",
  kids: "Kids' Clothing",
};

export function generateStaticParams() {
  return [
    { category: 'men' },
    { category: 'women' },
    { category: 'kids' },
  ];
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = params.category as keyof typeof categoryTitles;
  const title = categoryTitles[category];
  
  if (!title) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${title} - StyleHub`,
    description: `Shop premium ${title.toLowerCase()} at StyleHub. Find the perfect outfit for every occasion.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category as keyof typeof categoryTitles;
  const title = categoryTitles[category];
  
  if (!title) {
    notFound();
  }

  const categoryProducts = products.filter(product => product.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ProductGrid products={categoryProducts} title={title} />
    </div>
  );
}