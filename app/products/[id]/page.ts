import { products } from "../../../data/products";
import Image from "next/image";
import { useStore } from "../../../lib/store";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-500 mt-2">${product.price.toFixed(2)}</p>
        <p className="mt-4">{product.description}</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className={`py-2 px-6 rounded-lg ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}