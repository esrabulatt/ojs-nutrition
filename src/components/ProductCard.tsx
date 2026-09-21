import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [badgeRate, ...badgeRest] = (product.discountBadge ?? '').split(' ');

  return (
    <div onClick={onClick} className="cursor-pointer group flex flex-col h-full">
      <div className="relative bg-[#F4F4F4] aspect-square overflow-hidden">
        {product.discountBadge && (
          <span className="absolute top-0 right-2 z-10 bg-red-600 text-white text-center leading-none px-1.5 py-1 rounded-b-sm">
            <span className="block text-[16px] font-black">{badgeRate}</span>
            <span className="block text-[10px] font-semibold uppercase">{badgeRest.join(' ')}</span>
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/250x250/E8EFF5/000000?text=OJS';
          }}
        />
      </div>

      <div className="text-center pt-3 flex-1 flex flex-col">
        <h3 className="font-bold text-[14px] text-black uppercase leading-tight line-clamp-2 min-h-[34px]">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 uppercase leading-tight line-clamp-2 min-h-[22px] mt-0.5">
          {product.shortDescription}
        </p>

        <div className="text-[#FFD43B] text-[16px] leading-none tracking-wider my-1.5">★★★★★</div>

        <span className="text-[11px] text-gray-800 font-medium block mt-1 mb-1.5">
          {product.reviewCount ?? 0} Yorum
        </span>

        <div className="flex items-baseline justify-center gap-1 text-[15px] text-black mb-2">
          <span className="font-medium">{product.price} TL</span>
          {product.oldPrice && (
            <span className="text-[13px] font-bold text-red-500 line-through">{product.oldPrice} TL</span>
          )}
        </div>

        {onAddToCart && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="mt-auto w-full bg-black hover:bg-gray-800 text-white text-[13px] font-bold py-1.5 rounded transition-colors uppercase"
          >
            SEPETE EKLE
          </button>
        )}
      </div>
    </div>
  );
}
