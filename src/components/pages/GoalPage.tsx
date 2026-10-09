import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { GOALS } from '../../data/goals';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Target, CheckCircle2, Lightbulb } from 'lucide-react';

export const GoalPage: React.FC = () => {
  const { routeParams, navigate } = useStore();
  const slug = routeParams.goalSlug || 'build-muscle';
  const goal = GOALS.find((g) => g.slug === slug) || GOALS[0];

  const goalProducts = PRODUCTS.filter((p) => (p.goals as string[]).includes(goal.id));

  return (
    <div className="bg-zinc-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:text-red-600 cursor-pointer">
            Goals
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">{goal.title}</span>
        </div>

        {/* Goal Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white p-8 sm:p-12 mb-8 shadow-xl">
          <img
            src={goal.heroImage}
            alt={goal.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-2 font-mono bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
              <Target className="w-3.5 h-3.5" />
              <span>{goal.subtitle}</span>
            </div>
            <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide mb-3">
              {goal.title}
            </h1>
            <p className="font-body text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
              {goal.description}
            </p>

            {/* Nutrition Protocol Tips */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                <Lightbulb className="w-4 h-4" />
                <span>NUTRITIONIST PROTOCOL TIPS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {goal.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading font-black text-lg text-zinc-900 uppercase">
            RECOMMENDED STACK SUPPLEMENTS ({goalProducts.length})
          </h2>
          <button
            onClick={() => navigate('shop')}
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Browse All Products →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {goalProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
