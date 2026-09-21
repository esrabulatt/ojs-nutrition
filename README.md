# OJS Nutrition

Spor takviyesi satan bir e-ticaret sitesinin React ile geliştirilmiş ön yüzü (frontend). Ana sayfadan sipariş detayına kadar tam bir alışveriş yolculuğu sunar: ürün arama ve filtreleme, sepet, üyelik, adres yönetimi, ödeme akışı ve sipariş takibi.

> Bu bir ders projesidir. Ödeme, giriş ve veriler simüle edilmiştir; sunucu (backend) yoktur. Ayrıntılar için aşağıdaki [Sınırlılıklar](#sınırlılıklar) bölümüne bakın.

**Canlı demo:** [ojs-nutrition-canli.vercel.app](https://ojs-nutrition-canli.vercel.app/)

## Özellikler

- **Ürünler:** 28 ürün, 5 kategori (protein, spor gıdaları, sağlık, gıda, vitamin); kategori filtresi ve "daha fazla göster".
- **Arama:** Yazdıkça görselli sonuç listesi açılır; Türkçe karakterlerden (İ/ı, ş, ğ...) bağımsız çalışır; ok tuşları, Enter ve Esc desteklenir.
- **Ürün detayı:** Aroma ve boyut seçimi, sepete ekleme, son bakılan ürünler.
- **Sepet:** Sağdan açılan çekmece; adet değiştirme, ürün silme. Sepet tarayıcıda saklanır, sayfa yenilense de kalır.
- **Üyelik:** Giriş Yap / Üye Ol sekmeleri, hesap bilgileri formu, telefon alanı (+90, yalnızca rakam).
- **Adresler:** Ekleme, düzenleme, silme (onaylı); adres yokken ve varken farklı görünüm.
- **Ödeme:** 3 adımlı akış (adres, kargo, ödeme); kart numarası ve son kullanma tarihi biçimlendirme, form doğrulama, seçilen adres ve kargo yönteminin hatırlanması.
- **Siparişler:** Sipariş listesi ve sipariş detay sayfası.
- **Diğer sayfalar:** Hakkımızda (sertifikalar, yorumlar), SSS, İletişim.
- **Mobil uyumlu:** Hesap menüsü, sepet ve arama küçük ekranlarda da kullanılabilir.
- **Performans:** Görseller `loading="lazy"` ile geç yüklenir, ilk görünen görseller öncelikli yüklenir; büyük görseller WebP'ye çevrilmiştir (yaklaşık 12 MB'tan 391 KB'a).

## Kullanılan teknolojiler

| Teknoloji | Kullanım amacı |
| --- | --- |
| React 19 + TypeScript | Bileşen tabanlı arayüz, tip güvenliği |
| Vite | Geliştirme sunucusu ve derleme |
| Tailwind CSS v4 | Stil |
| react-router-dom 7 | Sayfa yönlendirme |
| zustand 5 | Ortak durum yönetimi (sepet, kullanıcı, adres, sipariş) |
| blaze-slider | Kayan ürün listesi |

## Kurulum ve çalıştırma

Gereksinim: güncel bir Node.js (20.19 veya üzeri önerilir).

```bash
# bağımlılıkları yükle (projede pnpm kilit dosyası vardır; npm de çalışır)
pnpm install     # veya: npm install

# geliştirme sunucusunu başlat
pnpm dev         # veya: npm run dev

# üretim için derle (çıktı: dist/)
pnpm build       # veya: npm run build

# derlenmiş siteyi yerelde önizle
pnpm preview     # veya: npm run preview
```

## Sayfalar (rotalar)

| Adres | Sayfa |
| --- | --- |
| `/` | Ana sayfa |
| `/urunler` | Tüm ürünler (`?kategori=protein`, `?ara=whey`) |
| `/urun/:id` | Ürün detayı |
| `/sss`, `/iletisim`, `/hakkimizda` | SSS, İletişim, Hakkımızda |
| `/giris` | Giriş Yap / Üye Ol |
| `/hesabim` | Hesap bilgileri (`?sekme=siparisler`, `?sekme=adresler`) |
| `/hesabim/siparis/:id` | Sipariş detayı |
| `/odeme` | Ödeme (Header/Footer olmadan kendi düzeniyle) |

## Klasör yapısı

```
src/
├── pages/        Her adres için bir sayfa
├── components/   Tekrar kullanılan parçalar (Header, Footer, ProductCard, CartDrawer, SearchBox...)
├── store/        zustand store'ları (cart, user, address, order, recent)
├── data/         Örnek ürün ve sipariş verisi
├── hooks/        Özel React kancaları
├── utils/        Yardımcı fonksiyonlar (Türkçe arama için normalizeText)
├── services/     Örnek API verisi
└── types/        TypeScript tipleri

public/images/
├── optimized/    Sitede kullanılan hafif WebP görseller
└── originals/    Orijinal büyük görseller (yedek, siteye bağlı değil)
```

`App.tsx` ortak düzeni (Header + sayfa içeriği + Footer + Sepet) sağlar; sayfalar `Outlet` içinde açılır. `/odeme` sayfası bu düzenin dışındadır.

## Veriler nerede tutuluyor?

Sunucu olmadığı için veriler tarayıcının `localStorage` alanında saklanır:

| Anahtar | İçerik |
| --- | --- |
| `ojs-cart-v1` | Sepet |
| `ojs-user-v1` | Giriş yapan kullanıcı |
| `ojs-addresses-v1` | Kayıtlı adresler |
| `ojs-orders-v1` | Verilen siparişler |
| `ojs-checkout-v1` | Ödemede seçilen adres ve kargo yöntemi |

Kart bilgileri hiçbir yerde saklanmaz; siparişte yalnızca kartın son 2 hanesi maskeli olarak tutulur.

## Sınırlılıklar

- Ödeme **simülasyondur**, gerçek ödeme alınmaz. Gerçek ödeme için bir ödeme sağlayıcısı (iyzico, PayTR, Stripe vb.), bir sunucu ve 3D Secure gerekir.
- Giriş **sahtedir**: şifre kontrol edilmez, sunucu yoktur.
- Veriler yalnızca kullanıcının kendi tarayıcısında durur; başka cihazlarla paylaşılmaz.
- Ürünler, fiyatlar, yorumlar ve SSS cevapları örnek veridir. Sertifika rozetleri çizimdir.
- Şehir ve ilçe alanları serbest metindir.

## Yazar

Esra Bulat
