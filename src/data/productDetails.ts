// Ürün detay sayfası için yardımcı veriler

// Aroma kutucuğunun yanındaki renk
export const FLAVOR_COLORS: Record<string, string> = {
  Bisküvi: '#c9a66b',
  Çikolata: '#5a3a2a',
  Muz: '#f2d64b',
  'Salted Caramel': '#b5541c',
  'Choco Nut': '#7a4a1a',
  'Hindistan Cevizi': '#c9a66b',
  'Raspberry Cheesecake': '#c2385a',
  Çilek: '#c8323c',
  Vanilya: '#f1e2b8',
  Limon: '#f2e04b',
  Karpuz: '#e8586b',
  'Yeşil Elma': '#8fc74a',
  Şeftali: '#f6a877',
  Böğürtlen: '#5b2a6e',
};

export const DEFAULT_FLAVOR_COLOR = '#d4d4d4';

export const RATING_DISTRIBUTION = [
  { stars: 5, count: 9284 },
  { stars: 4, count: 1316 },
  { stars: 3, count: 226 },
  { stars: 2, count: 32 },
  { stars: 1, count: 11 },
];

export interface Review {
  id: number;
  name: string;
  date: string;
  title: string;
  text: string;
}

export const REVIEWS: Review[] = [
  { id: 1, name: 'EREN U.', date: '06/05/24', title: 'Her zamanki kalite. Teşekkürler', text: 'Her zamanki kalite. Teşekkürler' },
  { id: 2, name: 'Bahadır K.', date: '06/05/24', title: 'En iyi aroma', text: 'En iyi aroma' },
  { id: 3, name: 'Burhan K.', date: '05/05/24', title: 'Yıllardır en beğendiğim protein tozu', text: 'Yıllardır en beğendiğim protein tozu protein gr ne kadar düşük olsada' },
  { id: 4, name: 'Berke Ç.', date: '05/05/24', title: 'Beğendim.', text: 'Beğendim.' },
  { id: 5, name: 'Deniz C.', date: '05/05/24', title: 'Çok iyi tat', text: 'Çok iyi tat' },
  { id: 6, name: 'Burak B.', date: '05/05/24', title: 'Tadı harika, kesinlikle tavsiye ederim', text: 'Tadı harika, kesinlikle tavsiye ederim' },
  { id: 7, name: 'Fatih K.', date: '05/05/24', title: 'Fatih kaya', text: 'Çokonatlısı ve raspberry cheesecake lisi aşırı iyi tiramisu aromalısı gelirmi Seri üretime girerse aşırı iyi olur' },
  { id: 8, name: 'Berk Y.', date: '05/05/24', title: 'Gayet beğendim ve sürekli olarak', text: 'Gayet beğendim ve sürekli olarak kullanıyorum.' },
  { id: 9, name: 'Esat S.', date: '05/05/24', title: 'çok iyi urunden memnun oldum', text: 'çok iyi urunden memnun oldum' },
];
