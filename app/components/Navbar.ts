import Link from "next/link";
import { useStore } from "../lib/store";

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Clothing Store
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/wishlist" className="hover:underline">
              Wishlist ({wishlist.length})
            </Link>
          </li>
          <li>
            <Link href="/cart" className=".hover:underline">
              Cart ({cartCount})
            </Link>
          </li>
          <li>
            <Link href="/checkout" className="hover:underline">
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}