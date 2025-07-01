import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateCartQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product: Product, selectedSize: string) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.selectedSize === selectedSize
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { product, quantity: 1, selectedSize }],
          };
        });
      },
      removeFromCart: (productId: string, selectedSize: string) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
          ),
        }));
      },
      updateCartQuantity: (productId: string, selectedSize: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedSize);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartItemsCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist state
      wishlist: [],
      addToWishlist: (product: Product) => {
        set((state) => {
          if (state.wishlist.some((item) => item.id === product.id)) {
            return state;
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },
      removeFromWishlist: (productId: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }));
      },
      isInWishlist: (productId: string) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === productId);
      },

      // Search state
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'clothing-store-storage',
    }
  )
);