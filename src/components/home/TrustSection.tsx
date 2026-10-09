import React from 'react';
import { ShieldCheck, Lock, Truck, Award, CheckCircle, FileText } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: '100% AUTHENTIC GUARANTEE',
      desc: 'Imported directly through verified brand distributors. Scratch-off security hologram on every unit.',
    },
    {
      icon: Lock,
      title: 'SECURE PAYMENTS',
      desc: '256-bit encrypted checkout with UPI, Credit/Debit cards, Net Banking, and cash on delivery.',
    },
    {
      icon: Truck,
      title: 'EXPRESS PAN-INDIA DELIVERY',
      desc: 'Same-day dispatch for orders placed before 2 PM. Real-time courier tracking via Delhivery & Bluedart.',
    },
    {
      icon: Award,
      title: 'BATCH LAB VERIFIED',
      desc: 'Every production lot is screened for heavy metal purity and banned substance compliance.',
    },
    {
      icon: CheckCircle,
      title: 'AUTHENTICITY CHECK CODE',
      desc: 'Verify product authenticity directly on official manufacturer websites using unique batch codes.',
    },
    {
      icon: FileText,
      title: 'GST REGISTERED INVOICE',
      desc: 'Every shipment arrives with a legal GST tax invoice ensuring transparent consumer rights.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>UNCOMPROMISING INTEGRITY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
            WHY TRAIN WITH IRONFORGE?
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            We combat counterfeit supplements in India with direct-from-brand authorized procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 hover:border-red-600/40 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-base text-zinc-900 uppercase mb-2">
                  {point.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
