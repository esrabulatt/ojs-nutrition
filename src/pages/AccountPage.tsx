import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfoStrip } from '../components/InfoStrip';
import { PhoneField } from '../components/PhoneField';
import { AddressesSection } from '../components/AddressesSection';
import { OrdersSection } from '../components/OrdersSection';
import { AccountSidebar, type SectionId } from '../components/AccountSidebar';
import { useUserStore, type User } from '../store/userStore';

const DEMO_USER: User = { name: 'Berkan', surname: 'Saraç', phone: '', email: 'iletisim@onlyjs.com' };

const fieldClass =
  'w-full h-12 bg-[#f4f4f4] border border-[#ececec] px-4 text-[14px] text-gray-800 focus:outline-none focus:border-gray-400';
const labelClass = 'block text-[14px] text-black mb-2';

function AccountInfoForm() {
  const { user, setUser } = useUserStore();
  const initial = user ?? DEMO_USER;

  const [form, setForm] = useState({ name: initial.name, surname: initial.surname, phone: initial.phone });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...initial, name: form.name.trim(), surname: form.surname.trim(), phone: form.phone });
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-[16px] font-bold text-black mb-4">Hesap Bilgilerim</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>*Ad</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="surname" className={labelClass}>*Soyad</label>
          <input id="surname" name="surname" value={form.surname} onChange={handleChange} required className={fieldClass} />
        </div>
      </div>

      <label htmlFor="phone" className={`${labelClass} mt-5`}>Telefon</label>
      <PhoneField value={form.phone} onChange={(v) => {
          setSaved(false);
          setForm((prev) => ({ ...prev, phone: v }));
        }} />

      <label htmlFor="email" className={`${labelClass} mt-5`}>*Email</label>
      <input
        id="email"
        value={initial.email}
        readOnly
        disabled
        className={`${fieldClass} !bg-[#e6e6e6] !border-[#cfcfcf] !text-gray-500 cursor-not-allowed`}
      />

      <div className="mt-4 flex items-center justify-end gap-4">
        {saved && <span className="text-[13px] text-green-700">Bilgileriniz kaydedildi.</span>}
        <button type="submit" className="h-[52px] px-6 bg-black hover:bg-gray-800 text-white text-[17px] font-bold transition-colors">
          Kaydet
        </button>
      </div>
    </form>
  );
}

export default function AccountPage() {
  const [params] = useSearchParams();
  const param = params.get('sekme');
  const section: SectionId = param === 'siparisler' || param === 'adresler' ? param : 'bilgiler';

  return (
    <>
      <InfoStrip />

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-28 grid grid-cols-1 md:grid-cols-[245px_1fr] gap-x-0 gap-y-8">
        <AccountSidebar active={section} />
        <div className="pt-1">
          {section === 'bilgiler' ? (
            <AccountInfoForm />
          ) : section === 'adresler' ? (
            <AddressesSection />
          ) : (
            <OrdersSection />
          )}
        </div>
      </section>
    </>
  );
}
