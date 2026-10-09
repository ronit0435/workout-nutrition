import React from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { BRANDS } from '../../data/brands';
import { ArrowRight, Target, Award } from 'lucide-react';

interface CategoriesMegaMenuProps {
  onClose: () => void;
}

export const CategoriesMegaMenu: React.FC<CategoriesMegaMenuProps> = ({ onClose }) => {
  const { navigate } = useStore();

  // Dynamically compute brands that actually exist in the products database
  const availableBrandNames = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  const dynamicBrands = BRANDS.filter((b) => availableBrandNames.includes(b.name));

  const handleCategoryClick = (categorySlug: string) => {
    navigate('category', { categorySlug });
    onClose();
  };

  const handleGoalClick = (goalSlug: string) => {
    navigate('goal', { goalSlug });
    onClose();
  };

  const handleBrandClick = (brandSlug: string) => {
    navigate('brand', { brandSlug });
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="max-w-7xl mx-auto px-4 sm:px-6 mt-1 pointer-events-auto"
    >
      <div className="rounded-3xl bg-white/98 backdrop-blur-2xl text-zinc-900 border border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 sm:p-7">
        <div className="grid grid-cols-12 gap-5 lg:gap-6">
          {/* Column 1: PROTEIN (2 cols) */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2 border-b sm:border-b-0 sm:border-r border-zinc-100 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 mb-3 text-zinc-950">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900">
                PROTEIN
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-protein')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Whey Protein
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-isolate')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>Whey Isolate</span>
                  <span className="text-[9px] uppercase font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200/60">
                    Pure
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('mass-gainer')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Mass Gainer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: PERFORMANCE (2 cols) */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2 border-b sm:border-b-0 sm:border-r border-zinc-100 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 mb-3 text-zinc-950">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900">
                PERFORMANCE
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('creatine')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>Creatine</span>
                  <span className="text-[9px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                    Top
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('pre-workout')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Pre Workout
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bcaa-eaa')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  BCAA / EAA
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('glutamine-aminos')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Amino &amp; Glutamine
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HEALTH & WELLNESS (2 cols) */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2 border-b sm:border-b-0 sm:border-r border-zinc-100 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 mb-3 text-zinc-950">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900">
                HEALTH &amp; WELLNESS
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('multivitamins')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Multivitamins
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('fish-oil')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Fish Oil &amp; Omega 3
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('health-wellness')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Joint Support &amp; Collagen
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('health-wellness')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium cursor-pointer"
                >
                  Other Wellness
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: SHOP BY GOAL (2 cols) */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2 border-b sm:border-b-0 sm:border-r border-zinc-100 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1.5 mb-3 text-zinc-950">
              <Target className="w-3.5 h-3.5 text-red-600" />
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900">
                SHOP BY GOAL
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs">
              {[
                { slug: 'build-muscle', label: 'Muscle Gain' },
                { slug: 'gain-weight', label: 'Weight Gain' },
                { slug: 'lose-fat', label: 'Fat Loss' },
                { slug: 'increase-strength', label: 'Strength' },
                { slug: 'boost-energy', label: 'Energy' },
                { slug: 'recovery', label: 'Recovery' },
                { slug: 'health-wellness', label: 'General Wellness' },
              ].map((g) => (
                <li key={g.slug}>
                  <button
                    onClick={() => handleGoalClick(g.slug)}
                    className="text-zinc-600 hover:text-red-600 hover:translate-x-0.5 transition-all text-left block w-full text-[11.5px] font-medium cursor-pointer"
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: SHOP BY BRAND (4 cols) — Clean alignment, NO bottom horizontal scrollbar! */}
          <div className="col-span-12 md:col-span-4 pl-0 md:pl-2 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-600" />
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900">
                    SHOP BY BRAND
                  </h4>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 rounded-full bg-zinc-100">
                  {dynamicBrands.length} Verified Brands
                </span>
              </div>

              {/* Dynamic Brands List: Strict overflow-x-hidden, smooth vertical scroll, no horizontal scrollbar */}
              <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto overflow-x-hidden pr-1.5">
                {dynamicBrands.map((brand) => {
                  const count = PRODUCTS.filter((p) => p.brand === brand.name).length;
                  return (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandClick(brand.slug)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-50 hover:bg-red-50 hover:border-red-500/40 border border-zinc-200/70 text-left transition-all flex items-center justify-between text-xs cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors uppercase">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </span>
                        <span className="font-semibold text-zinc-900 group-hover:text-red-600 transition-colors truncate">
                          {brand.name}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-zinc-500 font-medium shrink-0 group-hover:text-red-600 px-2 py-0.5 rounded-full bg-white border border-zinc-200/60 shadow-2xs">
                        {count} {count === 1 ? 'Product' : 'Products'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => {
                  navigate('shop');
                  onClose();
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer uppercase tracking-wide group"
              >
                <span>Browse All {PRODUCTS.length} Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
