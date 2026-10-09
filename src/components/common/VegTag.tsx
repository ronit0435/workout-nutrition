import React from 'react';

interface VegTagProps {
  type?: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Gluten-Free' | string;
  size?: 'sm' | 'md';
}

export const VegTag: React.FC<VegTagProps> = ({ type = 'Vegetarian', size = 'sm' }) => {
  const isNonVeg = type === 'Non-Vegetarian';

  if (isNonVeg) {
    return (
      <span
        title="Non-Vegetarian Dietary Supplement"
        className={`inline-flex items-center gap-1.5 rounded-full border border-amber-900/80 bg-amber-50/90 text-amber-950 font-bold uppercase select-none shrink-0 transition-all ${
          size === 'sm'
            ? 'px-2 py-0.5 text-[9px] tracking-wide'
            : 'px-2.5 py-1 text-[10.5px] tracking-wider'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-[2px] border border-amber-900 flex items-center justify-center p-[0.5px] shrink-0 bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-900" />
        </span>
        <span className="font-semibold leading-none pt-px">NON-VEG</span>
      </span>
    );
  }

  return (
    <span
      title="100% Vegetarian Dietary Supplement"
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-600/80 bg-emerald-50/90 text-emerald-800 font-bold uppercase select-none shrink-0 transition-all ${
        size === 'sm'
          ? 'px-2 py-0.5 text-[9px] tracking-wide'
          : 'px-2.5 py-1 text-[10.5px] tracking-wider'
      }`}
    >
      <span className="w-2.5 h-2.5 rounded-[2px] border border-emerald-600 flex items-center justify-center p-[0.5px] shrink-0 bg-white">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
      </span>
      <span className="font-semibold leading-none pt-px">VEG</span>
    </span>
  );
};
