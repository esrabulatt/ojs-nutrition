import { useState } from 'react';
import { InfoStrip } from '../components/InfoStrip';

interface FAQItem {
  question: string;
  answer: string;
}

type TabId = 'genel' | 'urunler' | 'kargo';

const TABS: { id: TabId; label: string; heading: string }[] = [
  { id: 'genel', label: 'Genel', heading: 'GENEL' },
  { id: 'urunler', label: 'Ürünler', heading: 'ÜRÜNLER' },
  { id: 'kargo', label: 'Kargo', heading: 'KARGO' },
];
const FAQ_DATA: Record<TabId, FAQItem[]> = {
  genel: [
    {
      question: 'OJS Nutrition ürünleri nerede üretiliyor?',
      answer: 'Tüm ürünlerimiz Türkiye’de, kalite standartlarına uygun tesislerde üretilmektedir.',
    },
    {
      question: 'Ürünleriniz orijinal ve güvenilir mi?',
      answer: 'Evet. Tüm ürünlerimiz doğrudan üreticiden temin edilir ve orijinaldir.',
    },
    {
      question: 'Sipariş verirken üye olmak zorunda mıyım?',
      answer: 'Hayır, üye olmadan da misafir olarak sipariş verebilirsiniz.',
    },
    {
      question: 'Siparişimi nasıl takip edebilirim?',
      answer: 'Siparişiniz kargoya verildiğinde e-posta ve SMS ile takip numarası gönderilir.',
    },
    {
      question: 'Siparişimi iptal edebilir miyim?',
      answer: 'Kargoya verilmeden önce müşteri hizmetlerimizle iletişime geçerek iptal edebilirsiniz.',
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz.',
    },
    {
      question: 'Taksit imkanı var mı?',
      answer: 'Anlaşmalı bankaların kredi kartlarına ödeme adımında taksit seçenekleri sunulmaktadır.',
    },
    {
      question: 'İade ve değişim koşullarınız nelerdir?',
      answer: 'Açılmamış ve kullanılmamış ürünleri teslimattan itibaren 14 gün içinde iade edebilirsiniz.',
    },
    {
      question: 'İade ettiğim ürünün ücreti ne zaman hesabıma yatar?',
      answer: 'İade onaylandıktan sonra ödeme, kullandığınız yönteme 3-7 iş günü içinde iade edilir.',
    },
    {
      question: 'Ürünlerin son kullanma tarihi ne kadardır?',
      answer: 'Ürünlerimiz güncel üretim tarihlidir ve genellikle 18-24 ay raf ömrüne sahiptir.',
    },
    {
      question: 'Fatura alabilir miyim?',
      answer: 'Evet, siparişinizle birlikte e-fatura düzenlenir ve e-posta adresinize gönderilir.',
    },
    {
      question: 'Kampanya ve indirimlerden nasıl haberdar olabilirim?',
      answer: 'Sosyal medya hesaplarımızı ve e-bültenimizi takip ederek tüm kampanyalardan haberdar olabilirsiniz.',
    },
    {
      question: 'Toplu alımlar için özel fiyat var mı?',
      answer: 'Toplu alımlar için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
    },
    {
      question: 'Müşteri hizmetlerine nasıl ulaşabilirim?',
      answer: 'Aşağıdaki iletişim formunu doldurabilir veya 0850 303 29 89 numarasını arayabilirsiniz.',
    },
  ],
  urunler: [
    {
      question: 'Whey protein ne zaman kullanılmalıdır?',
      answer: 'Antrenman sonrası ya da gün içinde protein ihtiyacınızı tamamlamak için kullanabilirsiniz.',
    },
    {
      question: 'Ürünleriniz helal sertifikalı mı?',
      answer: 'Ürün sayfalarında ilgili sertifika bilgileri yer almaktadır.',
    },
    {
      question: 'Ürünlerde alerjen madde var mı?',
      answer: 'Alerjen bilgileri her ürünün etiketinde ve ürün sayfasında belirtilmiştir.',
    },
    {
      question: 'Ürünü nasıl saklamalıyım?',
      answer: 'Serin ve kuru bir yerde, doğrudan güneş ışığından uzakta, kapağı sıkıca kapalı saklayınız.',
    },
  ],
  kargo: [
    {
      question: 'Siparişim ne zaman kargoya verilir?',
      answer: 'Hafta içi 16:00, Cumartesi 11:00’e kadar verilen siparişler aynı gün kargoya teslim edilir.',
    },
    {
      question: 'Kargo ücreti ne kadar?',
      answer: '100 TL ve üzeri siparişlerde kargo ücretsizdir.',
    },
    {
      question: 'Teslimat kaç günde yapılır?',
      answer: 'Siparişler genellikle 1-3 iş günü içinde teslim edilir.',
    },
    {
      question: 'Hangi kargo firmasıyla çalışıyorsunuz?',
      answer: 'Anlaşmalı kargo firmalarımızla gönderim yapılmaktadır; bilgi SMS ile iletilir.',
    },
  ],
};

const fieldClass =
  'w-full bg-[#f4f4f4] border border-[#ececec] px-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400';

function AccordionRow({ item, open, onToggle }: { item: FAQItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-4 py-[14px] text-left cursor-pointer"
      >
        <span className="text-[14px] font-bold text-black leading-snug">{item.question}</span>
        <span className="shrink-0 w-[18px] h-[18px] border border-gray-400 text-gray-600 flex items-center justify-center text-[14px] leading-none">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <p className="px-4 pb-4 -mt-1 text-[13px] leading-6 text-gray-600">{item.answer}</p>}
    </div>
  );
}

export default function FAQPage() {
  const [tab, setTab] = useState<TabId>('genel');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const current = TABS.find((t) => t.id === tab)!;
  const items = FAQ_DATA[tab];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSent(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', surname: '', email: '', message: '' });
  };

  return (
    <>
      <InfoStrip />

      <section className="max-w-4xl mx-auto px-4 pt-10 pb-20">
        <div className="flex gap-2 border-b border-gray-200 pb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setOpenIndex(null);
              }}
              className={`h-10 px-6 text-[14px] font-semibold transition-colors cursor-pointer ${
                tab === t.id ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black hover:bg-[#e4e4e4]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-8 mb-3">
          <span className="w-6 h-6 rounded bg-[#2f6fed] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="5" width="16" height="14" rx="2" />
              <path d="M8 10h8M8 14h5" />
            </svg>
          </span>
          <h2 className="text-[15px] font-bold tracking-wide text-black">{current.heading}</h2>
        </div>
        <div className="bg-[#efefef] p-3 flex flex-col gap-2">
          {items.map((item, i) => (
            <AccordionRow
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-14 w-full max-w-[400px]">
          <p className="text-[13px] text-black mb-5">Bize aşağıdaki iletişim formundan ulaşabilirsiniz.</p>

          <div className="grid grid-cols-2 gap-3">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="İsim *" required className={`${fieldClass} h-11`} />
            <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Soyad" className={`${fieldClass} h-11`} />
          </div>

          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-Posta" className={`${fieldClass} h-11 mt-3`} />

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mesaj" className={`${fieldClass} h-[120px] py-2 mt-3 resize-none`} />

          <div className="mt-5 flex flex-col items-center">
            <button type="submit" className="h-11 px-8 bg-black hover:bg-gray-800 text-white text-[15px] font-bold uppercase transition-colors">
              GÖNDER
            </button>
            {sent && <p className="mt-3 text-[13px] text-green-700">Mesajınız alındı, teşekkür ederiz.</p>}
          </div>
        </form>
      </section>
    </>
  );
}
