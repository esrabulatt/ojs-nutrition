import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { normalizeText } from '../utils/normalizeText';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'TÜM ÜRÜNLER',
  protein: 'PROTEİN',
  spor: 'SPOR GIDALARI',
  saglik: 'SAĞLIK',
  gida: 'GIDA',
  vitamin: 'VİTAMİN',
};

const CATEGORY_INTRO: Record<string, { lead: string; bold: string; rest: string }> = {
  protein: {
    lead: 'Vücudun tüm fonksiyonlarını sağlıklı bir şekilde yerine getirmesini sağlayan temel yapı taşlarından biri proteindir. ',
    bold: 'Protein',
    rest: ' kısaca, bir veya daha fazla amino asit artık zincirinden oluşan büyük moleküllerdir. Kas, cilt, saç ve tırnak gibi dokuların yapımında ve onarımında görev alır. Düzenli antrenman yapanların protein ihtiyacı, hareketsiz kişilere göre daha yüksektir.',
  },
  spor: {
    lead: 'Antrenman öncesinde, sırasında ve sonrasında performansı ve toparlanmayı desteklemek için ',
    bold: 'spor gıdaları',
    rest: ' kullanılır. BCAA, kreatin, pre-workout ve ZMA gibi ürünler; enerji, kas gücü ve dinlenme sürecini desteklemeye yardımcı olur.',
  },
  saglik: {
    lead: 'Günlük beslenmede eksik kalabilen bileşenleri tamamlamaya yardımcı ',
    bold: 'sağlık ürünleri',
    rest: '; bağışıklık, uyku düzeni, odaklanma ve genel iyilik hali gibi alanlarda destek sağlamak amacıyla kullanılır.',
  },
  gida: {
    lead: 'Doğal içerikli ve kolay tüketilen ',
    bold: 'gıda ürünlerimiz',
    rest: '; dengeli beslenmeyi desteklemek, öğünlerini zenginleştirmek ve pratik seçenekler sunmak için hazırlanmıştır.',
  },
  vitamin: {
    lead: 'Vücudun düzenli çalışması için gerekli olan ',
    bold: 'vitamin ve mineraller',
    rest: ' günlük beslenmeyle yeterince alınamayabilir. Vitamin takviyeleri, enerji metabolizması ve bağışıklık sistemi gibi birçok işlevi desteklemeye yardımcı olur.',
  },
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [introOpen, setIntroOpen] = useState(false);

  const category = params.get('kategori') ?? 'all';
  const term = params.get('ara') ?? '';
  const intro = CATEGORY_INTRO[category];

  const products = useMemo(() => {
    const t = normalizeText(term.trim());
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch =
        !t ||
        normalizeText(p.name).includes(t) ||
        normalizeText(p.shortDescription ?? '').includes(t);
      return matchesCategory && matchesSearch;
    });
  }, [category, term]);

  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 pb-14">
      <h1 className="text-center text-[36px] font-black uppercase leading-none text-black mb-6">
        {term ? `"${term}"` : CATEGORY_LABELS[category] ?? 'ÜRÜNLER'}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-16">
          Aradığınız kriterlere uygun ürün bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/urun/${product.id}`)}
            />
          ))}
        </div>
      )}

      <p className="mt-16 text-center text-[12px] text-black">
        Toplam {products.length} ürün görüntüleniyor
      </p>

      {intro && (
        <div className="mt-12">
          <p className={`text-[13px] leading-6 text-black ${introOpen ? '' : 'line-clamp-1'}`}>
            {intro.lead}
            <strong>{intro.bold}</strong>
            {intro.rest}
          </p>
          <button
            type="button"
            onClick={() => setIntroOpen((v) => !v)}
            className="mt-3 text-[12px] text-[#2f8f6b] underline"
          >
            {introOpen ? 'Daha az göster' : 'Daha fazla göster'}
          </button>
        </div>
      )}
    </section>
  );
}
