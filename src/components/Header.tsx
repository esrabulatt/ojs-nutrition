import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { SearchBox } from './SearchBox';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectCategory: (category: string) => void;
  onGoHome?: () => void;
}

const NAV_ITEMS = [
  { id: 'protein', label: 'PROTEİN' },
  { id: 'spor', label: 'SPOR GIDALARI' },
  { id: 'saglik', label: 'SAĞLIK' },
  { id: 'gida', label: 'GIDA' },
  { id: 'vitamin', label: 'VİTAMİN' },
  { id: 'all', label: 'TÜM ÜRÜNLER' },
];

export function Header({
  cartCount,
  onOpenCart,
  searchTerm,
  onSearchChange,
  onSelectCategory,
  onGoHome,
}: HeaderProps) {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklayınca ya da Esc'ye basınca kapansın
  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [accountOpen]);

  const menuItemClass = 'block px-4 py-2.5 text-[14px] text-gray-800 hover:bg-gray-100 text-left w-full cursor-pointer';

  return (
    <header className="w-full bg-white sticky top-0 z-40">
      {/* Üst bar: logo, arama, hesap, sepet */}
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-0 md:h-[76px] flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 gap-y-2">
        <Link
          to="/"
          onClick={onGoHome}
          className="logo-font text-black text-[20px] leading-[0.95] font-black italic uppercase tracking-wide"
        >
          <span className="block">OJS</span>
          <span className="block">NUTRITION</span>
        </Link>

        <SearchBox value={searchTerm} onSearch={onSearchChange} />

        <div className="flex items-center gap-3">
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-label="Hesap menüsü"
              className="flex items-center justify-center sm:justify-between gap-2 h-10 w-10 sm:w-[110px] px-0 sm:px-2 border border-gray-400 text-[13px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
              <span className="hidden sm:inline">HESAP</span>
              <svg viewBox="0 0 10 6" className={`hidden sm:block w-2 h-2 transition-transform ${accountOpen ? 'rotate-180' : ''}`} fill="currentColor">
                <path d="M0 0h10L5 6z" />
              </svg>
            </button>

            {accountOpen && (
              <div role="menu" className="absolute right-0 top-full mt-1 w-[200px] bg-white border border-gray-200 shadow-lg py-1 z-50">
                <Link to="/hesabim" role="menuitem" onClick={() => setAccountOpen(false)} className={menuItemClass}>
                  Hesabım
                </Link>
                <Link to="/hesabim?sekme=siparisler" role="menuitem" onClick={() => setAccountOpen(false)} className={menuItemClass}>
                  Siparişlerim
                </Link>
                <Link to="/hesabim?sekme=adresler" role="menuitem" onClick={() => setAccountOpen(false)} className={menuItemClass}>
                  Adreslerim
                </Link>
                <div className="my-1 border-t border-gray-200" />
                {user ? (
                  <Link
                    to="/"
                    role="menuitem"
                    onClick={() => {
                      logout();
                      setAccountOpen(false);
                    }}
                    className={menuItemClass}
                  >
                    Çıkış Yap
                  </Link>
                ) : (
                  <Link to="/giris" role="menuitem" onClick={() => setAccountOpen(false)} className={menuItemClass}>
                    Giriş Yap / Üye Ol
                  </Link>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Sepet"
            className="flex items-center justify-center gap-1.5 h-10 w-11 sm:w-[150px] bg-gray-500 hover:bg-gray-600 text-white text-[13px] font-bold tracking-wider transition-colors cursor-pointer"
          >
            <span className="relative">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 3h3l2.5 12h11L21 7H6" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              <span className="absolute -top-2 -right-2 min-w-[15px] h-[15px] px-[3px] rounded-full bg-red-600 text-white text-[11px] leading-[15px] text-center">
                {cartCount}
              </span>
            </span>
            <span className="hidden sm:inline">SEPET</span>
          </button>
        </div>
      </div>

      {/* Siyah navigasyon çubuğu */}
      <nav className="bg-[#1b1b1b] text-white">
        <ul className="max-w-6xl mx-auto px-4 h-[34px] flex items-center justify-between text-[13px] font-semibold tracking-wide uppercase overflow-x-auto gap-4 no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <button
                type="button"
                onClick={() => onSelectCategory(item.id)}
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
