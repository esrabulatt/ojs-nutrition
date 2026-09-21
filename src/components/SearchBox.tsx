import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';
import { normalizeText } from '../utils/normalizeText';

interface SearchBoxProps {
  /** Adres çubuğundaki mevcut arama değeri (ör. /urunler?ara=protein) */
  value: string;
  /** ARA butonuna / Enter'a basılınca çalışır → ürünler sayfasını arama ile açar */
  onSearch: (term: string) => void;
}

export function SearchBox({ value, onSearch }: SearchBoxProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Adres çubuğundaki değer değişince (ör. ürün sayfasına geçince) kutuyu eşitle
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Ürün adı / kısa açıklamada arama; ada uyanlar listenin başında
  const results = useMemo(() => {
    const t = normalizeText(query.trim());
    if (!t) return [];
    const inName = (p: Product) => normalizeText(p.name).includes(t);
    const inDesc = (p: Product) => normalizeText(p.shortDescription ?? '').includes(t);
    return PRODUCTS.filter((p) => inName(p) || inDesc(p)).sort(
      (a, b) => Number(inName(b)) - Number(inName(a)),
    );
  }, [query]);

  const showDropdown = open && query.trim().length > 0;

  // Kutunun dışına tıklayınca kapansın
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const goToProduct = (product: Product) => {
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
    navigate(`/urun/${product.id}`);
  };

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
    onSearch(query.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown' && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp' && results.length) {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && showDropdown && active >= 0 && results[active]) {
      e.preventDefault();
      goToProduct(results[active]);
    }
  };

  return (
    <div
      ref={boxRef}
      className={`order-last basis-full md:order-none md:basis-auto relative z-30 md:flex-1 min-w-0 transition-[max-width] duration-200 ${
        showDropdown ? 'md:max-w-[680px]' : 'md:max-w-[420px]'
      }`}
    >
      {/* Arkadaki sayfayı karartan katman */}
      {showDropdown && <div className="fixed inset-0 bg-black/50 -z-10" aria-hidden="true" />}

      <form className="flex" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Aradığınız ürünü yazınız"
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          className="flex-1 min-w-0 h-10 bg-[#f3f3f3] rounded-l-lg text-[14px] font-bold px-4 text-black placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="h-10 px-7 bg-gray-500 hover:bg-gray-600 rounded-r-lg text-white text-[13px] font-bold tracking-wider transition-colors cursor-pointer"
        >
          ARA
        </button>
      </form>

      {showDropdown && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-[#f3f3f3] p-2 rounded-lg shadow-xl max-h-[min(440px,calc(100vh-120px))] overflow-y-auto"
        >
          {results.length === 0 ? (
            <p className="bg-white px-4 py-6 text-center text-[14px] text-gray-500">
              "{query.trim()}" için ürün bulunamadı
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((p, i) => (
                <li key={p.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onClick={() => goToProduct(p)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-start gap-3 sm:gap-4 text-left px-3 py-3 cursor-pointer transition-colors ${
                      i === active ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] object-contain shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/144x144/E8EFF5/000000?text=OJS';
                      }}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-[16px] text-black uppercase leading-tight">
                        {p.name}
                      </span>
                      {p.shortDescription && (
                        <span className="block mt-1.5 text-[13px] text-[#8a8a8a] uppercase leading-tight">
                          {p.shortDescription}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-bold text-[16px] text-black">{p.price} TL</span>
                      {p.oldPrice && (
                        <span className="block text-[14px] font-bold text-red-500 line-through">
                          {p.oldPrice} TL
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
