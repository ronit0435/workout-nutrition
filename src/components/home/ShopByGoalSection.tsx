import React from 'react';
import { useStore } from '../../context/StoreContext';
import { GOALS } from '../../data/goals';
import { ArrowRight, Target } from 'lucide-react';

export const ShopByGoalSection: React.FC = () => {
  const { navigate } = useStore();

  const handleGoalClick = (goalSlug: string) => {
    navigate('goal', { goalSlug });
  };

  return (
    <section className="py-14 bg-zinc-50/70 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
              <Target className="w-4 h-4" />
              <span>SHOP BY GOAL</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              SUPPLEMENTS FOR YOUR FITNESS GOAL
            </h2>
            <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Select your primary training objective to view clinically aligned nutritional support.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="text-xs font-display font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Goals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {GOALS.map((goal, index) => {
            const isFeatured = index === 0; // BUILD MUSCLE is featured
            return (
              <div
                key={goal.id}
                onClick={() => handleGoalClick(goal.slug)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[220px] flex flex-col justify-end p-5 select-none ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Background Image */}
                <img
                  src={goal.heroImage}
                  alt={goal.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent group-hover:from-zinc-950/95 transition-all" />

                {/* Card Content */}
                <div className="relative z-10 text-white">
                  <div className="text-[10px] font-display font-bold uppercase tracking-wider text-red-400 mb-1">
                    {goal.subtitle}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide group-hover:text-red-400 transition-colors uppercase">
                    {goal.title}
                  </h3>
                  <p className="font-body text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Explore Button */}
                  <div className="mt-3.5 flex items-center gap-1.5 text-xs font-display font-bold text-white group-hover:text-red-400 transition-all uppercase tracking-wider">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
