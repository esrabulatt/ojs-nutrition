import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoStrip } from '../components/InfoStrip';
import { useUserStore } from '../store/userStore';

type Mode = 'giris' | 'uye';

const fieldClass =
  'w-full h-[42px] bg-[#f4f4f4] border border-[#ececec] px-3 text-[14px] text-gray-900 focus:outline-none focus:border-gray-400';

const labelClass = 'block text-[13px] text-black mb-1.5';

export default function AuthPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [mode, setMode] = useState<Mode>('giris');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setMessage('');
    setForm({ name: '', surname: '', email: '', password: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şimdilik gerçek bir giriş/kayıt yok: bilgiler tarayıcıda saklanıp Hesabım sayfası açılıyor
    const email = form.email.trim();
    const fallbackName = email.split('@')[0];
    setUser({
      name: mode === 'uye' ? form.name.trim() : fallbackName,
      surname: mode === 'uye' ? form.surname.trim() : '',
      phone: '',
      email,
    });
    navigate('/hesabim');
  };

  const tabClass = (active: boolean) =>
    `h-[46px] text-[16px] transition-colors cursor-pointer ${
      active
        ? 'bg-white text-[#2b2ba6] border-t border-x border-[#ececec]'
        : 'bg-[#f0f0f0] text-black border-b border-[#ececec] hover:bg-[#e8e8e8]'
    }`;

  return (
    <>
      <InfoStrip />

      <section className="px-4 pt-14 pb-32">
        <div className="mx-auto w-full max-w-[400px]">
          {/* Sekmeler */}
          <div className="grid grid-cols-2" role="tablist">
            <button type="button" role="tab" aria-selected={mode === 'giris'} onClick={() => switchMode('giris')} className={tabClass(mode === 'giris')}>
              Giriş Yap
            </button>
            <button type="button" role="tab" aria-selected={mode === 'uye'} onClick={() => switchMode('uye')} className={tabClass(mode === 'uye')}>
              Üye Ol
            </button>
          </div>

          {/* Kart */}
          <form onSubmit={handleSubmit} className="bg-white border border-t-0 border-[#ececec] px-8 pt-8 pb-8">
            {mode === 'uye' && (
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label htmlFor="name" className={labelClass}>*İsim</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="surname" className={labelClass}>*Soyad</label>
                  <input id="surname" name="surname" value={form.surname} onChange={handleChange} required className={fieldClass} />
                </div>
              </div>
            )}

            <label htmlFor="email" className={labelClass}>*E-Posta</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required className={fieldClass} />

            <label htmlFor="password" className={`${labelClass} mt-5`}>*Şifre</label>
            <input id="password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={mode === 'uye' ? 6 : undefined} className={fieldClass} />

            {mode === 'giris' && (
              <div className="mt-3 text-right">
                <button type="button" className="text-[12px] text-black underline cursor-pointer">
                  Şifremi Unuttum?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`w-full h-[46px] bg-black hover:bg-gray-800 text-white text-[15px] font-bold uppercase transition-colors ${
                mode === 'giris' ? 'mt-4' : 'mt-7'
              }`}
            >
              {mode === 'giris' ? 'GİRİŞ YAP' : 'ÜYE OL'}
            </button>

            {message && <p className="mt-3 text-center text-[13px] text-green-700">{message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
