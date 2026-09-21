import { create } from 'zustand';

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
    set({ user: null });
  },
}));
