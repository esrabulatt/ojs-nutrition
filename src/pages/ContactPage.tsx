import { useState } from 'react';

const fieldClass =
  'w-full bg-[#f4f4f4] border border-[#ececec] px-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 rounded-sm';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSent(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSent(true);
    setLoading(false);
    setFormData({ name: '', surname: '', email: '', message: '' });
  };

  return (
    <section className="max-w-3xl mx-auto px-4 pt-20 pb-24">
      <h1 className="text-center text-[40px] font-bold leading-none text-black">Bize Ulaşın</h1>

      <form onSubmit={handleSubmit} className="mt-8 mx-auto w-full max-w-[560px]">
        <p className="text-[13px] text-black mb-7">
          Bize aşağıdaki iletişim formu üzerinden ulaşabilirsiniz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="name"
            aria-label="İsim"
            value={formData.name}
            onChange={handleChange}
            placeholder="İsim *"
            required
            className={`${fieldClass} h-11`}
          />
          <input
            name="surname"
            aria-label="Soyad"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Soyad"
            className={`${fieldClass} h-11`}
          />
        </div>

        <input
          type="email"
          name="email"
          aria-label="E-Posta"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-Posta *"
          required
          className={`${fieldClass} h-11 mt-3`}
        />

        <textarea
          name="message"
          aria-label="Mesaj"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mesajınız *"
          required
          className={`${fieldClass} h-[120px] py-2 mt-3 resize-none`}
        />

        <div className="mt-5 flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-8 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white text-[15px] font-bold uppercase transition-colors"
          >
            {loading ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
          </button>
          {sent && (
            <p className="mt-3 text-[13px] text-green-700 font-medium">
              Mesajınız başarıyla alındı, en kısa sürede dönüş yapacağız.
            </p>
          )}
        </div>
      </form>

      <div className="mt-10 text-center text-[12px] leading-6 text-gray-700 space-y-1">
        <p>
          *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00&apos;a kadar verilen siparişler için geçerlidir.
        </p>
        <p>Siparişler kargoya verilince e-posta ve SMS ile bilgilendirme yapılır.</p>
        <p className="pt-3">
          Telefon ile <strong className="text-black">0850 303 29 89</strong> numarasını arayarak bizlere sesli mesaj bırakabilirsiniz.
          Sesli mesajlarınıza hafta içi <strong className="text-black">09:00 - 17:00</strong> arasında dönüş sağlanmaktadır.
        </p>
      </div>
    </section>
  );
}