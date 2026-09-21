import { Link, useParams } from 'react-router-dom';
import { InfoStrip } from '../components/InfoStrip';
import { AccountSidebar } from '../components/AccountSidebar';
import { formatOrderDate, formatTL } from '../data/orders';
import { useAllOrders } from '../store/orderStore';

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = useAllOrders().find((o) => o.id === id);

  return (
    <>
      <InfoStrip />

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-28 grid grid-cols-1 md:grid-cols-[245px_1fr] gap-y-8">
        <AccountSidebar active={null} />

        <div className="pt-1">
          {!order ? (
            <div>
              <h2 className="text-[18px] font-bold text-black">Sipariş bulunamadı</h2>
              <Link to="/hesabim?sekme=siparisler" className="mt-3 inline-block text-[14px] underline">
                Siparişlerime dön
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-[19px] font-bold leading-tight text-black">Sipariş {order.status}</h2>
              <p className="mt-1 text-[14px] text-black">
                {formatOrderDate(order.date)} Tarihinde Sipariş Verildi - {order.id} numaralı sipariş
              </p>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_263px] gap-x-14 gap-y-10">
                <div className="border-t border-black">
                  <ul className="py-6 flex flex-col gap-5">
                    {order.items.map((item) => (
                      <li key={item.name} className="flex gap-5">
                        <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-[174px] h-[174px] object-cover bg-[#f4f4f4] shrink-0" />
                        <div className="pt-2">
                          <p className="text-[14px] font-bold uppercase text-black">
                            {item.name} x {item.quantity}
                          </p>
                          <p className="mt-2 text-[14px] text-black">{formatTL(item.price)}</p>
                          <p className="mt-1 text-[14px] text-black">Boyut: {item.size}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-black pt-4 flex gap-5 text-[13px] text-black">
                    <span>{order.shipping.carrier}</span>
                    <span>
                      Takip Numarası: <span className="ml-3">{order.shipping.trackingNo}</span>
                    </span>
                  </div>
                </div>
                <aside className="border-t border-black text-[13px] text-black">
                  <div className="py-4 border-b border-black">
                    <h3 className="font-bold">Adres</h3>
                    <p className="mt-2">{order.address.fullName}</p>
                    <div className="mt-1 leading-6">
                      {order.address.lines.map((line) => (
                        <span key={line} className="block w-fit underline underline-offset-2">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="py-4 border-b border-black">
                    <h3 className="font-bold">Ödeme</h3>
                    <p className="mt-3 text-[15px]">
                      {order.payment.method} - {formatTL(order.summary.total)}
                    </p>
                    <p className="mt-1">{order.payment.maskedCard}</p>
                  </div>

                  <div className="py-4 border-b border-black">
                    <h3 className="font-bold">Özet</h3>
                    <dl className="mt-3 space-y-3">
                      {[
                        ['Ara Toplam', formatTL(order.summary.subtotal)],
                        ['Kargo', formatTL(order.summary.shipping)],
                        ['Toplam Vergi', formatTL(order.summary.tax)],
                        [order.summary.discountLabel, `- ${formatTL(order.summary.discount)}`],
                        ['Toplam', formatTL(order.summary.total)],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between">
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="py-4">
                    <h3 className="text-[15px] font-bold">Yardıma mı ihtiyacın var?</h3>
                    <ul className="mt-4 space-y-3">
                      <li><Link to="/sss" className="hover:underline">Sıkça Sorulan Sorular</Link></li>
                      <li><Link to="/sss" className="hover:underline">Satış Sözleşmesi</Link></li>
                    </ul>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
