import React, { useState, useRef } from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote, Play, Pause } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate reviews to create a seamless infinite left-to-right sliding marquee
  const loopedReviews = [...REVIEWS, ...REVIEWS];

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-zinc-50 border-b border-zinc-200/80 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
              <Star className="w-4 h-4 fill-current" />
              <span>COMMUNITY REVIEWS</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              TRUSTED BY 25,000+ ATHLETES
            </h2>
            <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Real lifters, competitive powerlifters, and fitness enthusiasts across India.
            </p>
          </div>

          {/* Interactive controls: Auto-slide toggle & manual nudge buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume Auto Slide' : 'Pause Auto Slide'}
              aria-label={isPaused ? 'Resume Auto Slide' : 'Pause Auto Slide'}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                isPaused
                  ? 'border-red-600 bg-red-50 text-red-600 shadow-xs'
                  : 'border-zinc-300 hover:border-zinc-900 bg-white text-zinc-700'
              }`}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
              <span className="hidden md:inline">{isPaused ? 'Auto: Paused' : 'Auto: Sliding L→R'}</span>
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-2.5 rounded-xl border border-zinc-300 hover:border-red-600 hover:bg-white text-zinc-700 transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-2.5 rounded-xl border border-zinc-300 hover:border-red-600 hover:bg-white text-zinc-700 transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        SLIDER CONTAINER WITH EDGE FADE MASKS:
        - Fades smoothly from left (from-zinc-50 to transparent)
        - Fades with a wide 50% mask on the right side (from transparent to zinc-50)
      */}
      <div className="relative w-full">
        {/* Left Side Fade Gradient (blends cards seamlessly into container) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-44 bg-gradient-to-r from-zinc-50 via-zinc-50/85 to-transparent z-20" />

        {/* Right Side Fade Gradient (50% wide subtle fade mask) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-56 md:w-80 lg:w-[45%] bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent z-20" />

        {/* Continuous Automatic Sliding Track Moving Left to Right */}
        <div
          ref={trackRef}
          className="w-full overflow-x-auto scrollbar-none py-4 px-4 sm:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-stretch gap-5 sm:gap-6 ${
              !isPaused ? 'animate-marquee-reverse' : ''
            }`}
            style={{
              width: 'max-content',
              animationDuration: '45s',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {loopedReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[300px] sm:w-[380px] md:w-[410px] shrink-0 bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between card-hover select-none"
              >
                <div>
                  {/* Top Bar: 5-Star Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-xs font-bold text-zinc-900 ml-1.5 font-mono">5.0</span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Comment Quote */}
                  <p className="font-body text-xs sm:text-[13px] text-zinc-700 leading-relaxed italic mb-4">
                    "{review.comment}"
                  </p>

                  {/* Verified Product Tag */}
                  {review.productName && (
                    <div className="mb-4 inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/70 text-zinc-600 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg max-w-full truncate">
                      <span className="text-red-600 font-bold shrink-0">Stack:</span>
                      <span className="truncate">{review.productName}</span>
                    </div>
                  )}
                </div>

                {/* Bottom User Info with Name Letter DP */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* DP letter circle matching buyer popup */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-white ring-2 ring-red-100 uppercase shadow-xs">
                      {review.author.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-zinc-950 uppercase truncate">
                        {review.author}
                      </h4>
                      <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                        {review.city} · {review.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-1 rounded-full shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
