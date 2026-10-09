import React from 'react';
import { ShieldCheck, Lock, Truck, Award, Headphones } from 'lucide-react';

export const TrustBenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Products',
      subtitle: 'Official brand imports only',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      subtitle: '256-bit encrypted checkout',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      subtitle: 'Express Pan-India shipping',
    },
    {
      icon: Award,
      title: 'Quality Tested',
      subtitle: 'Batch verified & lab tested',
    },
    {
      icon: Headphones,
      title: 'Expert Guidance',
      subtitle: 'Certified sports nutritionists',
    },
  ];

  return (
    <div className="bg-white border-b border-zinc-200/80 py-5 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-zinc-50"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-body font-semibold text-xs sm:text-[13px] text-zinc-950 truncate">
                    {b.title}
                  </h4>
                  <p className="font-body text-[11px] text-zinc-500 font-normal truncate">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
