import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shop All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}