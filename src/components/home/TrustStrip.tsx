import React from 'react';
import { ShieldCheck, Truck, Tag, Headphones } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Products',
      subtitle: 'Direct from brand authorised importers',
    },
    {
      icon: Truck,
      title: 'Fast Pan-India Delivery',
      subtitle: 'Express shipping with live tracking',
    },
    {
      icon: Tag,
      title: 'Best Price Guarantee',
      subtitle: 'Competitive pricing & authentic source',
    },
    {
      icon: Headphones,
      title: 'Expert Guidance / Support',
      subtitle: 'Guidance on supplements and dosage',
    },
  ];

  return (
    <section className="bg-white border-b border-zinc-200/80 py-5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 hover:bg-zinc-50 border border-transparent hover:border-zinc-200/60"
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-xs sm:text-sm text-zinc-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
