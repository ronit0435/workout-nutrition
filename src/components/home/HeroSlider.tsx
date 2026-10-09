import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Flame, ArrowRight } from 'lucide-react';
import { RunningTickerStrip } from '../common/RunningTickerStrip';

// Imported generated hero images
import heroSlide1 from '../../assets/images/hero_athlete_training_1791377063699.jpg';
import heroSlide2 from '../../assets/images/hero_whey_protein_1791377076493.jpg';
import heroSlide3 from '../../assets/images/hero_preworkout_power_1791377089486.jpg';
import heroSlide4 from '../../assets/images/hero_top_brands_collection_1791377100577.jpg';

interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  titleTop: string;
  titleHighlight: string;
  subtitle: string;
  primaryBtnText: string;
  primaryAction: () => void;
  secondaryBtnText?: string;
  secondaryAction?: () => void;
}

export const HeroSlider: React.FC = () => {
  const { navigate } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: 1,
      image: heroSlide1,
      badge: 'INDIA’S PREMIER ATHLETIC NUTRITION',
      titleTop: 'FUEL YOUR',
      titleHighlight: 'NEXT LEVEL.',
      subtitle: 'Premium Sports Nutrition for Serious Strength, Explosive Performance & Anabolic Recovery.',
      primaryBtnText: 'SHOP SUPPLEMENTS',
      primaryAction: () => navigate('shop'),
      secondaryBtnText: 'EXPLORE DEALS',
      secondaryAction: () => {
        const el = document.getElementById('deals-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('shop');
      },
    },
    {
      id: 2,
      image: heroSlide2,
      badge: '100% PURE ISOLATE & HYDROLYZED PEPTIDES',
      titleTop: 'BUILD MORE.',
      titleHighlight: 'RECOVER BETTER.',
      subtitle: 'Cross-flow microfiltered whey isolate delivering 27g pure protein and 6g BCAAs with zero lactose.',
      primaryBtnText: 'SHOP PROTEIN',
      primaryAction: () => navigate('category', { categorySlug: 'whey-protein' }),
    },
    {
      id: 3,
      image: heroSlide3,
      badge: 'HIGH STIMULANT ENERGY & NITRIC OXIDE PUMPS',
      titleTop: 'TRAIN HARD.',
      titleHighlight: 'PERFORM HARDER.',
      subtitle: 'Clinically dosed pre-workouts and citrulline malate built to shatter personal bests on the bar.',
      primaryBtnText: 'SHOP PERFORMANCE',
      primaryAction: () => navigate('category', { categorySlug: 'pre-workout' }),
    },
    {
      id: 4,
      image: heroSlide4,
      badge: 'DIRECT IMPORTER VERIFIED BATCH GUARANTEE',
      titleTop: 'TOP BRANDS.',
      titleHighlight: 'AUTHENTIC PRODUCTS.',
      subtitle: 'Optimum Nutrition, MuscleTech, Dymatize, MuscleBlaze & 20+ authorized sports nutrition manufacturers.',
      primaryBtnText: 'SHOP TOP BRANDS',
      primaryAction: () => navigate('brand', { brandSlug: 'optimum-nutrition' }),
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Attached Pic Top of Hero Section: Running automatically left to right slideway */}
      <RunningTickerStrip />

      {/* 2. Hero Slider Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] bg-zinc-950 overflow-hidden select-none"
      >
        {/* Background Image Carousel with Smooth Transitions */}
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.titleTop}
              className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-7000 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Cinematic Scrim Gradient: ensures text has 10:1+ contrast on all viewports */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent lg:to-zinc-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
          </div>
        ))}

        {/* Slide Text Content */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg shadow-red-600/30 backdrop-blur-sm animate-fade-in">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{slide.badge}</span>
            </div>

            {/* Hero Heading: ALL CAPS, Bold Geometric, Compact Leading */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[72px] text-white tracking-tight leading-[1.05] mb-4 text-balance uppercase">
              {slide.titleTop} <br />
              <span className="text-red-500 drop-shadow-md">{slide.titleHighlight}</span>
            </h1>

            {/* Subtitle in Montserrat */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed mb-8 max-w-xl text-balance">
              {slide.subtitle}
            </p>

            {/* Action Buttons in Montserrat 600-700 */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={slide.primaryAction}
                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 sm:px-8 rounded-full shadow-xl shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{slide.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {slide.secondaryBtnText && slide.secondaryAction && (
                <button
                  onClick={slide.secondaryAction}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 sm:px-8 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  {slide.secondaryBtnText}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Note: Left and Right arrow buttons have been removed as requested by the user */}

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === currentSlide
                  ? 'w-8 h-2 bg-red-600'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
