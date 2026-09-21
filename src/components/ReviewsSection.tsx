import { useState } from 'react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ahmet Y.',
    title: 'Harika paketleme ve hızlı teslimat',
    text: 'Siparişi verdiğimin ertesi günü elimdeydi. Paketleme son derece özenliydi, ürünlerin kapağındaki emniyet bandı sapasağlam geldi. Ayrıca kutunun içinden çıkan küçük hediyeler ve not için çok teşekkür ederim, kesinlikle tekrar alışveriş yapacağım.',
  },
  {
    id: 2,
    name: 'Selin T.',
    title: 'Etkisini ilk haftadan hissettim',
    text: 'Uzun zamandır düzenli kullanabileceğim kaliteli bir takviye arıyordum. İçerik kalitesi ve hammadde güvenilirliği gerçekten hissediliyor. Sindirim ve gün içindeki enerji seviyemde gözle görülür bir fark yarattı, fiyat/performans olarak mükemmel.',
  },
  {
    id: 3,
    name: 'Caner K.',
    title: 'Topaklanma yapmıyor, içimi çok rahat',
    text: 'Daha önce kullandığım markalarda çözünme problemi yaşıyordum fakat bu ürün suyla anında karışıyor. Tadı yapay veya rahatsız edici değil, midede kesinlikle şişkinlik ya da hassasiyet yapmadı. Spor sonrası vazgeçilmezim oldu.',
  },
  {
    id: 4,
    name: 'Ece B.',
    title: '3. kutumu bitirmek üzereyim',
    text: 'Aylardır düzenli olarak kullandığım tek marka. Hem ürün doğrulaması yapabilmek hem de müşteri hizmetlerinin sorularıma hızlıca dönüş yapması güven veriyor. Sipariş takibi de çok kolay oldu, teşekkürler OJS Nutrition!',
  },
];

const VISIBLE = 4;

export function ReviewsSection() {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, REVIEWS.length - VISIBLE);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-5 pb-10">
      <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-4">
        <h2 className="text-[15px] font-semibold uppercase text-gray-800">GERÇEK MÜŞTERİ YORUMLARI</h2>

        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-[#FFD43B] text-[15px] tracking-tight">★★★★★</span>
          <span className="font-bold underline text-gray-800">198453 Yorum</span>
          {/* Yorum sayısı ekrana sığıyorsa oklar gerekmez */}
          {maxStart > 0 && (
            <>
              <button
                type="button"
                aria-label="Önceki yorumlar"
                disabled={start === 0}
                onClick={() => setStart((s) => Math.max(0, s - 1))}
                className="px-1 text-gray-700 disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Sonraki yorumlar"
                disabled={start >= maxStart}
                onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
                className="px-1 text-gray-700 disabled:opacity-30"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
        {REVIEWS.slice(start, start + VISIBLE).map((r) => (
          <article key={r.id}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FFD43B] text-[15px] leading-none tracking-tight">★★★★★</span>
              <span className="text-[13px] font-bold text-gray-900">{r.name}</span>
            </div>
            <h3 className="text-[15px] font-bold leading-snug text-gray-900 mb-1.5">{r.title}</h3>
            <p className="text-[13px] leading-[1.55] text-gray-600">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
