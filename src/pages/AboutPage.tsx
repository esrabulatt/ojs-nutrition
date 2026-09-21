import { useState } from 'react';
import { InfoStrip } from '../components/InfoStrip';

interface Cert {
  id: number;
  top: string;
  main: string;
  bottom: string;
  color: string;
}

const CERTS: Cert[] = [
  { id: 1, top: 'GIDA GÜVENLİĞİ', main: 'ISO', bottom: '22000:2018', color: '#1f3a6e' },
  { id: 2, top: 'HELAL', main: 'HELAL', bottom: 'SERTİFİKA', color: '#c8242b' },
  { id: 3, top: 'YÖNETİM SİSTEMİ', main: 'ISO', bottom: '9001:2015', color: '#a51f26' },
  { id: 4, top: 'GOOD MANUFACTURING', main: 'GMP', bottom: 'PRACTICE', color: '#4a7f36' },
  { id: 5, top: 'CERTIFIED', main: 'ISO', bottom: '14001:2015', color: '#1f3a6e' },
  { id: 6, top: 'GMP', main: 'GMP', bottom: 'CERTIFIED', color: '#2a5fa8' },
];

function CertBadge({ cert }: { cert: Cert }) {
  return (
    <svg viewBox="0 0 100 100" className="w-[92px] h-[92px]" role="img" aria-label={`${cert.main} sertifikası`}>
      <circle cx="50" cy="50" r="48" fill={cert.color} />
      <circle cx="50" cy="50" r="42" fill="#fff" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={cert.color} strokeWidth="1" />
      <text x="50" y="30" textAnchor="middle" fontSize="6" fontWeight="700" fill={cert.color}>
        {cert.top}
      </text>
      <text x="50" y="57" textAnchor="middle" fontSize="20" fontWeight="900" fill={cert.color}>
        {cert.main}
      </text>
      <text x="50" y="72" textAnchor="middle" fontSize="7" fontWeight="700" fill={cert.color}>
        {cert.bottom}
      </text>
    </svg>
  );
}


interface AboutReview {
  name: string;
  stars: number;
  title: string;
  text: string;
  product: string;
  date: string;
}

const REVIEWS: AboutReview[] = [
  { name: 'Mustafa Ü.', stars: 5, title: 'L carnitine', text: 'Gayet şeffaf ve güzel kargoyla geldi çok memnun kaldım', product: 'L-CARNITINE', date: '06/05/24' },
  { name: 'Erol Ş.', stars: 5, title: 'Muhteşem tad', text: 'Tadı çok iyi. Faydasını da gördüm', product: 'CREATINE LIMITED EDITION', date: '06/05/24' },
  { name: 'Erol Ş.', stars: 5, title: 'Muhteşem', text: 'Vitaminlerden çok memnunum tekrar sipariş vereceğim', product: 'GÜNLÜK VİTAMİN PAKETİ', date: '06/05/24' },
  {
    name: 'BAHADIR Y.',
    stars: 4,
    title: 'İşe yarar',
    text: 'Antrenman öncesi isteksizliği, yorgunluğu gideriyor ve sağlam bir antrenman yapmam konusunda istek sağlıyor. Müthiş terleme, benim biraz kulaklarım yandı ve alnım kesindi ama bunun etkilerinin normal olduğunu okudum. Bilmiyorum.',
    product: 'PRE-WORKOUT SUPREME',
    date: '06/05/24',
  },
  { name: 'Yusuf A.', stars: 5, title: 'Süper', text: 'Harika', product: 'WHEY PROTEIN LANSMAN', date: '06/05/24' },
  { name: 'Umut E.', stars: 5, title: 'Harika', text: 'Harika', product: 'BCAA+ WORKOUT', date: '06/05/24' },
  { name: 'Umut E.', stars: 5, title: 'Harika', text: 'Öneririm', product: 'GÜNLÜK VİTAMİN PAKETİ', date: '06/05/24' },
  { name: 'Muhammet İ.', stars: 5, title: 'Kalite', text: 'Süper', product: 'PRE-WORKOUT SUPREME LANSMAN', date: '06/05/24' },
  { name: 'Serhat A.', stars: 5, title: 'süper', text: 'dehşet', product: 'PRE-WORKOUT SUPREME LANSMAN', date: '06/05/24' },
  {
    name: 'Ertuğrul İ.',
    stars: 5,
    title: 'Pump olarak gerçekten başarılı',
    text: 'Tadı limonlu şekere benziyor, baymaz. Etki olarak güzel pump veriyor. Suyun içine atınca çok beklemeden tüketin, yoksa içerisindeki tuz çözünmeye başlayınca tadı ekşimsi bir limona bırakıyor.',
    product: 'PRE-WORKOUT SUPREME',
    date: '06/05/24',
  },
];

const PAGE_COUNT = 9;
const TOTAL_REVIEWS = '196.920';

