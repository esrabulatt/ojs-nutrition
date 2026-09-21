import { create } from 'zustand';

const STORAGE_KEY = 'ojs-addresses-v1';

export interface Address {
  id: string;
  title: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

function load(): Address[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Address[]) : [];
  } catch {
    return [];
  }
}

function save(list: Address[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* localStorage kullanılamıyorsa sessizce geç */
  }
}

interface AddressState {
  addresses: Address[];
  /** id varsa günceller, yoksa yeni adres ekler */
  saveAddress: (data: Omit<Address, 'id'> & { id?: string }) => string;
  removeAddress: (id: string) => void;
}

// Kayıtlı adresler (şimdilik sadece tarayıcıda saklanır)
export const useAddressStore = create<AddressState>((set) => ({
  addresses: load(),
  saveAddress: (data) => {
    const id = data.id ?? `${Date.now()}`;
    set((state) => {
      const record = { ...data, id } as Address;
      const addresses = data.id
        ? state.addresses.map((a) => (a.id === id ? record : a))
        : [...state.addresses, record];
      save(addresses);
      return { addresses };
    });
    return id;
  },
  removeAddress: (id) =>
    set((state) => {
      const addresses = state.addresses.filter((a) => a.id !== id);
      save(addresses);
      return { addresses };
    }),
}));
