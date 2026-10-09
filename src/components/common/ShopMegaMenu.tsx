import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

interface ShopMegaMenuProps {
  onClose: () => void;
}

export const ShopMegaMenu: React.FC<ShopMegaMenuProps> = ({ onClose }) => {
  const { navigate } = useStore();

  const handleCategoryClick = (categorySlug: string) => {
    navigate('category', { categorySlug });
    onClose();
  };

  const handleShopAllClick = () => {
    navigate('shop');
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white text-zinc-900 border-b border-zinc-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: PROTEIN */}
          <div className="col-span-3 border-r border-zinc-100 pr-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-black text-sm tracking-wider uppercase text-zinc-900">
                PROTEIN
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-protein')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium"
                >
                  Whey Protein
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-isolate')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium flex items-center justify-between"
                >
                  <span>Whey Isolate</span>
                  <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Pure</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-protein')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Whey Concentrate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-isolate')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Hydrolyzed Whey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-protein')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Micellar Casein
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('whey-protein')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Plant & Vegan Protein
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: PERFORMANCE */}
          <div className="col-span-3 border-r border-zinc-100 pr-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-black text-sm tracking-wider uppercase text-zinc-900">
                PERFORMANCE
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('creatine')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium flex items-center justify-between"
                >
                  <span>Creatine Monohydrate</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Hot</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('pre-workout')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium"
                >
                  Pre-Workout & Energy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bcaa-eaa')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  BCAA & Essential Aminos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('glutamine-aminos')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  L-Glutamine & Citrulline
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('fat-burner')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Fat Burner & Shred
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: MASS & RECOVERY */}
          <div className="col-span-3 border-r border-zinc-100 pr-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h4 className="font-heading font-black text-sm tracking-wider uppercase text-zinc-900">
                MASS & WELLNESS
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('mass-gainer')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium"
                >
                  Mass Gainers & Carbs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('multivitamins')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full font-medium"
                >
                  Daily Multivitamins
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('fish-oil')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Triple Strength Fish Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('health-wellness')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  Joint Support & Collagen
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('health-wellness')}
                  className="text-zinc-600 hover:text-red-600 hover:translate-x-1 transition-all text-left block w-full"
                >
                  ZMA & Testosterone Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: FEATURED PROMO CARD */}
          <div className="col-span-3 flex flex-col justify-between bg-zinc-900 text-white p-5 rounded-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span>LIMITED TIME OFFER</span>
              </div>
              <h5 className="font-heading font-black text-lg text-white leading-tight mb-2">
                UP TO 60% OFF ATHLETE COMBOS
              </h5>
              <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                Stack Whey Protein with Creapure Creatine and save extra ₹500 with coupon code <span className="text-white font-mono font-bold bg-white/10 px-1 py-0.5 rounded">IRON10</span>.
              </p>
            </div>

            <button
              onClick={handleShopAllClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
