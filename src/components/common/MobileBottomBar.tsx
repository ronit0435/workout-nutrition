import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentPage, navigate, cartCount, wishlist, setSearchOpen, setCartOpen } = useStore();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => navigate('home')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition-colors ${
          currentPage === 'home' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>HOME</span>
      </button>

      <button
        onClick={() => navigate('shop')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition-colors ${
          currentPage === 'shop' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span>SHOP</span>
      </button>

      <button
        onClick={() => setSearchOpen(true)}
        className="flex flex-col items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 cursor-pointer"
      >
        <Search className="w-5 h-5" />
        <span>SEARCH</span>
      </button>

      <button
        onClick={() => navigate('wishlist')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold relative cursor-pointer transition-colors ${
          currentPage === 'wishlist' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-900'
        }`}
      >
        <Heart className="w-5 h-5" />
        <span>WISHLIST</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-mono">
            {wishlist.length}
          </span>
        )}
      </button>

      <button
        onClick={() => setCartOpen(true)}
        className="flex flex-col items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 relative cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>CART</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-mono">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
