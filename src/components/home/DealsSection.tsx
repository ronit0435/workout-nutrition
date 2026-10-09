import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Flame, Clock, ArrowRight, Zap, Gift, ShieldCheck } from 'lucide-react';

export const DealsSection: React.FC = () => {
  const { navigate } = useStore();

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 21,
    minutes: 42,
    seconds: 16,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 8, hours: 21, minutes: 42, seconds: 16 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealCards = [
    {
      id: 'whey-deals',
      tag: 'UP TO 35% OFF',
      title: 'PREMIUM WHEY FLASH SALE',
      desc: 'Top gold standard & hydrolyzed isolates from Optimum Nutrition & Dymatize with free shaker.',
      actionSlug: 'whey-protein',
      bgGradient: 'from-zinc-900 to-red-950',
      badge: 'Protein Power',
    },
    {
      id: 'creatine-deals',
      tag: 'FLAT 50% OFF',
      title: 'CREATINE MONOHYDRATE MADNESS',
      desc: 'German Creapure & 200 Mesh micronized powders starting at just ₹749.',
      actionSlug: 'creatine',
      bgGradient: 'from-zinc-900 to-zinc-950',
      badge: 'Strength Surge',
    },
    {
      id: 'pre-deals',
      tag: 'UP TO 40% OFF',
      title: 'HIGH-STIM PRE-WORKOUTS',
      desc: 'Cellucor C4, Redcon1 Total War & GAT Nitraflex. Laser focus for heavy sessions.',
      actionSlug: 'pre-workout',
      bgGradient: 'from-red-950 to-zinc-900',
      badge: 'Nitric Pump',
    },
    {
      id: 'stack-deals',
      tag: 'EXTRA ₹500 OFF',
      title: 'CHAMPION COMBO STACKS',
      desc: 'Stack Whey + Creatine + Fish Oil. Use code IRON10 for extra 10% instant checkout discount.',
      actionSlug: 'shop',
      bgGradient: 'from-zinc-900 to-black',
      badge: 'Maximum Value',
    },
  ];

  return (
    <section id="deals-section" className="py-16 bg-zinc-950 text-white relative overflow-hidden select-none">
      {/* Background ambient red glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header & Countdown Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 mb-12 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-2 font-mono bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              <Flame className="w-4 h-4 fill-current" />
              <span>FLASH CAMPAIGN</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide">
              LIMITED TIME OFFERS
            </h2>
            <p className="font-body text-zinc-400 font-normal text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Grab authentic performance supplements at factory direct savings before promotional stock runs out.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-6 backdrop-blur-md">
            <div className="hidden sm:flex flex-col items-center pr-4 border-r border-zinc-800">
              <Clock className="w-6 h-6 text-red-500 mb-1" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">OFFER EXPIRES IN</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-center">
              <div className="bg-black/80 border border-zinc-800 rounded-xl px-2.5 sm:px-3.5 py-2 min-w-[50px] sm:min-w-[60px]">
                <div className="font-mono font-black text-xl sm:text-2xl text-white tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Days</div>
              </div>
              <span className="font-bold text-red-500 text-lg">:</span>
              <div className="bg-black/80 border border-zinc-800 rounded-xl px-2.5 sm:px-3.5 py-2 min-w-[50px] sm:min-w-[60px]">
                <div className="font-mono font-black text-xl sm:text-2xl text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Hours</div>
              </div>
              <span className="font-bold text-red-500 text-lg">:</span>
              <div className="bg-black/80 border border-zinc-800 rounded-xl px-2.5 sm:px-3.5 py-2 min-w-[50px] sm:min-w-[60px]">
                <div className="font-mono font-black text-xl sm:text-2xl text-white tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Mins</div>
              </div>
              <span className="font-bold text-red-500 text-lg">:</span>
              <div className="bg-black/80 border border-zinc-800 rounded-xl px-2.5 sm:px-3.5 py-2 min-w-[50px] sm:min-w-[60px]">
                <div className="font-mono font-black text-xl sm:text-2xl text-red-500 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                if (card.actionSlug === 'shop') navigate('shop');
                else navigate('category', { categorySlug: card.actionSlug });
              }}
              className={`group bg-gradient-to-b ${card.bgGradient} border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-500/60 card-hover shadow-xl cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg uppercase tracking-wide">
                    {card.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-white uppercase leading-tight mb-2.5 group-hover:text-red-400 transition-colors tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-zinc-800/80 mt-4">
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5 uppercase tracking-wide">
                  <span>Claim Deal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <Zap className="w-4 h-4 text-red-500 fill-current opacity-80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
