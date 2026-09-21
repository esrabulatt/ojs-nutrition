import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AddressForm } from '../components/AddressesSection';
import { useAddressStore, type Address } from '../store/addressStore';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useUserStore } from '../store/userStore';
import type { Order } from '../data/orders';


type Step = 1 | 2 | 3;

const tl = (n: number) => `${n.toLocaleString('en-US')} TL`;

const SHIPPING_OPTIONS = [
  { id: 'standart', label: 'Standart Kargo', desc: '2-3 iş günü içinde teslim', price: (total: number) => (total >= 100 ? 0 : 30) },
  { id: 'ayni-gun', label: 'Aynı Gün Kargo', desc: "16:00'dan önceki siparişlerde", price: () => 39 },
];

const formatCardNumber = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
function Radio({ checked }: { checked: boolean }) {
  return checked ? (
    <span className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center shrink-0">
      <svg viewBox="0 0 12 12" className="w-[10px] h-[10px]" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" />
      </svg>
    </span>
  ) : (
    <span className="w-[18px] h-[18px] rounded-full border border-[#dcdcdc] bg-white shrink-0" />
  );
}
function OptionCard({
  selected,
  onSelect,
  title,
  right,
  children,
  className = '',
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`rounded-[6px] px-[14px] py-[14px] cursor-pointer ${
        selected ? 'border-2 border-[#2323a8] bg-[#f6f6f8]' : 'border border-[#eeeeee] bg-white'
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <Radio checked={selected} />
        <span className="flex-1 text-[13px] text-black">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

function StepHeader({ n, title, state, onEdit }: { n: number; title: string; state: 'active' | 'done' | 'todo'; onEdit?: () => void }) {
  return (
    <div className="flex items-center gap-[13px]">
      <span
        className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[15px] shrink-0 ${
          state === 'todo' ? 'border border-black text-black' : 'bg-black text-white'
        }`}
      >
        {state === 'done' ? (
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" />
          </svg>
        ) : (
          n
        )}
      </span>
      <h2 className={`flex-1 text-[20px] ${state === 'todo' ? 'font-semibold text-[#8e8e93]' : 'font-medium text-black'}`}>{title}</h2>
      {state === 'done' && onEdit && (
        <button type="button" onClick={onEdit} className="text-[13px] text-black underline cursor-pointer">
          Düzenle
        </button>
      )}
    </div>
  );
}

const inputClass =
  'w-full h-12 bg-[#f4f4f4] border border-[#ececec] px-4 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400';

const CHECKOUT_KEY = 'ojs-checkout-v1';

