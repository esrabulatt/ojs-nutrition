import { Link } from 'react-router-dom';
import { formatOrderDate, formatTL } from '../data/orders';
import { useAllOrders } from '../store/orderStore';

// "Siparişlerim" sekmesi: siparişlerin kısa listesi, her birinden detay sayfasına gidilir
export function OrdersSection() {
  const ORDERS = useAllOrders();

  if (ORDERS.length === 0) {
    return (
      <div>
        <h2 className="text-[16px] font-bold text-black mb-4">Siparişlerim</h2>
        <p className="text-[14px] text-gray-500">Henüz siparişiniz bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[16px] font-bold text-black mb-4">Siparişlerim ({ORDERS.length})</h2>

      <div className="flex flex-col gap-4">
        {ORDERS.map((o) => (
          <article key={o.id} className="flex flex-wrap items-center justify-between gap-4 border border-black rounded-[4px] bg-white px-5 py-4">
            <div>
              <p className="text-[14px] font-bold text-black">Sipariş No: {o.id}</p>
              <p className="mt-1 text-[13px] text-gray-600">{formatOrderDate(o.date)}</p>
            </div>
            <span className="text-[13px] font-semibold text-green-700">{o.status}</span>
            <span className="text-[14px] font-bold text-black">{formatTL(o.summary.total)}</span>
            <Link to={`/hesabim/siparis/${o.id}`} className="text-[13px] text-black underline hover:text-gray-600">
              Sipariş Detayı
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
