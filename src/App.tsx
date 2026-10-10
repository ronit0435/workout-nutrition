
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import DemoOrdersButton from './components/DemoOrdersButton';
import { Header } from './components/common/Header';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { BackToTop } from './components/common/BackToTop';
import { ToastNotification } from './components/common/ToastNotification';
import { RecentBuyerPopup } from './components/common/RecentBuyerPopup';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { BrandPage } from './components/pages/BrandPage';
import { GoalPage } from './components/pages/GoalPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { ArticlePage } from './components/pages/ArticlePage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AccountPage } from './components/pages/AccountPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';

import {
  AboutPage,
  ContactPage,
  FAQPage,
  PolicyPage,
} from './components/pages/StaticPages';

// Demo order form
import DemoOrderForm from './components/DemoOrderForm';

const MainRouter: React.FC = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;

      case 'shop':
        return <ShopPage />;

      case 'category':
        return <CategoryPage />;

      case 'brand':
        return <BrandPage />;

      case 'goal':
        return <GoalPage />;

      case 'product':
        return <ProductDetailPage />;

      case 'article':
        return <ArticlePage />;

      case 'cart':
        return <CartPage />;

      case 'checkout':
        return <CheckoutPage />;

      case 'wishlist':
        return <WishlistPage />;

      case 'account':
        return <AccountPage />;

      case 'track-order':
        return <OrderTrackingPage />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'faq':
        return <FAQPage />;

      case 'shipping-policy':
        return <PolicyPage type="shipping" />;

      case 'return-policy':
        return <PolicyPage type="return" />;

      case 'terms':
        return <PolicyPage type="terms" />;

      // Demo orders page
      case 'demo-orders':
        return (
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl">
              <div className="mb-6 text-center">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                  Development Demo
                </p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Demo Order Checkout
                </h1>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Test how customer orders are saved to Supabase.
                  No real payment will be taken.
                </p>
              </div>

              <DemoOrderForm />
            </div>
          </div>
        );

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-zinc-900 selection:bg-red-600 selection:text-white">
      {/* Main header */}
      <Header />
      <DemoOrdersButton />
      {/* Main page content */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile navigation */}
      <MobileBottomBar />

      {/* Overlays and drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <RecentBuyerPopup />
      <FloatingWhatsApp />
      <BackToTop />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}