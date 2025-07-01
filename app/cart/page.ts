import Link from "next/link";
import { useStore } from "../../lib/store";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center border-b pb-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-semibold">{item.product.name}</h2>
              <p className="text-gray-500">
                ${item.product.price.toFixed(2)} x{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                  className="w-16 border rounded p-1"
                />
              </p>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Total: ${total.toFixed(2)}</h2>
        <Link
          href="/checkout"
          className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 inline-block hover:bg-green-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}