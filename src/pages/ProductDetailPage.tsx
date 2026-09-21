import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { DEFAULT_FLAVOR_COLOR, FLAVOR_COLORS } from '../data/productDetails';
import { useCartStore } from '../store/cartStore';
import { useRecentStore } from '../store/recentStore';
import { BestSellers } from '../components/BestSellers';
import { ProductReviews } from '../components/ProductReviews';

const BLUE = '#2323a8';

function CheckBadge() {
  return (
    <span
      className="absolute -top-2 -right-2 z-10 w-[18px] h-[18px] rounded-full flex items-center justify-center"
      style={{ backgroundColor: BLUE }}
    >
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.2l2.4 2.4 4.6-5" />
      </svg>
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 8" className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1.5l5 5 5-5" />
    </svg>
  );
}

const TRUST_ITEMS = [
  {
    top: 'Aynı Gün',
    bottom: 'Ücretsiz Kargo',
    icon: (
      <>
        <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7" />
        <circle cx="6" cy="17" r="1.6" />
        <circle cx="16" cy="17" r="1.6" />
      </>
    ),
  },
  {
    top: '750.000+',
    bottom: 'Mutlu Müşteri',
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M8.5 12l2.4 2.4 4.6-5" />
      </>
    ),
  },
  {
    top: 'Memnuniyet',
    bottom: 'Garantisi',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <text x="12" y="15" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="700">100%</text>
      </>
    ),
  },
];

