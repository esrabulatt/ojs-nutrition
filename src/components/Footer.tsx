import { Link } from 'react-router-dom';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onSearch: (term: string) => void;
}

const CORPORATE_LINKS = [
  { label: 'İletişim', to: '/iletisim' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'Sıkça Sorulan Sorular', to: '/sss' },
  { label: 'KVKK' },
  { label: 'Çalışma İlkelerimiz' },
  { label: 'Satış Sözleşmesi' },
  { label: 'Garanti ve İade Koşulları' },
  { label: 'Gerçek Müşteri Yorumları' },
  { label: 'Blog' },
];

const CATEGORY_LINKS = [
  { label: 'Protein', category: 'protein' },
  { label: 'Spor Gıdaları', category: 'spor' },
  { label: 'Sağlık', category: 'saglik' },
  { label: 'Gıda', category: 'gida' },
  { label: 'Vitamin', category: 'vitamin' },
  { label: 'Aksesuar', category: 'aksesuar' },
  { label: 'Tüm Ürünler', category: 'all' },
  { label: 'Paketler', category: 'paket' },
  { label: 'Lansmana Özel Fırsatlar', category: 'all' },
];

const POPULAR_LINKS = [
  { label: 'Whey Protein', search: 'whey' },
  { label: 'Cream of Rice', search: 'cream of rice' },
  { label: 'Creatine', search: 'creatine' },
  { label: 'BCAA+', search: 'bcaa' },
  { label: 'Pre-Workout', search: 'pre-workout' },
  { label: 'Fitness Paketi', search: 'fitness' },
  { label: 'Collagen', search: 'collagen' },
  { label: 'Günlük Vitamin Paketi', search: 'vitamin' },
  { label: 'ZMA', search: 'zma' },
];

const linkClass =
  'block text-left text-[14px] leading-[28px] text-[#b5b5b5] hover:text-white transition-colors cursor-pointer';

export function Footer({ onSelectCategory, onSearch }: FooterProps) {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: '#000000', fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >

      <div className="max-w-6xl mx-auto px-4 pt-[30px] pb-16">
        <div className="flex items-center gap-2 leading-none h-[17px]">
          <span className="text-[#FFD43B] text-[17px] tracking-[0.12em]">★★★★★</span>
          <span className="text-[13px] tracking-[0.06em] text-gray-200 ml-1">(140.000+)</span>
        </div>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[501px_1fr] gap-6 lg:gap-0">
          <h2 className="mt-[9px] text-[24px] font-normal uppercase leading-[34.5px] tracking-[0.02em]">
            Laboratuvar testli ürünler
            <br />
            Aynı gün &amp; ücretsiz kargo
            <br />
            Memnuniyet garantisi
          </h2>
          <p className="text-[17px] font-light leading-[30.3px] text-gray-100 max-w-[385px]">
            200.000&apos;den fazla ürün yorumumuza dayanarak, ürünlerimizi seveceğinize eminiz. Eğer
            herhangi bir sebeple memnun kalmazsan, bizimle iletişime geçtiğinde çözüme kavuşturacağız.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-[33px] pb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[440px_435px_1fr] gap-y-8 gap-x-6 lg:gap-x-0">
          <div>
            <Link
              to="/"
              className="logo-font text-white text-[20px] leading-[0.95] font-black italic uppercase tracking-[0.08em] inline-block mb-4"
            >
              <span className="block">OJS</span>
              <span className="block">NUTRITION</span>
            </Link>
            <ul>
              {CORPORATE_LINKS.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  ) : (
                    <span className={linkClass}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:mt-[15px]">
            <h3 className="text-[19px] font-semibold leading-7 mb-1">Kategoriler</h3>
            <ul>
              {CATEGORY_LINKS.map((item) => (
                <li key={item.label}>
                  <button type="button" onClick={() => onSelectCategory(item.category)} className={linkClass}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:mt-[15px]">
            <h3 className="text-[19px] font-semibold leading-7 mb-1">Popüler Ürünler</h3>
            <ul>
              {POPULAR_LINKS.map((item) => (
                <li key={item.label}>
                  <button type="button" onClick={() => onSearch(item.search)} className={linkClass}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-[80px] lg:mt-[90px] text-[12px] leading-4 text-[#9a9a9a]">
          Copyright © - Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}