function readSaved(): { addressId?: string; shippingId?: string } {
  try {
    const raw = localStorage.getItem(CHECKOUT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}


export default function CheckoutPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const addresses = useAddressStore((s) => s.addresses);

  const [step, setStep] = useState<Step>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>(() => {
    const saved = readSaved().addressId;
    return saved && addresses.some((a) => a.id === saved) ? saved : addresses[0]?.id ?? 'new';
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [shippingId, setShippingId] = useState<string>(() => {
    const saved = readSaved().shippingId;
    return SHIPPING_OPTIONS.some((o) => o.id === saved) ? (saved as string) : 'standart';
  });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_KEY, JSON.stringify({ addressId: selectedAddress, shippingId }));
    } catch {
    }
  }, [selectedAddress, shippingId]);
  const listTotal = items.reduce((sum, i) => sum + (i.product.oldPrice ?? i.product.price) * i.quantity, 0);
  const itemsTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === shippingId)!;
  const shippingPrice = shippingOption.price(itemsTotal);
  const grandTotal = itemsTotal + (step === 3 ? shippingPrice : 0);

  const chosenAddress: Address | undefined = addresses.find((a) => a.id === selectedAddress);
  const fullName = user ? `${user.name} ${user.surname}`.trim() : '';

  const handleCardChange = (key: keyof typeof card, value: string) => {
    setError('');
    setCard((prev) => ({ ...prev, [key]: value }));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = card.number.replace(/\D/g, '');
    const month = Number(card.expiry.slice(0, 2));
    if (digits.length !== 16) return setError('Kart numarası 16 haneli olmalıdır.');
    if (card.expiry.length !== 5 || month < 1 || month > 12) return setError('Son kullanma tarihini AA/YY şeklinde giriniz.');
    if (card.cvv.length < 3) return setError('CVV en az 3 haneli olmalıdır.');
    if (!agree || !chosenAddress) return setError('Devam etmek için sözleşmeyi onaylamanız gerekir.');

    const order: Order = {
      id: String(Math.floor(100000 + Math.random() * 900000)),
      date: new Date().toISOString().slice(0, 10),
      status: 'Hazırlanıyor',
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        size: [i.selectedFlavor, i.selectedSize].filter(Boolean).join(' / '),
        image: i.product.image,
      })),
      address: {
        fullName: `${chosenAddress.name} ${chosenAddress.surname}`,
        lines: [chosenAddress.address, `${chosenAddress.district}/${chosenAddress.city}`],
      },
      payment: { method: 'Kredi Kartı', maskedCard: `**** **** **** **${digits.slice(-2)}` },
      summary: {
        subtotal: listTotal,
        shipping: shippingPrice,
        tax: 0,
        discountLabel: 'İndirim',
        discount: listTotal - itemsTotal,
        total: itemsTotal + shippingPrice,
      },
      shipping: { carrier: shippingOption.label, trackingNo: 'Kargoya verilince iletilecek' },
    };

    addOrder(order);
    navigate(`/hesabim/siparis/${order.id}`);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-[18px] text-black">Sepetiniz boş.</p>
        <Link to="/urunler" className="h-11 px-8 bg-black text-white text-[14px] font-bold flex items-center hover:bg-gray-800">
          Alışverişe Devam Et
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      <div className="flex flex-col px-4 lg:pl-0 lg:pr-[52px]">
        <div className="w-full max-w-[483px] mx-auto lg:mx-0 lg:ml-auto flex flex-col flex-1">
          <div className="flex items-start justify-between pt-[30px]">
            <Link to="/" className="logo-font text-black text-[22px] leading-[0.95] font-black italic uppercase tracking-wide">
              <span className="block">OJS</span>
              <span className="block">NUTRITION</span>
            </Link>
            <div className="text-right">
              <p className="text-[16px] font-medium text-black">{fullName || 'İsim Soyisim'}</p>
              <p className="mt-1 text-[12px] text-[#8e8e93]">{user?.email ?? 'isimsoyisim@mail.com'}</p>
            </div>
          </div>
          <section className="mt-[68px]">
            <StepHeader n={1} title="Adres" state={step === 1 ? 'active' : 'done'} onEdit={() => setStep(1)} />

            {step === 1 ? (
              <div className="pl-[39px]">
                <h3 className="mt-[22px] mb-[14px] text-[17px] text-black">Teslimat Adresi</h3>

                <div className="flex flex-col gap-[13px]">
                  {addresses.map((a) =>
                    editingId === a.id ? (
                      <div key={a.id} className="rounded-[6px] border border-[#eeeeee] p-4">
                        <AddressForm
                          editing={a}
                          isFirst={false}
                          onDone={() => setEditingId(null)}
                          onCancel={() => setEditingId(null)}
                        />
                      </div>
                    ) : (
                      <OptionCard
                        key={a.id}
                        selected={selectedAddress === a.id}
                        onSelect={() => setSelectedAddress(a.id)}
                        title={a.title}
                        right={
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(a.id);
                            }}
                            className="text-[13px] text-black cursor-pointer hover:underline"
                          >
                            Düzenle
                          </button>
                        }
                        className="min-h-[92px]"
                      >
                        <p className="mt-3 pl-[30px] pr-4 text-[14px] leading-[19px] text-[#8e8e93]">
                          {a.address}, {a.district}, {a.city}, Türkiye
                        </p>
                      </OptionCard>
                    )
                  )}

                  <OptionCard selected={selectedAddress === 'new'} onSelect={() => setSelectedAddress('new')} title="Yeni Adres" className="py-[14px]">
                    {selectedAddress === 'new' && (
                      <div className="mt-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                        <AddressForm
                          editing={null}
                          isFirst={addresses.length === 0}
                          onDone={(id) => setSelectedAddress(id)}
                          onCancel={() => setSelectedAddress(addresses[0]?.id ?? 'new')}
                        />
                      </div>
                    )}
                  </OptionCard>
                </div>

                <button
                  type="button"
                  disabled={!chosenAddress}
                  onClick={() => setStep(2)}
                  className="mt-[14px] w-full h-[45px] rounded-[4px] bg-black text-white text-[14px] font-bold transition-colors hover:bg-gray-800 disabled:bg-[#bdbdbd] disabled:cursor-not-allowed cursor-pointer"
                >
                  Kargo ile Devam Et
                </button>
              </div>
            ) : (
              chosenAddress && (
                <p className="mt-2 pl-[39px] text-[13px] text-[#8e8e93]">
                  {chosenAddress.title} - {chosenAddress.address}, {chosenAddress.district}/{chosenAddress.city}
                </p>
              )
            )}
          </section>

          {/* 2 - Kargo */}
          <section className="mt-[26px] pt-[26px] border-t border-[#ececec]">
            <StepHeader n={2} title="Kargo" state={step === 2 ? 'active' : step > 2 ? 'done' : 'todo'} onEdit={() => setStep(2)} />

            {step === 2 && (
              <div className="pl-[39px]">
                <div className="mt-[22px] flex flex-col gap-[13px]">
                  {SHIPPING_OPTIONS.map((o) => {
                    const price = o.price(itemsTotal);
                    return (
                      <OptionCard
                        key={o.id}
                        selected={shippingId === o.id}
                        onSelect={() => setShippingId(o.id)}
                        title={o.label}
                        right={<span className="text-[13px] text-black">{price === 0 ? 'Ücretsiz' : tl(price)}</span>}
                      >
                        <p className="mt-2 pl-[30px] text-[13px] text-[#8e8e93]">{o.desc}</p>
                      </OptionCard>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-[14px] w-full h-[45px] rounded-[4px] bg-black text-white text-[14px] font-bold hover:bg-gray-800 cursor-pointer"
                >
                  Ödeme ile Devam Et
                </button>
              </div>
            )}
            {step > 2 && <p className="mt-2 pl-[39px] text-[13px] text-[#8e8e93]">{shippingOption.label} - {shippingPrice === 0 ? 'Ücretsiz' : tl(shippingPrice)}</p>}
          </section>

          {/* 3 - Ödeme */}
          <section className="mt-[26px] pt-[26px] border-t border-[#ececec]">
            <StepHeader n={3} title="Ödeme" state={step === 3 ? 'active' : 'todo'} />

            {step === 3 && (
              <form onSubmit={handlePay} className="pl-[39px] mt-[22px]">
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="cc-number" className="block text-[13px] text-black mb-2">Kart Numarası</label>
                    <input
                      id="cc-number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      value={card.number}
                      onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-name" className="block text-[13px] text-black mb-2">Kart Üzerindeki İsim</label>
                    <input
                      id="cc-name"
                      autoComplete="cc-name"
                      value={card.name}
                      onChange={(e) => handleCardChange('name', e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cc-exp" className="block text-[13px] text-black mb-2">Son Kullanma Tarihi</label>
                      <input
                        id="cc-exp"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="AA/YY"
                        value={card.expiry}
                        onChange={(e) => handleCardChange('expiry', formatExpiry(e.target.value))}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cc-cvv" className="block text-[13px] text-black mb-2">CVV</label>
                      <input
                        id="cc-cvv"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <label className="mt-5 flex items-start gap-2 text-[13px] text-black cursor-pointer">
                  <input type="checkbox" checked={agree} onChange={(e) => { setError(''); setAgree(e.target.checked); }} className="mt-[3px] accent-black" />
                  <span>Ön bilgilendirme formunu ve satış sözleşmesini okudum, kabul ediyorum.</span>
                </label>

                {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}

                <button type="submit" className="mt-5 w-full h-[45px] rounded-[4px] bg-black text-white text-[14px] font-bold hover:bg-gray-800 cursor-pointer">
                  Siparişi Tamamla - {tl(grandTotal)}
                </button>
                <p className="mt-3 text-[12px] text-[#8e8e93]">Bu demo bir sipariştir, kartınızdan gerçek bir ödeme alınmaz.</p>
              </form>
            )}
          </section>

          <footer className="mt-auto py-8 flex items-center justify-center gap-3 text-[14px] text-[#8e8e93]">
            <a href="#" className="hover:underline">Para İade Politikası</a>
            <span>•</span>
            <a href="#" className="hover:underline">Gizlilik Politikası</a>
            <span>•</span>
            <a href="#" className="hover:underline">Hizmet Şartları</a>
          </footer>
        </div>
      </div>

      <aside className="bg-[#f6f6f8] px-4 lg:pl-[52px] lg:pr-0">
        <div className="w-full max-w-[483px] mx-auto lg:mx-0 pt-[48px] pb-12">
          <ul className="flex flex-col gap-5">
            {items.map((item, i) => (
              <li key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize}-${i}`} className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img src={item.product.image} alt={item.product.name} loading="lazy" decoding="async" className="w-[52px] h-[52px] object-cover rounded-[6px] bg-white border border-[#e6e6e6]" />
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#2323a8] text-white text-[11px] leading-5 text-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pl-1">
                  <p className="text-[12px] font-medium uppercase text-black">{item.product.name}</p>
                  <p className="mt-1.5 text-[10px] text-[#8e8e93]">
                    {[item.selectedFlavor, item.selectedSize?.toLocaleLowerCase('tr-TR')].filter(Boolean).join(' / ')}
                  </p>
                </div>
                <span className="text-[12px] text-black">{tl(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-[26px] border-t border-[#e6e6e9]">
            <div className="flex items-center justify-between py-[28px] text-[14px] text-[#8e8e93]">
              <span className="flex items-center gap-2">
                Ara Toplam
                <span title="İndirimler uygulanmadan önceki ürün toplamı" className="w-4 h-4 rounded-full bg-[#8e8e93] text-white text-[10px] leading-4 text-center cursor-help">
                  ?
                </span>
              </span>
              <span className="text-black">{tl(listTotal)}</span>
            </div>

            {step === 3 && (
              <div className="flex items-center justify-between pb-[20px] text-[14px] text-[#8e8e93]">
                <span>Kargo</span>
                <span className="text-black">{shippingPrice === 0 ? 'Ücretsiz' : tl(shippingPrice)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-[#e6e6e9] pt-[22px] flex items-center justify-between">
            <span className="text-[16px] font-bold text-black">Toplam</span>
            <span className="text-[18px] font-bold text-black">{tl(grandTotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
