import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, CheckCircle2, Flame } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      addToast(
        'Welcome to Workout Nutrition Club!',
        'Your 10% coupon code "WORKOUT10" is ready to use at checkout.',
        'success'
      );
    }
  };

  return (
    <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-900 border border-red-900/40 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-2 font-mono bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
              <Flame className="w-3.5 h-3.5" />
              <span>COMMUNITY REWARD</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide">
              GET 10% OFF YOUR FIRST ORDER
            </h2>
            <p className="font-body text-zinc-300 font-normal text-sm sm:text-base mt-2 leading-relaxed">
              Join our serious fitness community for secret flash drops, new international imports, and science-backed nutrition protocols.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {subscribed ? (
              <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-5 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-heading font-bold text-sm text-white">
                    You're On The VIP Roster!
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Use coupon code <span className="font-mono font-bold text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded">IRON10</span> for instant 10% discount.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-black/60 border border-zinc-700 focus:border-red-500 focus:bg-black text-white text-sm rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-zinc-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-red-600/30 whitespace-nowrap cursor-pointer"
                >
                  GET MY DISCOUNT
                </button>
              </form>
            )}
            <div className="text-[11px] text-zinc-500 text-center lg:text-left mt-2">
              🔒 Zero spam. We respect your inbox privacy. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
