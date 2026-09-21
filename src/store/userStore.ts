import { create } from 'zustand';
import { useCartStore } from './cartStore';

const STORAGE_KEY = 'ojs-user-v1';

export interface User {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

function load(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function save(user: User | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* localStorage kullanılamıyorsa sessizce geç */
  }
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

// Giriş yapmış kullanıcı (şimdilik sadece tarayıcıda saklanır, gerçek bir sunucu yok)
export const useUserStore = create<UserState>((set) => ({
  user: load(),
  setUser: (user) => {
    save(user);
    set({ user });
  },
  logout: () => {
    save(null);
    // Çıkış yapınca sepet ve ödemedeki adres/kargo seçimi de sıfırlanır (yeni kullanıcı boş başlar)
    useCartStore.getState().clearCart();
    try {
      localStorage.removeItem('ojs-checkout-v1');
    } catch {
      /* localStorage kullanılamıyorsa sessizce geç */
    }
    set({ user: null });
  },
}));
