import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { BRANDS } from '../../data/brands';
import { CATEGORIES } from '../../data/categories';
import { formatCurrency } from '../../utils/formatters';
import { Search, X, Flame, ArrowRight, Tag, Star } from 'lucide-react';

const POPULAR_SEARCHES = [
  'Whey Protein',
  'Creatine Monohydrate',
  'Pre Workout',
  'Mass Gainer',
  'BCAA',
  'Multivitamins',
  'Fish Oil',
  'Iso-Zero',
];

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_recent_searches');
      return saved ? JSON.parse(saved) : ['Optimum Nutrition', 'Creatine', 'Iso 100'];
    } catch {
      return ['Optimum Nutrition', 'Creatine', 'Iso 100'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  if (!searchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Dynamic filter results
  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.subcategory.toLowerCase().includes(trimmed) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const matchedBrands = trimmed
    ? BRANDS.filter((b) => b.name.toLowerCase().includes(trimmed) || b.tagline.toLowerCase().includes(trimmed)).slice(0, 4)
    : [];

  const matchedCategories = trimmed
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.subcategories.some((sc) => sc.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  const handleSelectSearchTerm = (term: string) => {
    // Add to recents
    const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('ironforge_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    navigate('shop', { searchQuery: term });
    setSearchOpen(false);
  };

  const handleProductClick = (productId: string) => {
    navigate('product', { productId });
    setSearchOpen(false);
  };

  const handleBrandClick = (brandSlug: string) => {
    navigate('brand', { brandSlug });
    setSearchOpen(false);
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate('category', { categorySlug });
    setSearchOpen(false);
  };

  const clearRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem('ironforge_recent_searches');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Search Container */}
      <div className="w-full bg-white shadow-2xl border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {/* Top Row with input & close */}
          <div className="flex items-center gap-3 relative">
            <Search className="w-6 h-6 text-zinc-400 absolute left-4 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  handleSelectSearchTerm(query.trim());
                }
              }}
              placeholder="Search whey, creatine, pre-workout, gainer..."
              className="w-full bg-zinc-100/80 border border-zinc-300 focus:border-red-600 focus:bg-white text-zinc-900 placeholder:text-zinc-400 text-base sm:text-lg rounded-xl pl-12 pr-12 py-3.5 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-14 text-zinc-400 hover:text-zinc-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              title="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Content Area */}
          <div className="mt-6 max-h-[70vh] overflow-y-auto pr-1">
            {trimmed ? (
              // Active search results
              <div className="space-y-6">
                {matchedProducts.length === 0 && matchedBrands.length === 0 && matchedCategories.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-zinc-500 text-sm">
                      No matching supplements found for <span className="font-semibold text-zinc-800">"{query}"</span>.
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Try searching for "whey", "creatine", "isolate", or "pre-workout".
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Category suggestions */}
                    {matchedCategories.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                          Categories
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {matchedCategories.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => handleCategoryClick(c.slug)}
                              className="px-3 py-1.5 bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Tag className="w-3 h-3 text-red-500" />
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brand suggestions */}
                    {matchedBrands.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                          Brands
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {matchedBrands.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => handleBrandClick(b.slug)}
                              className="p-2.5 bg-zinc-50 hover:bg-red-50 hover:border-red-300 border border-zinc-200/60 rounded-lg text-left transition-colors cursor-pointer"
                            >
                              <div className="text-xs font-bold text-zinc-900 truncate">{b.name}</div>
                              <div className="text-[10px] text-zinc-400">{b.origin}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product suggestions */}
                    {matchedProducts.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            Products ({matchedProducts.length})
                          </span>
                          <button
                            onClick={() => handleSelectSearchTerm(query)}
                            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View all results</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden bg-white">
                          {matchedProducts.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => handleProductClick(p.id)}
                              className="p-3 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-zinc-100 p-1 flex items-center justify-center shrink-0 border border-zinc-200/60 overflow-hidden">
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div>
                                  <div className="text-[10px] uppercase font-bold tracking-wider text-red-600">
                                    {p.brand}
                                  </div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-1">
                                    {p.name}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500">
                                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                      <Star className="w-3 h-3 fill-current" />
                                      {p.rating}
                                    </span>
                                    <span>·</span>
                                    <span>{p.category}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0 pl-3">
                                <div className="font-mono font-bold text-xs sm:text-sm text-zinc-900 tabular-nums">
                                  {formatCurrency(p.price)}
                                </div>
                                <div className="text-[10px] line-through text-zinc-400 tabular-nums">
                                  {formatCurrency(p.originalPrice)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              // Default state: Popular & Recent Searches
              <div className="space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Recent Searches
                      </span>
                      <button
                        onClick={clearRecents}
                        className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectSearchTerm(term)}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                    <Flame className="w-3.5 h-3.5 text-red-600" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearchTerm(term)}
                        className="px-3.5 py-1.5 border border-zinc-200 hover:border-red-600 hover:text-red-600 hover:bg-red-50/50 text-zinc-700 text-xs font-medium rounded-lg transition-all cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Trending Products */}
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                    Trending Right Now
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PRODUCTS.slice(0, 3).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleProductClick(p.id)}
                        className="p-3 bg-zinc-50 border border-zinc-200/60 rounded-xl hover:border-red-600/40 hover:bg-white text-left transition-all flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <div className="text-[10px] text-red-600 font-bold uppercase truncate">
                            {p.brand}
                          </div>
                          <div className="text-xs font-semibold text-zinc-900 truncate group-hover:text-red-600 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-xs font-bold text-zinc-900 font-mono mt-0.5 tabular-nums">
                            {formatCurrency(p.price)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dimmed backdrop click to close */}
      <div className="flex-1 cursor-pointer" onClick={() => setSearchOpen(false)} />
    </div>
  );
};
