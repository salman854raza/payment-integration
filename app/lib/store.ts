import create from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Store {
  cart: { product: Product; quantity: number }[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === id ? { ...item, quantity } : item
          ),
        })),
      addToWishlist: (product) =>
        set((state) => ({
          wishlist: state.wishlist.some((item) => item.id === product.id)
            ? state.wishlist
            : [...state.wishlist, product],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "clothing-store" }
  )
);