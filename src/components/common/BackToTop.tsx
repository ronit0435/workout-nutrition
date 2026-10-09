import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 md:bottom-6 left-6 z-40 p-3 rounded-full bg-zinc-900/90 hover:bg-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-zinc-700/60"
    >
      <ArrowUp className="w-5 h-5 text-red-500" />
    </button>
  );
};
