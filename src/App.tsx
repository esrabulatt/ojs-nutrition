import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { useCartStore } from './store/cartStore';

// Tüm sayfalarda ortak: Header + sayfa içeriği + Footer + Sepet
export function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // Arama kutusu adres çubuğundaki ?ara= değerine bağlı
  const searchTerm = pathname === '/urunler' ? params.get('ara') ?? '' : '';

  // Sayfa değişince en üste git
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const handleSelectCategory = (category: string) => {
    navigate(category === 'all' ? '/urunler' : `/urunler?kategori=${category}`);
  };

  const handleSearch = (term: string) => {
    navigate(term ? `/urunler?ara=${encodeURIComponent(term)}` : '/urunler', {
      replace: pathname === '/urunler',
    });
  };

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header
        cartCount={totalCartCount}
        onOpenCart={openCart}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onSelectCategory={handleSelectCategory}
      />

      <Outlet />

      <Footer onSelectCategory={handleSelectCategory} onSearch={handleSearch} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}

export default App;
