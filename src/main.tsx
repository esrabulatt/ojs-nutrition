import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import FAQPage from './pages/FAQPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import AccountPage from './pages/AccountPage.tsx';
import OrderDetailPage from './pages/OrderDetailPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import './index.css';

// App = ortak düzen (Header + Footer + Sepet), sayfalar Outlet içinde açılır
const router = createBrowserRouter([
  // Ödeme sayfası kendi düzenine sahip (Header/Footer yok), bu yüzden App'in dışında
  { path: '/odeme', element: <CheckoutPage /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'urunler', element: <ProductsPage /> },
      { path: 'urun/:id', element: <ProductDetailPage /> },
      { path: 'sss', element: <FAQPage /> },
      { path: 'iletisim', element: <ContactPage /> },
      { path: 'hakkimizda', element: <AboutPage /> },
      { path: 'giris', element: <AuthPage /> },
      { path: 'hesabim', element: <AccountPage /> },
      { path: 'hesabim/siparis/:id', element: <OrderDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);