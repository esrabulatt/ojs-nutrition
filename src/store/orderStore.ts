import { create } from 'zustand';
import { ORDERS, type Order } from '../data/orders';

const STORAGE_KEY = 'ojs-orders-v1';

function load(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

interface OrderState {
  /** Ödeme ekranından oluşturulan siparişler (en yeni başta) */
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: load(),
  addOrder: (order) =>
    set((state) => {
      const orders = [order, ...state.orders];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch {
        /* localStorage kullanılamıyorsa sessizce geç */
      }
      return { orders };
    }),
}));

// Yeni verilen siparişler + örnek (demo) sipariş
export function useAllOrders(): Order[] {
  const own = useOrderStore((s) => s.orders);
  return [...own, ...ORDERS];
}
