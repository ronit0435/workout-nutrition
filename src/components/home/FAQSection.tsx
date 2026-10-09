import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are your products authentic and verified?',
      a: 'Yes, 100%. Every single product on Workout Nutrition is sourced directly from authorized brand importers (such as Glanbia India for Optimum Nutrition, Bright Commodities, and official manufacturer partners). Each container carries an intact scratch code hologram for direct verification on official brand portals.',
    },
    {
      q: 'How long does delivery take across India?',
      a: 'We offer express shipping. Orders for metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai) are typically delivered within 24 to 48 hours. Other cities and tier-2/3 pin codes arrive within 3 to 5 business days via Delhivery Express or BlueDart.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is available across 19,000+ PIN codes throughout India. You can choose to pay with cash or scan the delivery agent’s digital UPI QR upon package arrival.',
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order is dispatched, you will receive an SMS and email with your Airway Bill (AWB) tracking number. You can also track your shipment live anytime using our dedicated Track Order tool right from the website menu.',
    },
    {
      q: 'Can I return a product if it arrives damaged?',
      a: 'Yes. If a package arrives with damaged tamper seals or leakage, notify us within 7 days of delivery. We provide a swift, free replacement or full refund after verifying transit damage.',
    },
    {
      q: 'How should I choose the right supplement for my goals?',
      a: 'Begin with foundational needs: a high-grade Whey Protein to hit daily protein goals, Creatine Monohydrate for strength, and Omega-3 / Multivitamins for joint and general health. You can also use our interactive Supplement Advisor on the homepage or chat with certified nutritionists on WhatsApp.',
    },
    {
      q: 'Do you offer bulk or gym wholesale orders?',
      a: 'Yes! We supply fitness centers, personal trainers, and bulk buyers across India with special volume pricing and official GST invoices. Submit a wholesale inquiry on our Contact / Inquiries page to receive a custom quote.',
    },
  ];

  return (
    <section className="py-16 bg-zinc-50/70 border-b border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
            Instant answers regarding authenticity, shipping, batch checks, and usage.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-body font-semibold text-sm sm:text-base text-zinc-950 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
