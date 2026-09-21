interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = [
  { id: 'protein', title: 'PROTEİN', image: '/images/image2.png', bgColor: 'bg-[#8caaae]' },
  { id: 'vitamin', title: 'VİTA-MİNLER', image: '/images/image3.png', bgColor: 'bg-[#fce5d2]' },
  { id: 'saglik', title: 'SAĞLIK', image: '/images/image4.png', bgColor: 'bg-[#d1d0cb]' },
  { id: 'spor', title: 'SPOR GIDALARI', image: '/images/image5.png', bgColor: 'bg-[#d9d7d3]' },
  { id: 'gida', title: 'GIDA', image: '/images/image6.png', bgColor: 'bg-[#70b2cd]' },
  { id: 'all', title: 'TÜM ÜRÜNLER', image: '/images/optimized/image7.webp', bgColor: 'bg-[#a0d0df]' },
];

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-3 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory?.(cat.id)}
            className={`relative ${cat.bgColor} h-[150px] rounded-md overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            <div className="absolute left-0 top-0 h-full w-1/2">
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="absolute right-0 top-0 h-full w-1/2 flex flex-col items-center justify-center px-3 z-10">
              <h3 className="text-black font-black text-[21px] text-center leading-tight uppercase tracking-tight mb-2">
                {cat.title}
              </h3>
              <button
                type="button"
                className="w-full bg-black text-white font-bold text-[12px] py-1.5 rounded uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                İNCELE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
