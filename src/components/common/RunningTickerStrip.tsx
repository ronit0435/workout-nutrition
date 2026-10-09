import React from 'react';
import { Award, Flame, ShieldCheck, CheckCircle2, FlaskConical, Truck } from 'lucide-react';

interface TickerItem {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TICKER_ITEMS: TickerItem[] = [
  { text: 'Official Importer Holograms on Every Tub', icon: Award },
  { text: 'Free Express Shipping on Orders Over ₹999', icon: Flame },
  { text: 'Associated with Next Level Fitness', icon: ShieldCheck },
  { text: '100% Authentic Indian & Global Imports', icon: CheckCircle2 },
  { text: '3rd-Party Lab Certified Batches', icon: FlaskConical },
  { text: 'Same-Day Dispatch Before 4 PM', icon: Truck },
];

export const RunningTickerStrip: React.FC = () => {
  return (
    <div className="w-full bg-black text-white border-b border-zinc-900 overflow-hidden py-2.5 select-none relative z-30">
      {/* Seamless infinite marquee running automatically left to right / slideway */}
      <div className="animate-marquee-reverse flex items-center whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center mx-4 text-xs font-semibold tracking-wide text-zinc-200">
              <span className="text-zinc-600 font-mono mr-4 text-sm font-light select-none">/</span>
              <Icon className="w-3.5 h-3.5 text-red-500 mr-2 shrink-0 fill-red-500/10" />
              <span className="hover:text-white transition-colors">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
