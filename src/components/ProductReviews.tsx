import { useState } from 'react';
import { RATING_DISTRIBUTION, REVIEWS } from '../data/productDetails';

interface ProductReviewsProps {
  reviewCount: number;
}

const Stars = ({ className = '' }: { className?: string }) => (
  <span className={`text-[#FFD43B] leading-none tracking-wide ${className}`}>★★★★★</span>
);

export function ProductReviews({ reviewCount }: ProductReviewsProps) {
  const [visible, setVisible] = useState(5);
  const maxCount = Math.max(...RATING_DISTRIBUTION.map((r) => r.count));

  return (
    <section className="max-w-5xl mx-auto px-4 pt-6 pb-16">
      {/* Puan özeti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center md:w-[220px]">
          <span className="text-[34px] leading-none">4.8</span>
          <Stars className="text-[30px] mt-2" />
          <span className="mt-3 text-[13px] tracking-[0.25em] text-gray-800">{reviewCount} YORUM</span>
        </div>

        <ul className="space-y-1.5 max-w-[320px]">
          {RATING_DISTRIBUTION.map((row) => (
            <li key={row.stars} className="flex items-center gap-3">
              <span className="text-[#FFD43B] text-[9px] w-14 tracking-tight">{'★'.repeat(row.stars)}</span>
              <span className="flex-1 h-3 bg-[#ececec] relative">
                <span
                  className="absolute inset-y-0 left-0 bg-[#2323a8]"
                  style={{ width: `${Math.max((row.count / maxCount) * 100, 1)}%` }}
                />
              </span>
              <span className="text-[9px] text-[#2323a8] w-10">({row.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="mt-5 rounded-full px-5 py-2 text-[11px] font-bold text-white bg-gradient-to-r from-[#3a5bbf] to-[#2323a8]"
      >
        YORUM ({reviewCount})
      </button>

      {/* Yorum kartları */}
      <div className="mt-4 space-y-3 md:max-w-[820px]">
        {REVIEWS.slice(0, visible).map((r) => (
          <article key={r.id} className="rounded-[24px] bg-[#f6f6f6] px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stars className="text-[20px]" />
                <span className="text-[13px] font-bold text-black">{r.name}</span>
              </div>
              <time className="text-[12px] font-bold text-gray-800 md:mr-8">{r.date}</time>
            </div>
            <h3 className="mt-2 text-[17px] font-semibold text-black">{r.title}</h3>
            <p className="mt-2 text-[12px] leading-5 text-gray-600">{r.text}</p>
          </article>
        ))}
      </div>

      {visible < REVIEWS.length && (
        <button
          type="button"
          onClick={() => setVisible(REVIEWS.length)}
          className="mt-5 text-[13px] font-semibold underline text-gray-800 hover:text-black"
        >
          Daha fazla yorum göster
        </button>
      )}
    </section>
  );
}
