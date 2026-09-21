import { useNavigate } from 'react-router-dom';
import { InfoStrip } from '../components/InfoStrip';
import { CategoryGrid } from '../components/CategoryGrid';
import { BestSellers } from '../components/BestSellers';
import { PromoBanner } from '../components/PromoBanner';
import { ReviewsSection } from '../components/ReviewsSection';
import { PRODUCTS } from '../data/products';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <InfoStrip />
      <img
        src="/images/optimized/imgheader.webp"
        alt="OJS Nutrition"
        width={1920}
        height={640}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block w-full h-auto"
      />

      <CategoryGrid
        onSelectCategory={(category) =>
          navigate(category === 'all' ? '/urunler' : `/urunler?kategori=${category}`)
        }
      />

      <BestSellers products={PRODUCTS.filter((p) => p.isBestSeller)} onSelectProduct={(p) => navigate(`/urun/${p.id}`)} />

      <PromoBanner />
      <ReviewsSection />
    </>
  );
}
