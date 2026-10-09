import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigate } = useStore();

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">My Wishlist</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              MY WISHLIST ({wishlist.length})
            </h1>
            <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Your saved supplements. Move items into your cart anytime to check out.
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-black text-lg text-zinc-900 mb-1">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Tap the heart icon on any product to save it to your personal wishlist.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="bg-red-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl cursor-pointer"
            >
              Explore Supplements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
