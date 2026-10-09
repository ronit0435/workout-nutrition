/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
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
import { AboutPage, ContactPage, FAQPage, PolicyPage } from './components/pages/StaticPages';

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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-zinc-900 selection:bg-red-600 selection:text-white">
      {/* 1. Main Sticky Header with Directional Scroll Detection, Glassy & Round Aesthetic */}
      <Header />

      {/* 3. Main Page Content */}
      <main className="flex-1 w-full">{renderPage()}</main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Sticky Mobile Bottom Navigation */}
      <MobileBottomBar />

      {/* Overlays & Drawers */}
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
