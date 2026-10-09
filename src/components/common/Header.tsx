import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../../context/StoreContext';
import { CategoriesMegaMenu } from './CategoriesMegaMenu';
import { GOALS } from '../../data/goals';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Dumbbell,
  ShieldCheck,
  Truck,
  Phone,
  MessageCircle,
  Home,
  HelpCircle,
  FileText,
  Flame,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigate,
    cartCount,
    setCartOpen,
    setSearchOpen,
    wishlist,
  } = useStore();

  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'pages' | 'categories' | 'brands' | 'goals'>('pages');

  // Mobile drawer accordion states
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileGoalsOpen, setMobileGoalsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show when scrolling up, hide when scrolling down past 70px
      if (currentScrollY > 70 && currentScrollY > prevScrollY) {
        setVisible(false);
        setCategoriesMenuOpen(false);
      } else {
        setVisible(true);
      }
      setPrevScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Lock body scroll when mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (page: any, params?: any) => {
    setCategoriesMenuOpen(false);
    setMobileMenuOpen(false);
    navigate(page, params);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out px-2.5 sm:px-6 pt-2 pb-2 md:pt-2.5 md:pb-2 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* =========================================================================
          1. DESKTOP NAVBAR (hidden md:block)
          Preserved floating glassy pill, categories mega menu, and action icons.
         ========================================================================= */}
      <div className="hidden md:block">
        <div
          className={`max-w-7xl mx-auto rounded-full transition-all duration-300 border ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-white/70 shadow-[0_10px_35px_rgba(0,0,0,0.08)] py-2 px-6'
              : 'bg-white/80 backdrop-blur-lg backdrop-saturate-150 border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.05)] py-2.5 px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-black shadow-sm group-hover:bg-red-700 transition-colors">
                <Dumbbell className="w-4.5 h-4.5 -rotate-45" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-display font-normal text-xl tracking-wider text-zinc-950 group-hover:text-red-600 transition-colors uppercase">
                    WORKOUT
                  </span>
                  <span className="font-display font-normal text-xl tracking-wider text-red-600 ml-1 uppercase">
                    NUTRITION
                  </span>
                </div>
                <div className="text-[8px] font-medium tracking-widest uppercase text-zinc-400 -mt-0.5">
                  AUTHENTIC SPORTS SUPPLEMENTS
                </div>
              </div>
            </button>

            {/* Desktop Center Navigation Links */}
            <nav className="flex items-center gap-1 lg:gap-1.5 text-xs lg:text-[13px] font-medium text-zinc-700">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer hover:text-red-600 hover:bg-zinc-100/70 ${
                  currentPage === 'home'
                    ? 'bg-red-50 text-red-600 font-semibold shadow-2xs'
                    : 'text-zinc-700'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer hover:text-red-600 hover:bg-zinc-100/70 ${
                  currentPage === 'shop'
                    ? 'bg-red-50 text-red-600 font-semibold shadow-2xs'
                    : 'text-zinc-700'
                }`}
              >
                Shop
              </button>

              <div
                className="relative"
                onMouseEnter={() => setCategoriesMenuOpen(true)}
                onMouseLeave={() => setCategoriesMenuOpen(false)}
              >
                <button
                  onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)}
                  className={`px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-all cursor-pointer hover:text-red-600 hover:bg-zinc-100/70 ${
                    categoriesMenuOpen || currentPage === 'category'
                      ? 'bg-red-50 text-red-600 font-semibold shadow-2xs'
                      : 'text-zinc-700'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      categoriesMenuOpen ? 'rotate-180 text-red-600' : 'text-zinc-400'
                    }`}
                  />
                </button>

                {categoriesMenuOpen && (
                  <div className="fixed left-0 right-0 top-[58px] z-50">
                    <CategoriesMegaMenu onClose={() => setCategoriesMenuOpen(false)} />
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('about')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer hover:text-red-600 hover:bg-zinc-100/70 ${
                  currentPage === 'about'
                    ? 'bg-red-50 text-red-600 font-semibold shadow-2xs'
                    : 'text-zinc-700'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer hover:text-red-600 hover:bg-zinc-100/70 ${
                  currentPage === 'contact'
                    ? 'bg-red-50 text-red-600 font-semibold shadow-2xs'
                    : 'text-zinc-700'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop Action Icons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search Supplements"
                className="w-8.5 h-8.5 rounded-full bg-zinc-100/70 hover:bg-zinc-200/80 text-zinc-700 hover:text-red-600 flex items-center justify-center transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('account')}
                aria-label="My Account"
                className="w-8.5 h-8.5 rounded-full bg-zinc-100/70 hover:bg-zinc-200/80 text-zinc-700 hover:text-red-600 flex items-center justify-center transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('wishlist')}
                aria-label="My Wishlist"
                className="w-8.5 h-8.5 rounded-full bg-zinc-100/70 hover:bg-zinc-200/80 text-zinc-700 hover:text-red-600 flex items-center justify-center transition-all relative cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Shopping Cart"
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3.5 rounded-full font-bold transition-all shadow-md shadow-red-600/20 active:scale-95 cursor-pointer ml-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE NAVBAR (block md:hidden)
          Clean & minimal: 3-line hamburger menu + brand logo.
          Search, heart, cart and "100% genuine" badge removed per user requirements.
         ========================================================================= */}
      <div className="block md:hidden">
        <div
          className={`w-full rounded-2xl transition-all duration-300 border ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-zinc-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.08)] py-2 px-3'
              : 'bg-white/90 backdrop-blur-lg border-zinc-200/70 shadow-[0_2px_15px_rgba(0,0,0,0.04)] py-2 px-3'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Left: Mobile 3-line Hamburger Menu & Logo */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => {
                  setMobileActiveTab('pages');
                  setMobileMenuOpen(true);
                }}
                className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-900 flex items-center justify-center transition-all cursor-pointer shrink-0 border border-zinc-200/80 shadow-2xs"
                aria-label="Open Navigation Menu"
                title="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-zinc-900 stroke-[2.2]" />
              </button>

              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 group text-left cursor-pointer select-none min-w-0"
                aria-label="Workout Nutrition Home"
              >
                <div className="w-8.5 h-8.5 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:bg-red-700 transition-colors">
                  <Dumbbell className="w-4.5 h-4.5 -rotate-45" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline leading-none">
                    <span className="font-display font-normal text-xs sm:text-sm tracking-wide text-zinc-950 uppercase">
                      WORKOUT
                    </span>
                    <span className="font-display font-normal text-xs sm:text-sm tracking-wide text-red-600 ml-1 uppercase">
                      NUTRITION
                    </span>
                  </div>
                  <div className="text-[7px] sm:text-[7.5px] font-display font-semibold tracking-widest uppercase text-zinc-400 mt-0.5 truncate">
                    AUTHENTIC SUPPLEMENTS
                  </div>
                </div>
              </button>
            </div>

            {/* Right: "100% genuine" badge removed per user request */}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MOBILE NAVIGATION DRAWER (md:hidden)
          Rendered via Portal into body to ensure full unclipped viewport height.
          Search, Home, Shop, Wishlist, Cart removed from drawer as requested.
         ========================================================================= */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-[88vw] max-w-[360px] bg-white shadow-2xl flex flex-col z-50 animate-slide-left border-r border-zinc-200 h-full">
            {/* Drawer Header (100% genuine removed) */}
            <div className="p-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
                  <Dumbbell className="w-4.5 h-4.5 -rotate-45" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm tracking-wide text-zinc-950 uppercase leading-none">
                    WORKOUT <span className="text-red-600">NUTRITION</span>
                  </div>
                  <div className="text-[7.5px] font-display font-bold text-zinc-400 tracking-wider uppercase mt-0.5">
                    PREMIUM SPORTS NUTRITION
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8.5 h-8.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 active:scale-95 text-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Navigation Tabs (Pages / Categories / Brands / Goals) with site font style */}
            <div className="px-3 pt-2.5 pb-1 bg-white border-b border-zinc-100">
              <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-100 rounded-xl">
                <button
                  onClick={() => setMobileActiveTab('pages')}
                  className={`py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    mobileActiveTab === 'pages'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  PAGES
                </button>
                <button
                  onClick={() => setMobileActiveTab('categories')}
                  className={`py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    mobileActiveTab === 'categories'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  CATEGORY
                </button>
                <button
                  onClick={() => setMobileActiveTab('brands')}
                  className={`py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    mobileActiveTab === 'brands'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  BRANDS
                </button>
                <button
                  onClick={() => setMobileActiveTab('goals')}
                  className={`py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    mobileActiveTab === 'goals'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  GOALS
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 overscroll-contain">
              {/* ==============================================================
                  TAB 1: STORE PAGES
                  (Home, Shop, Search, Wishlist, Cart removed as requested)
                 ============================================================== */}
              {mobileActiveTab === 'pages' && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1 pb-1 flex items-center justify-between">
                    <span>STORE SERVICES &amp; PAGES</span>
                    <span className="text-[9px] text-red-600 font-display font-bold">DISCOVER</span>
                  </div>

                  {/* 1. Track Order Page */}
                  <button
                    onClick={() => handleNavClick('track-order')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                      currentPage === 'track-order'
                        ? 'bg-red-50/90 border-red-200 text-red-600 shadow-2xs'
                        : 'bg-zinc-50/60 border-zinc-200/70 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        currentPage === 'track-order' ? 'bg-red-600 text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                      }`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-display font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>Track Live Order</span>
                          <span className="text-[8px] bg-blue-100 text-blue-700 font-mono font-bold px-1.5 py-0.2 rounded">LIVE</span>
                        </div>
                        <div className="text-[10px] font-body text-zinc-500 truncate">
                          Real-Time Courier &amp; Dispatch Status
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${currentPage === 'track-order' ? 'text-red-600' : 'text-zinc-400'}`} />
                  </button>

                  {/* 2. Contact Us Page */}
                  <button
                    onClick={() => handleNavClick('contact')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                      currentPage === 'contact'
                        ? 'bg-red-50/90 border-red-200 text-red-600 shadow-2xs'
                        : 'bg-zinc-50/60 border-zinc-200/70 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        currentPage === 'contact' ? 'bg-red-600 text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                      }`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-display font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>Contact Us &amp; Support</span>
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.2 rounded">24/7 HELPDESK</span>
                        </div>
                        <div className="text-[10px] font-body text-zinc-500 truncate">
                          Gym Support, Hotline &amp; WhatsApp
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${currentPage === 'contact' ? 'text-red-600' : 'text-zinc-400'}`} />
                  </button>

                  {/* 3. About Us Page */}
                  <button
                    onClick={() => handleNavClick('about')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                      currentPage === 'about'
                        ? 'bg-red-50/90 border-red-200 text-red-600 shadow-2xs'
                        : 'bg-zinc-50/60 border-zinc-200/70 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        currentPage === 'about' ? 'bg-red-600 text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                      }`}>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-display font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>About Us &amp; Authenticity</span>
                          <span className="text-[8px] bg-zinc-200 text-zinc-800 font-mono font-bold px-1.5 py-0.2 rounded">DIRECT</span>
                        </div>
                        <div className="text-[10px] font-body text-zinc-500 truncate">
                          Official Importer &amp; Lab Testing Proof
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${currentPage === 'about' ? 'text-red-600' : 'text-zinc-400'}`} />
                  </button>

                  {/* 4. FAQ Page */}
                  <button
                    onClick={() => handleNavClick('faq')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                      currentPage === 'faq'
                        ? 'bg-red-50/90 border-red-200 text-red-600 shadow-2xs'
                        : 'bg-zinc-50/60 border-zinc-200/70 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        currentPage === 'faq' ? 'bg-red-600 text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-display font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>FAQs &amp; Guidance</span>
                        </div>
                        <div className="text-[10px] font-body text-zinc-500 truncate">
                          Authentication, Shipping &amp; Payments
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${currentPage === 'faq' ? 'text-red-600' : 'text-zinc-400'}`} />
                  </button>

                  {/* 5. My Account Page */}
                  <button
                    onClick={() => handleNavClick('account')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                      currentPage === 'account'
                        ? 'bg-red-50/90 border-red-200 text-red-600 shadow-2xs'
                        : 'bg-zinc-50/60 border-zinc-200/70 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        currentPage === 'account' ? 'bg-red-600 text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                      }`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-display font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>My Account</span>
                        </div>
                        <div className="text-[10px] font-body text-zinc-500 truncate">
                          Profile, Addresses &amp; Order History
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${currentPage === 'account' ? 'text-red-600' : 'text-zinc-400'}`} />
                  </button>

                  {/* Direct Catalog Shortcuts */}
                  <div className="pt-2 border-t border-zinc-200/80 space-y-1.5">
                    <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1">
                      CATALOG DIRECT ACCESS
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setMobileActiveTab('categories')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-center cursor-pointer border border-zinc-200/70 transition-all text-left"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-900 uppercase">Categories</div>
                        <div className="text-[8px] font-body text-zinc-500">8 Types</div>
                      </button>
                      <button
                        onClick={() => setMobileActiveTab('brands')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-center cursor-pointer border border-zinc-200/70 transition-all text-left"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-900 uppercase">Brands</div>
                        <div className="text-[8px] font-body text-zinc-500">Global &amp; India</div>
                      </button>
                      <button
                        onClick={() => setMobileActiveTab('goals')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-center cursor-pointer border border-zinc-200/70 transition-all text-left"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-900 uppercase">Goals</div>
                        <div className="text-[8px] font-body text-zinc-500">7 Stacks</div>
                      </button>
                    </div>
                  </div>

                  {/* Store Policies & Legal */}
                  <div className="pt-2 border-t border-zinc-200/80">
                    <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1 pb-1.5">
                      POLICIES &amp; LEGAL
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handleNavClick('shipping-policy')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-lg text-center cursor-pointer border border-zinc-200/60 transition-colors"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-800 uppercase leading-tight">
                          Shipping
                        </div>
                        <div className="text-[8px] font-body text-zinc-500">Pan-India</div>
                      </button>

                      <button
                        onClick={() => handleNavClick('return-policy')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-lg text-center cursor-pointer border border-zinc-200/60 transition-colors"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-800 uppercase leading-tight">
                          Returns
                        </div>
                        <div className="text-[8px] font-body text-zinc-500">7-Day Easy</div>
                      </button>

                      <button
                        onClick={() => handleNavClick('terms')}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-lg text-center cursor-pointer border border-zinc-200/60 transition-colors"
                      >
                        <div className="text-[10px] font-display font-bold text-zinc-800 uppercase leading-tight">
                          Terms
                        </div>
                        <div className="text-[8px] font-body text-zinc-500">Conditions</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 2: SUPPLEMENT CATEGORIES
                 ============================================================== */}
              {mobileActiveTab === 'categories' && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1 pb-1 flex items-center justify-between">
                    <span>SELECT SUPPLEMENT CATEGORY</span>
                    <span className="text-[9px] text-red-600 font-display font-bold">8 CATEGORIES</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { slug: 'whey-protein', label: 'Whey Protein', desc: 'Fast absorption', count: '16' },
                      { slug: 'whey-isolate', label: 'Whey Isolate', desc: 'Zero carb purity', count: '8' },
                      { slug: 'creatine', label: 'Creatine', desc: 'Strength & power', count: '10' },
                      { slug: 'pre-workout', label: 'Pre-Workout', desc: 'Pumps & laser focus', count: '9' },
                      { slug: 'mass-gainer', label: 'Mass Gainer', desc: 'Hardgainer bulk', count: '6' },
                      { slug: 'bcaa-eaa', label: 'BCAA & EAA', desc: 'Intra-workout aminos', count: '7' },
                      { slug: 'fish-oil', label: 'Fish Oil & Omega', desc: 'Joint & heart health', count: '5' },
                      { slug: 'multivitamins', label: 'Multivitamins', desc: 'Immunity & minerals', count: '6' },
                    ].map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => handleNavClick('category', { categorySlug: c.slug })}
                        className="p-2.5 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 rounded-xl border border-zinc-200/70 text-left transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="text-xs font-display font-bold uppercase tracking-wide text-zinc-900 group-hover:text-red-600 truncate">
                          {c.label}
                        </div>
                        <div className="text-[9px] font-body text-zinc-500 truncate mt-0.5">
                          {c.desc}
                        </div>
                        <div className="text-[8px] font-display font-bold text-red-600 mt-1 uppercase tracking-wider">
                          View Items →
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-200/90 text-center">
                    <button
                      onClick={() => handleNavClick('shop')}
                      className="w-full py-2.5 bg-zinc-950 text-white rounded-xl text-center text-xs font-display font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-xs"
                    >
                      Browse All Categories &amp; Products →
                    </button>
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 3: TOP GYM BRANDS
                  Clean, non-colorful design + line below for view more brand type
                 ============================================================== */}
              {mobileActiveTab === 'brands' && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1 pb-1 flex items-center justify-between">
                    <span>OFFICIAL BRAND PARTNERS</span>
                    <span className="text-[9px] text-zinc-500 font-display font-bold uppercase">VERIFIED</span>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { slug: 'muscleblaze', name: 'MuscleBlaze', origin: 'India #1', badge: 'Biozyme Series', desc: 'Clinically tested for 50% higher absorption' },
                      { slug: 'optimum-nutrition', name: 'Optimum Nutrition', origin: 'USA', badge: 'Gold Standard', desc: 'World’s #1 selling sports nutrition brand' },
                      { slug: 'dymatize', name: 'Dymatize', origin: 'USA', badge: 'ISO 100 Elite', desc: '100% hydrolyzed whey protein isolate' },
                      { slug: 'muscletech', name: 'MuscleTech', origin: 'USA', badge: 'Nitro-Tech', desc: 'Science-backed performance & creatine formulas' },
                      { slug: 'bsn', name: 'BSN', origin: 'USA', badge: 'Syntha-6', desc: 'Ultra-premium protein matrix & taste leader' },
                      { slug: 'applied-nutrition', name: 'Applied Nutrition', origin: 'UK', badge: 'ABE Elite', desc: 'Premium British engineered workout performance' },
                    ].map((b) => (
                      <button
                        key={b.slug}
                        onClick={() => handleNavClick('brand', { brandSlug: b.slug })}
                        className="w-full p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200/70 text-left transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-display font-bold uppercase tracking-wide text-zinc-950 group-hover:text-red-600">
                              {b.name}
                            </span>
                            <span className="text-[8px] bg-zinc-200 text-zinc-800 font-display font-bold px-1.5 py-0.2 rounded">
                              {b.origin}
                            </span>
                          </div>
                          <div className="text-[9.5px] font-body text-zinc-500 truncate mt-0.5">
                            {b.desc}
                          </div>
                        </div>
                        <span className="text-[9px] font-display font-bold text-red-600 uppercase tracking-wider shrink-0">
                          Shop →
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Line below for view more brand types */}
                  <div className="pt-3 border-t border-zinc-200/90 text-center">
                    <button
                      onClick={() => handleNavClick('shop')}
                      className="w-full py-2.5 px-3 rounded-xl border border-zinc-300 hover:border-red-600 bg-white hover:bg-zinc-50 text-xs font-display font-bold uppercase tracking-wider text-zinc-900 hover:text-red-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-2xs"
                    >
                      <span>View More Brand Types &amp; Products</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 4: FITNESS GOALS
                  Shows all goals like home page, dark athletic gym styling, NOT colorful
                 ============================================================== */}
              {mobileActiveTab === 'goals' && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-400 px-1 pb-1 flex items-center justify-between">
                    <span>SHOP BY FITNESS GOAL</span>
                    <span className="text-[9px] text-red-600 font-display font-bold uppercase">7 STACKS</span>
                  </div>

                  <div className="space-y-2">
                    {GOALS.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => handleNavClick('goal', { goalSlug: goal.slug })}
                        className="group relative rounded-xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 min-h-[90px] flex flex-col justify-end p-3 select-none border border-zinc-800/20"
                      >
                        {/* Background Image */}
                        <img
                          src={goal.heroImage}
                          alt={goal.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Dark Gradient Overlay (Athletic Dark, NOT colorful) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40 group-hover:from-zinc-950/95 transition-all" />

                        {/* Content */}
                        <div className="relative z-10 text-white flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <div className="text-[9px] font-display font-bold uppercase tracking-wider text-red-400">
                              {goal.subtitle}
                            </div>
                            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wide group-hover:text-red-400 transition-colors mt-0.5">
                              {goal.title}
                            </h4>
                            <p className="text-[9.5px] font-body text-zinc-300 line-clamp-1 mt-0.5">
                              {goal.description}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Line below for view all goals */}
                  <div className="pt-2 border-t border-zinc-200/90 text-center">
                    <button
                      onClick={() => handleNavClick('shop')}
                      className="w-full py-2.5 px-3 rounded-xl border border-zinc-300 hover:border-red-600 bg-white hover:bg-zinc-50 text-xs font-display font-bold uppercase tracking-wider text-zinc-900 hover:text-red-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-2xs"
                    >
                      <span>Explore All 7 Fitness Goal Stacks</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer: WhatsApp, Toll-Free & Direct Importer (100% genuine removed) */}
            <div className="p-3.5 bg-zinc-50 border-t border-zinc-200/80 space-y-2 shrink-0">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>

              <a
                href="tel:18002664554"
                className="flex items-center justify-center gap-1.5 text-[11px] font-display font-bold text-zinc-700 hover:text-zinc-950 transition-colors py-0.5 uppercase tracking-wide"
              >
                <Phone className="w-3 h-3 text-red-600" />
                <span>Toll-Free Helpline: 1800-266-4554</span>
              </a>

              <div className="flex items-center justify-center gap-1 text-[9.5px] font-display font-semibold text-zinc-400 tracking-wider uppercase pt-1 border-t border-zinc-200/60">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Direct Importer Authenticity · Batch Verified</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
