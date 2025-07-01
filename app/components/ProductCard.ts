import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/store";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={300}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-lg text-gray-500">${product.price.toFixed(2)}</p>
      </Link>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => addToWishlist(product)}
          className={`py-2 px-4 rounded-lg ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}