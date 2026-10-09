import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { VegTag } from './VegTag';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate,
  } = useStore();

  const [selectedFlavour, setSelectedFlavour] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isOutOfStock = product.stock === 0;
  const currentFlavour = selectedFlavour || product.flavours[0];
  const currentSize = selectedSize || product.sizes[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, currentFlavour, currentSize);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigate('product', { productId: product.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Area */}
        <div className="w-full md:w-1/2 bg-zinc-50 p-6 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-zinc-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`max-h-72 object-contain rounded-xl hover:scale-105 transition-transform duration-300 ${isOutOfStock ? 'grayscale-40' : ''}`}
            referrerPolicy="no-referrer"
          />
          {isOutOfStock ? (
            <span className="absolute top-4 left-4 bg-zinc-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
              OUT OF STOCK
            </span>
          ) : product.discount > 0 ? (
            <span className="absolute top-4 left-4 bg-red-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md">
              {product.discount}% OFF
            </span>
          ) : null}
        </div>

        {/* Details & Actions Area */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] uppercase font-bold text-red-600 tracking-wider">
                {product.brand}
              </span>
              <VegTag type={product.dietary} size="sm" />
            </div>

            <h3 className="font-product-name text-lg text-zinc-900 leading-tight mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-zinc-400">({product.reviewCount} Verified Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="font-price text-2xl text-zinc-950 tabular-nums">
                {formatCurrency(product.price)}
              </span>
              <span className="font-mono text-sm line-through text-zinc-400 tabular-nums">
                {formatCurrency(product.originalPrice)}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Save {formatCurrency(product.originalPrice - product.price)}
              </span>
            </div>

            {/* Flavour Options */}
            {product.flavours.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-bold text-zinc-700 mb-1.5">
                  Flavour: <span className="font-semibold text-red-600">{currentFlavour}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavours.map((flv) => (
                    <button
                      key={flv}
                      onClick={() => setSelectedFlavour(flv)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        currentFlavour === flv
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                      }`}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-bold text-zinc-700 mb-1.5">
                  Size: <span className="font-semibold text-red-600">{currentSize}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        currentSize === sz
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Benefits */}
            <div className="border-t border-zinc-100 pt-3 mb-4 space-y-1">
              {product.benefits.slice(0, 2).map((benefit, i) => (
                <div key={i} className="text-xs text-zinc-600 flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-2.5">
              {isOutOfStock ? (
                <button
                  disabled
                  className="flex-1 bg-zinc-200 text-zinc-400 font-btn text-xs uppercase tracking-wider py-3 px-4 rounded-xl cursor-not-allowed text-center"
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-btn text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="w-full text-xs text-zinc-500 hover:text-zinc-900 font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Full Nutrition Facts & Verified Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

