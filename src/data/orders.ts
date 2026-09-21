export interface OrderItem {
  name: string;
  quantity: number;
  price: number; 
  size: string; 
  image: string;
}

export interface Order {
  id: string;
  date: string; 
  status: string;
  items: OrderItem[];
  address: { fullName: string; lines: string[] };
  payment: { method: string; maskedCard: string };
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    discountLabel: string;
    discount: number;
    total: number;
  };
  shipping: { carrier: string; trackingNo: string };
}

export const ORDERS: Order[] = [
  {
    id: '290405',
    date: '2022-12-14',
    status: 'Teslim Edildi',
    items: [
      { name: 'MELATONIN', quantity: 2, price: 62, size: '1 KUTU', image: '/images/image9.png' },
      { name: 'GÜNLÜK VİTAMİN PAKETİ', quantity: 1, price: 449, size: '1 Paket x 2 Adet', image: '/images/image12.png' },
      { name: 'BROMELAIN', quantity: 1, price: 197, size: '1 KUTU x 2 Adet', image: '/images/image13.png' },
    ],
    address: {
      fullName: 'Uğur İLTER',
      lines: ['Barbaros, Nidakule Ataşehir Batı,', 'Begonya Sk. No: 1/2, 34746', 'Ataşehir/İstanbul'],
    },
    payment: { method: 'Kredi Kartı', maskedCard: '**** **** **** **61' },
    summary: { subtotal: 856, shipping: 0, tax: 8, discountLabel: 'Yüzde 10 indirimi', discount: 86, total: 770 },
    shipping: { carrier: 'hepsiJet', trackingNo: 'HJ2192904051' },
  },
];

export const getOrder = (id: string | undefined) => ORDERS.find((o) => o.id === id);

export const formatOrderDate = (iso: string) =>
  new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatTL = (n: number) => `${n} TL`;