function Stars({ count, className = '' }: { count: number; className?: string }) {
  return (
    <span className={`leading-none tracking-wide ${className}`} aria-label={`${count} yıldız`}>
      <span className="text-[#F5C842]">{'★'.repeat(count)}</span>
      <span className="text-[#F5C842]/40">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

export default function AboutPage() {
  const [page, setPage] = useState(1);

  const shift = (page - 1) % REVIEWS.length;
  const pageReviews = [...REVIEWS.slice(shift), ...REVIEWS.slice(0, shift)];

  const goTo = (n: number) => setPage(Math.min(PAGE_COUNT, Math.max(1, n)));

  return (
    <>
      <InfoStrip />

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-24">
        <h1 className="text-[32px] font-bold leading-tight text-black">
          Sağlıklı ve Fit Yaşamayı Zevkli ve Kolay Hale Getirmek İçin Varız
        </h1>

        <div className="mt-5 text-[15px] leading-8 text-black">
          <p className="mb-6">
            2016 yılından beri sporcu gıdaları, takviye edici gıdalar ve fonksiyonel gıdalar üreten bir firma olarak;
            müşterilerimize en kaliteli, lezzetli, tüketilmesi kolay ürünleri sunuyoruz.
          </p>
          <p className="mb-6">
            Müşteri memnuniyeti ve sağlığı her zaman önceliğimiz olmuştur. Ürünlerimizde, yüksek kalite standartlarına
            bağlı olarak, sporcuların ve sağlıklı yaşam tutkunlarının ihtiyaçlarına yönelik besleyici çözümler
            sunuyoruz. Ürün yelpazemizdeki protein tozları, aminoasitler, vitamin ve mineral takviyeleri ile spor
            performansınızı desteklemek için ideal besin değerlerini sunuyoruz.
          </p>
          <p className="mb-4">
            Sizin için sadece en iyisinin yeterli olduğunu biliyoruz. Bu nedenle, inovasyon, kalite, sağlık ve güvenlik
            ilkelerimizi korurken, sürekli olarak ürünlerimizi geliştirmeye ve yenilikçi beslenme çözümleri sunmaya
            devam ediyoruz.
          </p>
          <p className="mb-2">
            Sporcu gıdaları konusunda lider bir marka olarak, sizin sağlığınıza ve performansınıza değer veriyoruz. Biz
            de spor performansınızı en üst seviyeye çıkarmak ve sağlıklı yaşam tarzınızı desteklemek
          </p>
          <p>
            istiyorsanız, bize katılın ve en besleyici çözümlerimizle tanışın. Sağlıklı ve aktif bir yaşam için biz her
            zaman yanınızdayız.
          </p>
        </div>

        <h2 className="mt-6 text-[30px] font-bold leading-tight text-black">1.000.000+ den Fazla Mutlu Müşteri</h2>
        <p className="mt-2 text-[15px] leading-8 text-black">
          Sanatçılardan profesyonel sporculara, doktorlardan öğrencilere hayatın her alanında sağlıklı yaşamı ve
          beslenmeyi hedefleyen 1.000.000&apos;den fazla kişiye ulaştık.
        </p>
    
        <h2 className="mt-8 text-[28px] font-bold leading-tight text-black">Sertifikalarımız</h2>
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-3">
          {CERTS.map((c) => (
            <CertBadge key={c.id} cert={c} />
          ))}
        </div>

        <div className="mt-24 border-y border-[#e6e6e6] py-3 flex items-center gap-3">
          <Stars count={5} className="text-[26px]" />
          <span className="text-[12px] text-[#2323a8]">{TOTAL_REVIEWS} Yorum</span>
        </div>

        <button
          type="button"
          className="mt-4 rounded-full px-6 py-2.5 text-[12px] font-bold uppercase text-white bg-gradient-to-r from-[#3a5bbf] to-[#2323a8]"
        >
          Ürün İncelemeleri
        </button>

        <div className="mt-5 space-y-4">
          {pageReviews.map((r, i) => (
            <article key={`${page}-${i}`} className="rounded-[28px] bg-[#f6f6f6] px-8 pt-6 pb-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Stars count={r.stars} className="text-[24px]" />
                  <span className="text-[15px] font-bold text-black">{r.name}</span>
                  <span className="rounded-full bg-[#c9e4cf] px-3 py-1 text-[9px] font-semibold uppercase text-[#2f7a3f]">
                    Doğrulanmış Müşteri
                  </span>
                </div>
                <time className="text-[14px] font-bold text-black md:mr-10">{r.date}</time>
              </div>
              <h3 className="mt-2 text-[19px] font-bold text-black">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-gray-700">{r.text}</p>
              <p className="mt-4 md:pl-[150px] text-[9px] uppercase text-gray-800">Hakkında {r.product}</p>
            </article>
          ))}
        </div>
        
        <nav className="mt-8 flex items-center justify-center gap-3 text-[13px] text-[#2323a8]" aria-label="Yorum sayfaları">
          <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className="px-1 cursor-pointer disabled:opacity-30 disabled:cursor-default" aria-label="Önceki sayfa">
            ‹
          </button>
          {Array.from({ length: PAGE_COUNT }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goTo(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`px-1 cursor-pointer ${n === page ? 'font-bold text-black' : 'hover:underline'}`}
            >
              {n}
            </button>
          ))}
          <button type="button" onClick={() => goTo(page + 1)} disabled={page === PAGE_COUNT} className="px-1 cursor-pointer disabled:opacity-30 disabled:cursor-default" aria-label="Sonraki sayfa">
            ›
          </button>
        </nav>
      </div>
    </>
  );
}
