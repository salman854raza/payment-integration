import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <>
      <div className="bg-blue-100 p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Clothing Store</h1>
        <p className="text-lg">Discover the latest fashion trends!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}