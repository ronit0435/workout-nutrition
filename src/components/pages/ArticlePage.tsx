import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ARTICLES } from '../../data/articles';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Calendar,
  User,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const ArticlePage: React.FC = () => {
  const { routeParams, navigate, addToast } = useStore();

  const articleSlug = routeParams.articleSlug;
  // Match either by slug or by id
  const article =
    ARTICLES.find((a) => a.slug === articleSlug || a.id === articleSlug) ||
    ARTICLES[0];

  // Related products based on article category
  const relatedCategorySlug = article.relatedCategorySlug || 'whey-protein';
  const relatedProducts = PRODUCTS.filter((p) => {
    if (relatedCategorySlug === 'shop') return p.isBestSeller;
    if (relatedCategorySlug === 'whey-protein') return p.category === 'Whey Protein' || p.category === 'Whey Isolate';
    if (relatedCategorySlug === 'creatine') return p.category === 'Creatine';
    if (relatedCategorySlug === 'pre-workout') return p.category === 'Pre Workout';
    if (relatedCategorySlug === 'mass-gainer') return p.category === 'Mass Gainer';
    return true;
  }).slice(0, 3);

  // Other articles in the knowledge base
  const otherArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Article URL copied to clipboard', 'info');
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-8 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              navigate('home');
              setTimeout(() => {
                const el = document.getElementById('fitness-knowledge');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-red-600 bg-white border border-zinc-200/80 px-3.5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fitness Knowledge</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black bg-white border border-zinc-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Guide</span>
          </button>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            {/* H1 in Bebas Neue: 400 weight, uppercase, strong display style */}
            <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-zinc-950 uppercase tracking-wide leading-[1.02] text-balance">
              {article.title}
            </h1>

            <p className="font-body text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-3xl">
              {article.shortDescription}
            </p>

            {/* Author & Reading Time Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-500 border-t border-zinc-100 font-mono">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-zinc-800">{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-bold ml-auto">
                <ShieldCheck className="w-4 h-4" />
                <span>Peer-Reviewed Science</span>
              </div>
            </div>
          </div>

          {/* Featured Hero Banner */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md border border-zinc-200 relative bg-zinc-950">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Key Takeaways Callout Box */}
          <div className="bg-zinc-50 border-2 border-red-600/30 rounded-2xl p-6 space-y-3">
            <div className="font-heading font-black text-sm uppercase tracking-wider text-zinc-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <span>KEY EVIDENCE TAKEAWAYS</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 pl-6 list-disc">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Editorial Paragraphs */}
          <div className="space-y-6 text-xs sm:text-base text-zinc-700 leading-relaxed border-t border-b border-zinc-100 py-8">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed text-zinc-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Medical & Supplement Disclaimer */}
          <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-[11px] text-zinc-500 leading-relaxed font-mono">
            <strong>EVIDENCE-BASED DISCLAIMER:</strong> Supplement recommendations provided in Workout Nutrition guides are for educational and athletic information purposes only. Supplements are designed to support fitness goals and daily nutrition and are not intended to diagnose, treat, cure, or prevent any medical condition. Always consult a healthcare professional before beginning new supplementation.
          </div>

          {/* Recommended Authentic Products for This Topic */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold block">
                    RECOMMENDED PROTOCOL
                  </span>
                  <h3 className="font-product-name text-lg sm:text-xl text-zinc-950">
                    Authentic Supplements For This Goal
                  </h3>
                </div>

                <button
                  onClick={() => navigate('shop')}
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Other Guides in Fitness Knowledge */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-zinc-950 uppercase tracking-tight">
              MORE FROM FITNESS KNOWLEDGE
            </h2>
            <button
              onClick={() => {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('fitness-knowledge');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate('article', { articleSlug: art.slug })}
                className="group bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:border-red-600/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-zinc-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h3 className="font-product-name text-xs sm:text-sm text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-2 leading-snug">
                    {art.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono mt-3">
                  <span>{art.readTime}</span>
                  <span className="text-red-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
