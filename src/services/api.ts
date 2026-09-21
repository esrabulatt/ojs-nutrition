import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'WHEY PROTEIN',
    shortDescription: 'EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ',
    price: 549,
    rating: 5,
    reviewCount: 10889,
    image:'/images/image2.png',
    category: 'protein',
  },
  {
    id: '2',
    name: 'FITNESS PAKETİ',
    shortDescription: 'EN POPÜLER ÜRÜNLER BİR ARADA',
    price: 799,
    originalPrice: 1126,
    discountRate: '%29',
    rating: 5,
    reviewCount: 7650,
    image: '/images/image3.png',
    category: 'paket',
  },
  {
    id: '3',
    name: 'GÜNLÜK VİTAMİN PAKETİ',
    shortDescription: 'EN SIK TÜKETİLEN TAKVİYELER',
    price: 549,
    originalPrice: 717,
    discountRate: '%23',
    rating: 5,
    reviewCount: 5013,
    image: '/images/image4.png',
    category: 'vitamin',
  },
  {
    id: '4',
    name: 'PRE-WORKOUT SUPREME',
    shortDescription: 'ANTRENMAN ÖNCESİ TAKVİYESİ',
    price: 399,
    rating: 5,
    reviewCount: 6738,
    image: '/images/image5.png',
    category: 'spor',
  },
  {
    id: '5',
    name: 'CREAM OF RICE',
    shortDescription: 'EN LEZZETLİ PİRİNÇ KREMASI',
    price: 239,
    rating: 5,
    reviewCount: 5216,
    image: '/images/image6.png',
    category: 'gida',
  },
  {
    id: '6',
    name: 'CREATINE',
    shortDescription: 'EN POPÜLER SPORCU TAKVİYESİ',
    price: 239,
    rating: 5,
    reviewCount: 8558,
    image: '/images/image7.png',
    category: 'spor',
  },
  {
    id: '7',
    name: 'BCAA 2:1:1',
    shortDescription: 'KAS ONARIMI VE YENİLENME',
    price: 349,
    rating: 5,
    reviewCount: 3410,
    image: '/images/image8.png',
    category: 'spor',
  },
  {
    id: '8',
    name: 'ZMA COMPLEX',
    shortDescription: 'MİNERAL VE VİTAMİN DESTEĞİ',
    price: 199,
    rating: 5,
    reviewCount: 1890,
    image: '/images/image9.png',
    category: 'vitamin',
  },
];

// App.tsx'in beklediği asenkron fonksiyon
export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 100);
  });
}