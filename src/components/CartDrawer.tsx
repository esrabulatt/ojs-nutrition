import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
  
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <aside className="fixed inset-y-0 right-0 w-full max-w-[380px] bg-white shadow-xl flex flex-col">
        <div className="relative h-[58px] flex items-center justify-center bg-white">
          <h2 className="text-[17px] font-bold uppercase text-black">SEPETİM</h2>
          <button
            type="button"
            aria-label="Sepeti kapat"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {/* Ürün listesi */}
        <div className="flex-1 overflow-y-auto bg-[#f6f6f6]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <svg viewBox="0 0 24 24" className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h3l2.5 12h11L21 7H6" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              <p className="font-semibold text-[14px]">Sepetiniz şu an boş.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize ?? ''}`}
                className="flex gap-3 px-3 py-3 border-b border-gray-200"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-[76px] h-[76px] object-cover bg-[#E8EFF5] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/E8EFF5/000000?text=OJS';
                  }}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-medium uppercase text-black leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-[13px] font-semibold text-gray-400 mt-1">{item.selectedFlavor}</p>
                      {item.selectedSize && (
                        <p className="text-[13px] font-semibold text-gray-400">{item.selectedSize}</p>
                      )}
                    </div>
                    <span className="text-[12px] font-bold text-black whitespace-nowrap">
                      {item.product.price} TL
                    </span>
                  </div>

                  {/* Adet kontrolü */}
                  <div className="self-end flex items-center bg-white rounded-md shadow-sm h-8 text-[13px]">
                    <button
                      type="button"
                      aria-label={item.quantity > 1 ? 'Azalt' : 'Sepetten sil'}
                      onClick={() => (item.quantity > 1 ? onUpdateQuantity(index, -1) : onRemoveItem(index))}
                      className="w-9 h-full flex items-center justify-center hover:bg-gray-100 rounded-l-md"
                    >
                      {item.quantity > 1 ? (
                        <span className="text-[16px] leading-none">−</span>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
                        </svg>
                      )}
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Artır"
                      onClick={() => onUpdateQuantity(index, 1)}
                      className="w-9 h-full flex items-center justify-center text-[16px] font-semibold hover:bg-gray-100 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Toplam + devam et */}
        {items.length > 0 && (
          <div className="bg-white px-4 pt-3 pb-4">
            <p className="text-right text-[12px] font-bold uppercase text-black">
              TOPLAM {totalPrice.toLocaleString('tr-TR')} TL
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/odeme');
              }}
              className="mt-3 w-full h-[52px] bg-black hover:bg-gray-800 text-white text-[15px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
            >
              DEVAM ET
              <svg viewBox="0 0 10 12" className="w-2.5 h-3" fill="currentColor">
                <path d="M0 0l10 6-10 6z" />
              </svg>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
