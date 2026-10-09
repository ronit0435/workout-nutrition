import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { X, CheckCircle2 } from 'lucide-react';

interface PurchaseEvent {
  buyerName: string;
  location: string;
  timeAgo: string;
  productName: string;
  image: string;
  productId: string;
}

const RECENT_PURCHASES: PurchaseEvent[] = [
  {
    buyerName: 'Gurpreet B.',
    location: 'Chandigarh',
    timeAgo: '35 minutes ago',
    productName: 'Smart Combo: Whey 2kg + Creatine Monohydrate',
    image: PRODUCTS[0].images[0],
    productId: PRODUCTS[0].id,
  },
  {
    buyerName: 'Amanpreet S.',
    location: 'Mohali',
    timeAgo: '18 minutes ago',
    productName: 'MuscleTech Platinum 100% Micronized Creatine',
    image: PRODUCTS[1].images[0],
    productId: PRODUCTS[1].id,
  },
  {
    buyerName: 'Rohit M.',
    location: 'Sector 119, Balongi',
    timeAgo: '42 minutes ago',
    productName: 'Biozyme Performance Whey (Rich Chocolate)',
    image: PRODUCTS[2].images[0],
    productId: PRODUCTS[2].id,
  },
  {
    buyerName: 'Jaspreet K.',
    location: 'Ludhiana',
    timeAgo: '12 minutes ago',
    productName: 'C4 Original Explosive Pre-Workout (Icy Blue Razz)',
    image: PRODUCTS[4].images[0],
    productId: PRODUCTS[4].id,
  },
  {
    buyerName: 'Harinder D.',
    location: 'Sahibzada Ajit Singh Nagar',
    timeAgo: 'Just now',
    productName: 'Wellcore Pure Micronized Creatine (Mesh 200)',
    image: PRODUCTS[6].images[0],
    productId: PRODUCTS[6].id,
  },
  {
    buyerName: 'Vikram R.',
    location: 'New Delhi',
    timeAgo: '24 minutes ago',
    productName: 'Enteric-Coated Deep Sea Fish Oil Softgels',
    image: PRODUCTS[7].images[0],
    productId: PRODUCTS[7].id,
  },
];

export const RecentBuyerPopup: React.FC = () => {
  const { navigate } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Initial show after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Periodic loop: visible for 6s, hidden for 10s
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (!dismissed) {
          setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
          setIsVisible(true);
        }
      }, 10000);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [dismissed]);

  if (dismissed || !isVisible) return null;

  const current = RECENT_PURCHASES[currentIndex];

  const handleCardClick = () => {
    navigate('product', { productId: current.productId });
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-[370px] bg-white rounded-2xl p-3 shadow-2xl border border-zinc-200/90 flex items-center gap-3 animate-fade-in transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Dismiss Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
        aria-label="Close notification"
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center shadow-xs border border-zinc-200 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Buyer Name DP Avatar — First Letter Display Picture */}
      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 border-2 border-white ring-2 ring-red-100 uppercase select-none">
        {current.buyerName.charAt(0)}
      </div>

      {/* Buyer & Purchase Info matching Image 6 */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="text-xs text-zinc-800 leading-tight">
          <span className="font-bold text-zinc-950">{current.buyerName}</span>{' '}
          <span className="text-zinc-500 text-[11px]">from</span>{' '}
          <span className="font-semibold text-zinc-700">{current.location}</span>
        </div>

        <p className="font-body font-semibold text-xs text-zinc-900 truncate mt-0.5" title={current.productName}>
          Purchased {current.productName}
        </p>

        <div className="flex items-center gap-1.5 text-[10.5px] mt-1 font-body">
          <span className="text-zinc-400 font-normal">{current.timeAgo}</span>
          <span className="text-zinc-300">·</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Verified Purchase</span>
          </span>
        </div>
      </div>
    </div>
  );
};
