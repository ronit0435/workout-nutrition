import React, { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QuickCat {
  id: string;
  name: string;
  slug: string;
  badge: string;
  image: string;
  matchFn: (category: string) => boolean;
}

const QUICK_CATEGORIES: QuickCat[] = [
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    slug: 'whey-protein',
    badge: 'Muscle Growth',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Whey Protein',
  },
  {
    id: 'whey-isolate',
    name: 'Whey Isolate',
    slug: 'whey-isolate',
    badge: 'Pure 90% WPI',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Whey Isolate',
  },
  {
    id: 'creatine',
    name: 'Creatine',
    slug: 'creatine',
    badge: 'Raw Power & ATP',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Creatine',
  },
  {
    id: 'pre-workout',
    name: 'Pre-Workout',
    slug: 'pre-workout',
    badge: 'High Energy & Pump',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Pre Workout',
  },
  {
    id: 'mass-gainer',
    name: 'Mass Gainer',
    slug: 'mass-gainer',
    badge: 'Caloric Surplus',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Mass Gainer',
  },
  {
    id: 'bcaa-amino',
    name: 'BCAA & Amino',
    slug: 'bcaa-eaa',
    badge: 'Intra-Workout',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'BCAA & EAA' || c === 'Glutamine & Aminos',
  },
  {
    id: 'fish-oil-omega',
    name: 'Fish Oil & Omega',
    slug: 'fish-oil',
    badge: 'Joint & Heart Health',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Fish Oil',
  },
  {
    id: 'multivitamins',
    name: 'Multivitamins',
    slug: 'multivitamins',
    badge: 'Daily Vitality',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    matchFn: (c) => c === 'Multivitamins' || c === 'Health & Wellness',
  },
];

export const QuickCategoryStrip: React.FC = () => {
  const { products, navigate } = useStore();

  const handleCategoryClick = (slug: string) => {
    navigate('category', { categorySlug: slug });
  };

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    QUICK_CATEGORIES.forEach((cat) => {
      counts[cat.id] = products.filter((p) => cat.matchFn(p.category)).length;
    });
    return counts;
  }, [products]);

  return (
    <section className="py-12 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>SHOP BY CATEGORY</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-zinc-950 uppercase tracking-tight">
              POPULAR SUPPLEMENT DEPARTMENTS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Targeted sports nutrition categories with 100% genuine batch certificates
            </p>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-xs font-bold text-zinc-700 hover:text-red-600 flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-red-600" />
          </button>
        </div>

        {/* 8 Category Tiles Grid (SuppleMart styled rounded cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {QUICK_CATEGORIES.map((cat) => {
            const count = productCounts[cat.id] || 0;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="group bg-white rounded-2xl border border-zinc-200/90 p-3 sm:p-3.5 flex flex-col justify-between hover:-translate-y-1 hover:border-red-600 hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* Image container with zoom effect */}
                <div className="w-full aspect-square rounded-xl bg-zinc-100 overflow-hidden mb-3 relative flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Count Pill */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-mono font-bold text-zinc-700 px-1.5 py-0.5 rounded shadow-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {count} Items
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-heading font-black text-xs text-zinc-950 group-hover:text-red-600 transition-colors truncate">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-medium">
                    {cat.badge}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="pt-2.5 mt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400 group-hover:text-red-600 transition-colors">
                  <span className="font-semibold">Shop</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
