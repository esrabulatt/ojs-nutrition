import { useState } from 'react';
import { PhoneField } from './PhoneField';
import { useAddressStore, type Address } from '../store/addressStore';
import { useUserStore } from '../store/userStore';

const fieldClass =
  'w-full h-12 bg-[#f4f4f4] border border-[#ececec] px-4 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400';
const labelClass = 'block text-[14px] text-black mb-2';

type FormData = Omit<Address, 'id'>;

const EMPTY: FormData = { title: '', name: '', surname: '', address: '', city: '', district: '', phone: '' };

export function AddressForm({
  editing,
  isFirst,
  onDone,
  onCancel,
}: {
  editing: Address | null;
  isFirst: boolean;
  onDone: (id: string) => void;
  onCancel: () => void;
}) {
  const user = useUserStore((s) => s.user);
  const saveAddress = useAddressStore((s) => s.saveAddress);

  const [form, setForm] = useState<FormData>(
    editing ?? { ...EMPTY, name: user?.name ?? '', surname: user?.surname ?? '', phone: user?.phone ?? '' }
  );

  const set = (key: keyof FormData, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.name as keyof FormData, e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = saveAddress({
      ...(editing ? { id: editing.id } : {}),
      title: form.title.trim(),
      name: form.name.trim(),
      surname: form.surname.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      district: form.district.trim(),
      phone: form.phone,
    });
    onDone(id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-[16px] font-bold text-black mb-4">{editing ? 'Adres Düzenle' : 'Adres Oluştur'}</h2>

      {isFirst && (
        <div className="mb-8 border border-[#6f69b8] bg-[#e9e7f6] px-4 py-3.5 text-[13px] text-gray-800">
          Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres oluşturunuz.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>*Adres Başlığı</label>
          <input id="title" name="title" value={form.title} onChange={onInput} required placeholder="ev, iş vb..." className={fieldClass} />
        </div>
        <div className="hidden sm:block" />

        <div>
          <label htmlFor="name" className={labelClass}>*Ad</label>
          <input id="name" name="name" value={form.name} onChange={onInput} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="surname" className={labelClass}>*Soyad</label>
          <input id="surname" name="surname" value={form.surname} onChange={onInput} required className={fieldClass} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClass}>*Adres</label>
          <input id="address" name="address" value={form.address} onChange={onInput} required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>*Şehir</label>
          <input id="city" name="city" value={form.city} onChange={onInput} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="district" className={labelClass}>*İlçe</label>
          <input id="district" name="district" value={form.district} onChange={onInput} required className={fieldClass} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className={labelClass}>*Telefon</label>
          <PhoneField value={form.phone} onChange={(v) => set('phone', v)} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        {!isFirst && (
          <button type="button" onClick={onCancel} className="h-[52px] px-6 text-[15px] text-gray-700 underline cursor-pointer">
            Vazgeç
          </button>
        )}
        <button type="submit" className="h-[52px] px-6 bg-black hover:bg-gray-800 text-white text-[17px] font-bold transition-colors cursor-pointer">
          Kaydet
        </button>
      </div>
    </form>
  );
}

/* Adres kartı */

function AddressCard({ address, onEdit }: { address: Address; onEdit: () => void }) {
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const [confirming, setConfirming] = useState(false);

  return (
    <article className="flex flex-col min-h-[205px] border border-black rounded-[4px] bg-white px-4 pt-4 pb-4">
      <h3 className="text-[13px] text-black">{address.title}</h3>

      <p className="mt-6 flex-1 text-[14px] leading-6 text-black">
        {address.address}, {address.district}, {address.city}, Türkiye
      </p>

      <div className="mt-4 flex items-center justify-between">
        {confirming ? (
          <span className="flex items-center gap-2 text-[12px] text-black">
            Silinsin mi?
            <button type="button" onClick={() => removeAddress(address.id)} className="font-bold underline cursor-pointer">
              Evet
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="underline cursor-pointer">
              Hayır
            </button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="flex items-center gap-2 text-[13px] text-black cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
            </svg>
            Sil
          </button>
        )}
        <button type="button" onClick={onEdit} className="text-[12px] text-black hover:underline cursor-pointer">
          Adresi Düzenle
        </button>
      </div>
    </article>
  );
}


export function AddressesSection() {
  const addresses = useAddressStore((s) => s.addresses);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);


  if (addresses.length === 0 || formOpen) {
    const editing = addresses.find((a) => a.id === editingId) ?? null;
    return (
      <AddressForm
        key={editingId ?? 'new'}
        editing={editing}
        isFirst={addresses.length === 0}
        onDone={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
        onCancel={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-bold text-black">Adreslerim ({addresses.length})</h2>
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 text-[13px] text-black cursor-pointer hover:underline"
        >
          <span className="text-[22px] leading-none">+</span>
          Yeni adres ekle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((a) => (
          <AddressCard
            key={a.id}
            address={a}
            onEdit={() => {
              setEditingId(a.id);
              setFormOpen(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
