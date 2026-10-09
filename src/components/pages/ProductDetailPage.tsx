import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { VegTag } from '../common/VegTag';
import { formatCurrency } from '../../utils/formatters';
import {
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  Heart,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Check,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  Sparkles,
  Info,
  AlertTriangle,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { routeParams, addToCart, toggleWishlist, isInWishlist, navigate } = useStore();

  const productId = routeParams.productId || PRODUCTS[0].id;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const isOutOfStock = product.stock === 0;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavours[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedFlavour, selectedSize);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedFlavour, selectedSize);
    navigate('checkout');
  };

  // Related products from same category or brand
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  // Fallback fitness guidance if not explicitly on product
  const whoIsItFor = product.whoIsItFor || [
    'Muscle building & recovery',
    'Strength & resistance training',
    'Meeting daily high-protein targets',
    'Active fitness lifestyle support',
  ];
  const whenToUse = product.whenToUse || 'Within 30–45 minutes following workouts, or between meals to hit daily macros.';
  const goalSupported = product.goalSupported || 'Supports muscle repair, tissue synthesis, and exercise recovery.';
  const authenticityInfo = product.authenticityDetails || 'Tamper-evident holographic importer seal with unique scratch-off SMS verification code directly on official brand portal.';

  return (
    <div className="bg-zinc-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:text-red-600 cursor-pointer">
            Supplements
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('category', { categorySlug: product.category.toLowerCase().replace(/\s+/g, '-') })}
            className="hover:text-red-600 cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* TOP SECTION: Gallery Left (5 cols) & Purchase Module Right (7 cols) */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className="relative aspect-square bg-zinc-50 rounded-2xl border border-zinc-200/80 p-6 sm:p-8 flex items-center justify-center overflow-hidden group select-none"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded shadow-xs">
                    SAVE {product.discount}%
                  </div>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 shadow-sm'
                      : 'bg-white/90 text-zinc-400 hover:text-red-600 shadow-xs'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ease-out ${
                    isZoomed ? 'scale-125 cursor-zoom-in' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />

                <span className="absolute bottom-3 right-3 text-[10px] text-zinc-400 bg-white/80 px-2 py-0.5 rounded font-mono hidden sm:inline">
                  Hover to zoom
                </span>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl bg-zinc-50 border p-2 overflow-hidden transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-red-600 ring-2 ring-red-600/20 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Details & Purchase Module */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Brand Link & Dietary Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    onClick={() => navigate('brand', { brandSlug: product.brand.toLowerCase().replace(/\s+/g, '-') })}
                    className="text-xs uppercase font-mono font-bold tracking-wider text-red-600 hover:underline cursor-pointer"
                  >
                    {product.brand} · OFFICIAL STORE
                  </button>

                  {/* Veg / Non-Veg Tag */}
                  <VegTag type={product.dietary} size="md" />
                </div>

                {/* Name: Montserrat 600 weight */}
                <h1 className="font-product-name text-2xl sm:text-3xl lg:text-4xl text-zinc-950 font-semibold tracking-tight leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating & Stock Status */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg font-semibold text-xs">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-normal">
                    <strong className="font-semibold text-zinc-800">{product.reviewCount}</strong> Verified Customer Reviews
                  </span>
                  <span className="text-zinc-300">·</span>
                  {isOutOfStock ? (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      OUT OF STOCK
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      IN STOCK ({product.stock} units available)
                    </span>
                  )}
                </div>

                {/* Price Box: Montserrat 700 weight */}
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 mb-6 flex flex-wrap items-baseline gap-3">
                  <span className="font-price text-3xl sm:text-4xl font-bold text-zinc-950 tabular-nums">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="font-price text-base line-through text-zinc-400 font-normal tabular-nums">
                    MRP: {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    SAVE {formatCurrency(product.originalPrice - product.price)} ({product.discount}% OFF)
                  </span>
                  <div className="w-full text-[11px] text-zinc-500 mt-1">
                    Inclusive of all GST. Free Pan-India delivery on orders above ₹999.
                  </div>
                </div>

                {/* Short Overview */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Flavour Selector */}
                {product.flavours.length > 0 && (
                  <div className="mb-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2 font-mono">
                      FLAVOUR: <span className="text-red-600 font-bold">{selectedFlavour}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.flavours.map((flv) => (
                        <button
                          key={flv}
                          onClick={() => setSelectedFlavour(flv)}
                          className={`text-xs px-3.5 py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                            selectedFlavour === flv
                              ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                          }`}
                        >
                          {flv}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size / Weight Selector */}
                {product.sizes.length > 0 && (
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2 font-mono">
                      SIZE / WEIGHT: <span className="text-red-600 font-bold">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`text-xs px-3.5 py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper & Buy Actions */}
                {isOutOfStock ? (
                  <div className="pt-2 mb-6 space-y-3">
                    <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-2xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-zinc-900 block">Currently Sold Out</span>
                        <span className="text-zinc-500">New batch arriving soon. Inquire for priority reservation.</span>
                      </div>
                      <button
                        onClick={() => navigate('contact')}
                        className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-xl font-btn text-xs uppercase cursor-pointer"
                      >
                        Notify Me
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        disabled
                        className="w-full bg-zinc-200 text-zinc-400 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-not-allowed text-center"
                      >
                        OUT OF STOCK
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 mb-6">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-zinc-200 rounded-xl bg-white p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-mono font-bold text-sm text-zinc-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white font-btn text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </button>

                    {/* Buy Now */}
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 w-full bg-zinc-950 hover:bg-black active:scale-98 text-white font-btn text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-red-500 fill-current" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-zinc-100 text-[11px] text-zinc-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Authentic</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-zinc-700 shrink-0" />
                    <span>COD Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-zinc-700 shrink-0" />
                    <span>Pan-India Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-zinc-700 shrink-0" />
                    <span>7 Days Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FITNESS GUIDANCE SECTION (WHO IS THIS FOR / WHEN TO USE) */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <h3 className="font-heading font-black text-lg text-zinc-950 uppercase tracking-tight">
              FITNESS GUIDANCE & USAGE SUITABILITY
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Who is it for? */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2 text-red-600 font-mono">
                WHO IS THIS PRODUCT FOR?
              </h4>
              <p className="text-[11px] text-zinc-500 mb-2">Designed for active lifters and athletes seeking:</p>
              <ul className="space-y-1.5 text-xs text-zinc-700">
                {whoIsItFor.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: When to use? */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2 text-red-600 font-mono">
                WHEN TO USE?
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {whenToUse}
              </p>
              <p className="text-[11px] text-zinc-500 mt-2">
                Tip: Mix with 200–250ml chilled water or skimmed milk in a shaker cup.
              </p>
            </div>

            {/* Box 3: What goal does it support? */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2 text-red-600 font-mono">
                WHAT GOAL DOES IT SUPPORT?
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {goalSupported}
              </p>
              <p className="text-[10px] text-zinc-400 italic mt-2">
                * Dietary supplements support training adaptation and are intended for use alongside a balanced diet.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILED INFORMATION ACCORDION / TABS */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 shadow-xs space-y-8">
          {/* Key Benefits (Responsible phrasing) */}
          <div>
            <h3 className="font-heading font-black text-base uppercase text-zinc-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>KEY BENEFITS & FORMULA ADVANTAGES</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-700">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Information & Ingredients Table */}
          <div className="pt-6 border-t border-zinc-100">
            <h3 className="font-heading font-black text-base uppercase text-zinc-950 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600" />
              <span>INGREDIENTS & NUTRITION FACTS ({product.servings} SERVINGS PER PACK)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Table */}
              <div className="md:col-span-7">
                <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200 text-xs">
                  <div className="bg-zinc-100 p-2.5 font-bold text-zinc-800 flex justify-between font-mono">
                    <span>Active Nutrient</span>
                    <span>Amount Per Serving</span>
                  </div>
                  {product.nutritionFacts.map((fact, i) => (
                    <div key={i} className="p-2.5 flex justify-between text-zinc-700 bg-white">
                      <span>{fact.nutrient}</span>
                      <span className="font-mono font-bold text-red-600">{fact.amountPerServing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients & Authenticity */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs space-y-1.5">
                  <h4 className="font-bold text-zinc-900 font-mono text-[11px] uppercase">
                    COMPREHENSIVE INGREDIENTS LIST
                  </h4>
                  <p className="text-zinc-600 leading-relaxed font-mono text-[11px]">
                    {product.ingredients}
                  </p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>AUTHENTICITY & VERIFICATION</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">
                    {authenticityInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="pt-6 border-t border-zinc-100 text-xs text-zinc-600 space-y-2">
            <h3 className="font-heading font-black text-base uppercase text-zinc-950 flex items-center gap-2">
              <Truck className="w-4 h-4 text-red-600" />
              <span>SHIPPING & TRANSIT GUARANTEE</span>
            </h3>
            <p>
              Dispatched same business day if ordered before 2:00 PM IST. Shipped in discreet, heavy-duty tamper-proof packaging.
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-zinc-950 uppercase tracking-tight">
                FREQUENTLY BOUGHT TOGETHER
              </h2>
              <button
                onClick={() => navigate('shop')}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Browse All Supplements →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
