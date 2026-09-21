import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS } from '../data/products';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity: number, selectedFlavor: string, selectedSize?: string) => void;
  updateQuantity: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, selectedFlavor, selectedSize) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedFlavor === selectedFlavor &&
              item.selectedSize === selectedSize
          );

          const items =
            existingIndex > -1
              ? state.items.map((item, i) =>
                  i === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
                )
              : [...state.items, { product, quantity, selectedFlavor, selectedSize }];

          return { items, isOpen: true };
        }),

      updateQuantity: (index, delta) =>
        set((state) => ({
          items: state.items
            .map((item, i) => (i === index ? { ...item, quantity: item.quantity + delta } : item))
            .filter((item) => item.quantity > 0),
        })),

      removeItem: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      // Sepet tarayıcıda saklanır; sayfa yenilense de ürünler kalır
      name: 'ojs-cart-v1',
      version: 1,
      // Sadece ürünler saklanır; çekmecenin açık/kapalı durumu saklanmaz
      partialize: (state) => ({ items: state.items }),
      // Kayıtlı ürünleri güncel ürün verisiyle eşle (görsel/fiyat değişmiş olabilir, silinen ürün sepette kalmasın)
      merge: (persisted, current) => {
        const saved = (persisted as { items?: CartItem[] } | undefined)?.items;
        if (!Array.isArray(saved)) return current;
        const items = saved
          .map((item) => {
            const fresh = PRODUCTS.find((p) => p.id === item.product?.id);
            return fresh && item.quantity > 0 ? { ...item, product: fresh } : null;
          })
          .filter((item): item is CartItem => item !== null);
        return { ...current, items };
      },
    }
  )
);
