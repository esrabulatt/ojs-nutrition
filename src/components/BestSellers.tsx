import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useBlazeSlider } from '../hooks/useBlazeSlider';

interface BestSellersProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  title?: string;
}

// Sabit referans: hook'un effect'i her render'da yeniden çalışmasın
const SLIDER_CONFIG = {
  all: { slidesToShow: 6, slideGap: '16px', loop: false },
  '(max-width: 900px)': { slidesToShow: 4, slideGap: '12px' },
  '(max-width: 640px)': { slidesToShow: 2, slideGap: '12px' },
};

export function BestSellers({ products, onSelectProduct, title = 'ÇOK SATANLAR' }: BestSellersProps) {
  const { sliderElRef } = useBlazeSlider(SLIDER_CONFIG);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-4 pb-6">
      <h2 className="text-center text-[16px] font-medium uppercase tracking-wide text-gray-900 mb-3">
        {title}
      </h2>

      <div className="blaze-slider relative" ref={sliderElRef}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} onClick={() => onSelectProduct(product)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Önceki"
          className="blaze-prev absolute -left-4 top-1/3 w-6 h-6 rounded-full bg-white shadow text-gray-700 text-xs disabled:opacity-30"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Sonraki"
          className="blaze-next absolute -right-4 top-1/3 w-6 h-6 rounded-full bg-white shadow text-gray-700 text-xs disabled:opacity-30"
        >
          ›
        </button>
      </div>
    </section>
  );
}