function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const flavors = product.flavors ?? [];
  const sizes = product.sizes ?? [];

  const [flavor, setFlavor] = useState<string>(flavors[0] ?? 'Standart');
  const [sizeId, setSizeId] = useState<string | undefined>(sizes[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const size = sizes.find((s) => s.id === sizeId);
  const price = size?.price ?? product.price;
  const oldPrice = size ? size.oldPrice : product.oldPrice;
  const perServing = size?.servings ? (price / size.servings).toFixed(2) : null;
  const details = product.details ?? {};

  const handleAddToCart = () => {
    addItem({ ...product, price, oldPrice }, quantity, flavor, size?.label);
  };

  const sections = [
    { id: 'features', title: 'ÖZELLİKLER', text: details.features ?? product.description },
    { id: 'nutrition', title: 'BESİN İÇERİĞİ', text: details.nutrition },
    { id: 'usage', title: 'KULLANIM ŞEKLİ', text: details.usage },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 pt-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
        <div>
          <div className="bg-[#F4F4F4] aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/E8EFF5/000000?text=OJS';
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-[28px] font-semibold uppercase leading-tight text-black">{product.name}</h1>
          <p className="text-[13px] uppercase text-gray-700 mt-0.5">{product.shortDescription}</p>
          <div className="flex items-center gap-2 mt-1 text-[13px]">
            <span className="text-[#FFD43B] text-[13px] tracking-wide">★★★★★</span>
            <span className="text-gray-800">{product.reviewCount ?? 0} Yorum</span>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#efefef] px-3 py-1.5 text-[10px] text-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <hr className="mt-5 mb-4 border-gray-200" />
          {flavors.length > 1 && (
            <div>
              <h2 className="text-[13px] font-bold uppercase text-black mb-2">Aroma:</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {flavors.map((f) => {
                  const active = f === flavor;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFlavor(f)}
                      className="relative flex items-center justify-between gap-3 h-8 pl-4 bg-white border text-[11px] text-gray-900 cursor-pointer"
                      style={{
                        borderColor: active ? BLUE : '#e5e5e5',
                        borderWidth: active ? 2 : 1,
                        boxShadow: active ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
                      }}
                    >
                      {active && <CheckBadge />}
                      <span>{f}</span>
                      <span
                        className="w-3.5 h-full"
                        style={{ backgroundColor: FLAVOR_COLORS[f] ?? DEFAULT_FLAVOR_COLOR }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {sizes.length > 1 && (
            <div className="mt-4">
              <h2 className="text-[13px] font-bold uppercase text-black mb-2">Boyut:</h2>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((s) => {
                  const active = s.id === sizeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      className="relative h-[54px] bg-white flex flex-col items-center justify-center cursor-pointer border"
                      style={{
                        borderColor: active ? BLUE : '#e5e5e5',
                        borderWidth: active ? 2 : 1,
                        boxShadow: active ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
                      }}
                    >
                      {active && <CheckBadge />}
                      {s.badge && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-semibold px-1.5 py-0.5 whitespace-nowrap">
                          {s.badge}
                        </span>
                      )}
                      <span className="text-[13px] font-medium text-black">{s.label}</span>
                      {s.servings && <span className="text-[10px] text-gray-600">{s.servings} servis</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fiyat */}
          <div className="flex items-end justify-between mt-6">
            <div className="flex items-baseline gap-3">
              <span className="text-[32px] font-bold leading-none text-black">{price} TL</span>
              {oldPrice && <span className="text-[16px] font-bold text-red-500 line-through">{oldPrice} TL</span>}
            </div>
            {perServing && <span className="text-[13px] text-gray-800">{perServing} TL /Servis</span>}
          </div>

          {/* Adet + Sepete ekle */}
          <div className="flex items-stretch gap-3 mt-4">
            <div className="flex items-center border border-gray-200 h-11">
              <button
                type="button"
                aria-label="Azalt"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-full text-[16px] font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-10 text-center text-[14px]">{quantity}</span>
              <button
                type="button"
                aria-label="Artır"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-full text-[16px] font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-11 bg-black hover:bg-gray-800 text-white text-[14px] font-medium tracking-wide uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h3l2.5 12h11L21 7H6" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              SEPETE EKLE
            </button>
          </div>
          <ul className="grid grid-cols-3 gap-2 mt-4 pb-4 border-b border-gray-200">
            {TRUST_ITEMS.map((item) => (
              <li key={item.top} className="flex items-center gap-2 text-[10px] leading-tight text-gray-800">
                <svg viewBox="0 0 24 24" className="w-8 h-8 shrink-0 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
                <span>
                  {item.top}
                  <br />
                  {item.bottom}
                </span>
              </li>
            ))}
          </ul>

          {details.expiry && (
            <p className="mt-4 text-[9px] text-gray-800">Son Kullanma Tarihi: {details.expiry}</p>
          )}
          <div className="mt-3">
            {sections.map((section) => {
              const open = openSection === section.id;
              return (
                <div key={section.id} className="border-b border-gray-200 first:border-t-0">
                  <button
                    type="button"
                    onClick={() => setOpenSection(open ? null : section.id)}
                    className="w-full flex items-center justify-between py-4 text-[12px] font-bold uppercase text-black"
                  >
                    {section.title}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <p className="pb-4 text-[13px] leading-6 text-gray-700">
                      {section.text ?? 'Bu bilgi yakında eklenecektir.'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const recentIds = useRecentStore((s) => s.ids);
  const addRecent = useRecentStore((s) => s.add);

  useEffect(() => {
    if (id && product) addRecent(id);
  }, [id, product, addRecent]);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <p className="text-lg font-semibold">Ürün bulunamadı.</p>
        <Link to="/urunler" className="mt-4 inline-block underline">
          Tüm ürünlere dön
        </Link>
      </div>
    );
  }

  // Son görüntülenenler önde, kalan ürünler arkada
  const recentProducts = [
    ...recentIds.map((rid) => PRODUCTS.find((p) => p.id === rid)).filter((p): p is Product => !!p),
    ...PRODUCTS.filter((p) => p.isBestSeller && !recentIds.includes(p.id)),
  ];

  return (
    <>
      <ProductDetail key={product.id} product={product} />
      <BestSellers
        title="SON GÖRÜNTÜLENEN ÜRÜNLER"
        products={recentProducts}
        onSelectProduct={(p) => navigate(`/urun/${p.id}`)}
      />
      <ProductReviews reviewCount={product.reviewCount ?? 0} />
    </>
  );
}
