import React from 'react';

export const VisaIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-auto' }) => (
  <svg viewBox="0 0 48 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.46 0.77L13.11 15.23H8.97L5.47 3.91C5.26 3.09 5.08 2.79 4.45 2.45C3.38 1.88 1.58 1.34 0 0.99L0.09 0.58H7.13C8.03 0.58 8.84 1.18 9.04 2.22L10.74 11.23L15.34 0.77H19.46ZM36.56 10.36C36.58 6.42 31.06 6.2 31.1 4.44C31.12 3.9 31.63 3.32 32.79 3.17C33.37 3.09 34.95 3.04 36.63 3.82L37.36 0.43C36.37 0.07 35.08 0 33.45 0C29.37 0 26.49 2.17 26.47 5.27C26.43 7.57 28.52 8.85 30.08 9.61C31.68 10.39 32.22 10.89 32.21 11.59C32.19 12.67 30.9 13.14 29.72 13.16C27.63 13.19 26.42 12.6 25.46 12.16L24.71 15.66C25.68 16.11 27.47 16.5 29.31 16.52C33.62 16.52 36.54 14.39 36.56 10.36ZM47.64 15.23H51.24L48.43 0.77H45.12C44.37 0.77 43.73 1.2 43.46 1.85L37.12 15.23H41.31L42.14 12.91H47.24L47.64 15.23ZM43.3 9.69L45.4 3.97L46.61 9.69H43.3ZM25.26 0.77L21.99 15.23H18.06L21.33 0.77H25.26Z"
      fill="#1A1F71"
    />
    <path
      d="M5.47 3.91L8.97 15.23H4.83L1.33 3.91C1.12 3.09 0.94 2.79 0.31 2.45C1.38 1.88 3.18 1.34 4.76 0.99L5.47 3.91Z"
      fill="#F7B600"
    />
  </svg>
);

export const MastercardIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 38 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#EB001B" />
    <circle cx="26" cy="12" r="12" fill="#F79E1B" />
    <path
      d="M19 4.39A12 12 0 0 1 23.47 12 12 12 0 0 1 19 19.61 12 12 0 0 1 14.53 12 12 12 0 0 1 19 4.39Z"
      fill="#FF5F00"
    />
  </svg>
);

export const UpiIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-auto' }) => (
  <svg viewBox="0 0 54 18" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized UPI wordmark with Tricolor accents */}
    <text x="0" y="14" fill="#5F6368" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.5">
      UPI
    </text>
    <path d="M37 2L43 14H39L35 6L37 2Z" fill="#097939" />
    <path d="M41 2L47 14H43L39 6L41 2Z" fill="#F47920" />
  </svg>
);

export const AmexIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 32 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="20" rx="3" fill="#006FCF" />
    <text x="16" y="13.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="9" letterSpacing="0.5">
      AMEX
    </text>
  </svg>
);

export const EmiIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 46 22" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="44" height="18" rx="4" stroke="#27272A" strokeWidth="1.5" fill="none" />
    <circle cx="36" cy="7" r="5" fill="#10B981" />
    <path d="M34 7L35.5 8.5L38 6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="17" y="14.5" fill="#18181B" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="9.5">
      EMI
    </text>
  </svg>
);

export const SnapmintIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 68 18" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Snapmint leaf loop logo */}
    <path d="M4 14C2 11 2 7 5 4C8 1 12 1 12 5C12 9 8 13 4 14Z" fill="#78B928" />
    <path d="M12 4C14 7 14 11 11 14C8 17 4 17 4 13C4 9 8 5 12 4Z" fill="#A4D233" opacity="0.9" />
    <text x="18" y="13" fill="#0A382C" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="-0.2">
      snapmint
    </text>
  </svg>
);

export const CodIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 40 18" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="13.5" fill="#0D9488" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.8">
      COD
    </text>
  </svg>
);

export const PaymentMethodBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* 1. VISA */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="Visa">
        <VisaIcon className="h-3.5 w-auto" />
      </div>

      {/* 2. MASTERCARD */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="Mastercard">
        <MastercardIcon className="h-4 w-auto" />
      </div>

      {/* 3. UPI */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="UPI (Unified Payments Interface)">
        <UpiIcon className="h-3.5 w-auto" />
      </div>

      {/* 4. AMERICAN EXPRESS */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="American Express">
        <AmexIcon className="h-4 w-auto" />
      </div>

      {/* 5. EMI */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="Easy Cardless & Bank EMI">
        <EmiIcon className="h-4 w-auto" />
      </div>

      {/* 6. SNAPMINT */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[68px] hover:scale-105 transition-transform" title="Snapmint 0% Interest EMI">
        <SnapmintIcon className="h-3.5 w-auto" />
      </div>

      {/* 7. COD */}
      <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-zinc-200/90 h-8 sm:h-9 min-w-[58px] hover:scale-105 transition-transform" title="Cash on Delivery">
        <CodIcon className="h-3.5 w-auto" />
      </div>
    </div>
  );
};
