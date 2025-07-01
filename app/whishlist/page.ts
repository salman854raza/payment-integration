import { useStore } from "../../lib/store";
import ProductCard from "../../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) return <p>Your wishlist is empty</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}