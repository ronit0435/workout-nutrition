import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { BRANDS } from '../../data/brands';
import { ArrowRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const ShopTopBrandsSection: React.FC = () => {
  const { navigate } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'usa' | 'india' | 'protein'>('all');
  const [showAllBrands, setShowAllBrands] = useState(false);

  const handleBrandClick = (brandSlug: string) => {
    navigate('brand', { brandSlug });
  };

  // Brands that exist in the actual product database
  const availableBrandNames = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  const allExistingBrands = BRANDS.filter((b) => availableBrandNames.includes(b.name));
  const baseBrands = showAllBrands ? allExistingBrands : allExistingBrands.slice(0, 8);

  // Tab filter logic for interactive navigation bar
  const displayedBrands = baseBrands.filter((brand) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'usa') return brand.origin.includes('USA');
    if (activeTab === 'india') return brand.origin.includes('India');
    if (activeTab === 'protein') {
      return ['optimum-nutrition', 'muscletech', 'muscleblaze', 'dymatize'].includes(brand.slug);
    }
    return true;
  });

  return (
    <section className="py-16 bg-zinc-50/70 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Section Header Alignment */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest px-3.5 py-1 rounded-full bg-red-50 border border-red-200/70 font-mono mb-2.5 shadow-2xs">
            <Award className="w-3.5 h-3.5" />
            <span>AUTHORIZED PARTNERS</span>
          </div>

          <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
            AUTHORIZED GLOBAL &amp; INDIAN BRANDS
          </h2>

          <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-2 max-w-xl leading-relaxed">
            Every supplement imported through official distribution channels with genuine scratch-off verification codes and manufacturer warranties.
          </p>

          {/* Glassy & Round Section Navigation Bar */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200/80 shadow-xs gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
              }`}
            >
              All Brands (8)
            </button>
            <button
              onClick={() => setActiveTab('usa')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'usa'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
              }`}
            >
              USA Imports
            </button>
            <button
              onClick={() => setActiveTab('india')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'india'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
              }`}
            >
              Indian Nutrition
            </button>
            <button
              onClick={() => setActiveTab('protein')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'protein'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
              }`}
            >
              Protein Specialists
            </button>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4.5">
          {displayedBrands.map((brand) => {
            const count = PRODUCTS.filter((p) => p.brand === brand.name).length;
            return (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand.slug)}
                className="group bg-white hover:bg-white border border-zinc-200/80 hover:border-red-600/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-center text-center transition-all duration-300 card-hover hover:shadow-xl cursor-pointer select-none"
              >
                {/* Top Origin & Genuine Badge */}
                <div className="w-full flex justify-between items-center text-[10px] text-zinc-500">
                  <span className="bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded-full font-display font-bold text-[9px] uppercase">
                    {brand.origin}
                  </span>
                  <span className="text-zinc-600 font-display font-bold text-[9px] flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 inline" /> Verified
                  </span>
                </div>

                {/* Brand Logo/Mark & Title */}
                <div className="py-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white font-display font-bold text-xl flex items-center justify-center mx-auto mb-2.5 border border-zinc-800 group-hover:border-red-600 group-hover:scale-105 transition-all shadow-xs">
                    {brand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-zinc-950 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                    {brand.name}
                  </h3>
                  <div className="text-[11px] font-body text-zinc-500 mt-0.5 font-normal">
                    {count} {count === 1 ? 'Product' : 'Products'} Available
                  </div>
                </div>

                {/* Explore button */}
                <div className="w-full pt-3 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-xs font-display font-bold text-zinc-700 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                  <span>Explore Brand</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent line below for view more brand types */}
        <div className="mt-10 pt-8 border-t border-zinc-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-display font-bold uppercase tracking-wider text-zinc-500 text-center sm:text-left">
            OFFICIAL DISTRIBUTOR PARTNERS · PAN-INDIA VERIFIED
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <span>{showAllBrands ? 'Show Less Brands' : `View More Brand Types (${allExistingBrands.length}+ Brands)`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-500" />
            </button>

            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-300 text-xs font-display font-bold uppercase tracking-wider text-zinc-900 hover:text-red-600 transition-all cursor-pointer shadow-2xs"
            >
              <span>Browse All Brands in Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
