import { create } from 'zustand';

const STORAGE_KEY = 'ojs-recent-products-v2';

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

interface RecentState {
  ids: string[];
  add: (id: string) => void;
}

// Son görüntülenen ürünler (tarayıcıda saklanır)
export const useRecentStore = create<RecentState>((set) => ({
  ids: load(),
  add: (id) =>
    set((state) => {
      const ids = [id, ...state.ids.filter((x) => x !== id)].slice(0, 12);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      } catch {
        /* localStorage kullanılamıyorsa sessizce geç */
      }
      return { ids };
    }),
}));
