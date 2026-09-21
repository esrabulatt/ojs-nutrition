import { useState } from 'react';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedFlavor: string) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const defaultFlavors = ['Çikolata', 'Muz', 'Çilek', 'Vanilya'];
  const flavors = (product as any).flavors && (product as any).flavors.length > 0 
    ? (product as any).flavors 
    : defaultFlavors;

  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0] || 'Aromasız');
  const [quantity, setQuantity] = useState(1);

  const descriptionText = product.shortDescription || (product as any).short_description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol: Ürün Görseli */}
          <div className="bg-[#E8EFF5] rounded-lg p-6 flex items-center justify-center relative">
            {(product as any).discountRate && (
              <span className="absolute top-3 right-3 bg-[#FF3B30] text-white font-bold text-xs px-2 py-1 rounded">
                {(product as any).discountRate} İNDİRİM
              </span>
            )}
            <img
              src={product.image || (product as any).photo_src}
              alt={product.name || (product as any).title}
              className="max-h-56 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/200x200/E8EFF5/000000?text=' +
                  encodeURIComponent(product.name || (product as any).title || 'Urun');
              }}
            />
          </div>

          {/* Sağ: Ürün Detayları & Seçenekler */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-black uppercase mb-1">
                {product.name || (product as any).title}
              </h2>
              {descriptionText && (
                <p className="text-xs font-bold text-[#EAB308] uppercase tracking-wide mb-3">
                  {descriptionText}
                </p>
              )}

              {/* Fiyat Alanı */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-black">
                  {product.price || (product as any).price_info?.total_price || 0} TL
                </span>
                {(product as any).originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {(product as any).originalPrice} TL
                  </span>
                )}
              </div>

          
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-700">
                  Aroma Seçimi:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {flavors.map((flavor: string) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`py-1.5 px-3 rounded text-xs font-semibold border transition-all ${
                        selectedFlavor === flavor
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adet Seçimi */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-700">
                  Adet:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded border border-gray-300 font-bold hover:bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded border border-gray-300 font-bold hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Sepete Ekle Butonu */}
            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedFlavor);
                onClose();
              }}
              className="w-full bg-black text-white font-black py-3 rounded-lg uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              SEPETE EKLE • {((product.price || (product as any).price_info?.total_price || 0) * quantity).toLocaleString('tr-TR')} TL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}