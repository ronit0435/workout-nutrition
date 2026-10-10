import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Flame, ArrowRight } from 'lucide-react';

const TABS = [
  { id: 'ALL', label: 'All Best Sellers' },
  { id: 'WHEY', label: 'Whey Protein' },
  { id: 'CREATINE', label: 'Creatine' },
  { id: 'PRE-WORKOUT', label: 'Pre-Workout' },
  { id: 'GAINERS', label: 'Mass Gainers' },
];

export const BestSellersSection: React.FC = () => {
  const { products, navigate } = useStore();
  const [activeTab, setActiveTab] = useState('ALL');

  // Filter products based on tab
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'ALL') return p.isBestSeller;
    if (activeTab === 'WHEY') return p.category === 'Whey Protein' || p.category === 'Whey Isolate';
    if (activeTab === 'CREATINE') return p.category === 'Creatine';
    if (activeTab === 'PRE-WORKOUT') return p.category === 'Pre Workout';
    if (activeTab === 'GAINERS') return p.category === 'Mass Gainer';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-16 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Title & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
              <Flame className="w-4 h-4 fill-current" />
              <span>HANDPICKED SPORTS NUTRITION</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              FEATURED PRODUCTS
            </h2>
            <p className="font-body text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Top authentic supplements athletes and lifters are choosing right now.
            </p>
          </div>

          {/* Filter Tabs — Smooth responsive scroll on mobile, perfect alignment on desktop */}
          <div className="flex items-center gap-1.5 bg-zinc-200/70 p-1.5 rounded-full self-start md:self-auto max-w-full overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-black hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-black text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <span>Explore All 40+ Authentic Supplements</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
