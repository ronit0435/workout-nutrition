import React from 'react';
import { ARTICLES } from '../../data/articles';
import { useStore } from '../../context/StoreContext';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const FitnessEducationSection: React.FC = () => {
  const { navigate } = useStore();

  const handleReadArticle = (slug: string) => {
    // Open dedicated article page as requested
    navigate('article', { articleSlug: slug });
  };

  return (
    <section className="py-16 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
              <BookOpen className="w-4 h-4" />
              <span>FITNESS KNOWLEDGE</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              SCIENCE-BACKED ATHLETIC GUIDANCE
            </h2>
            <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Evidence-based sports nutrition articles to help you make informed supplementation choices.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono self-start sm:self-auto">
            PEER-REVIEWED NUTRITION GUIDES
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => handleReadArticle(art.slug)}
              className="group bg-zinc-50 hover:bg-white rounded-2xl border border-zinc-200/80 hover:border-red-600/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
            >
              <div>
                {/* Image */}
                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded">
                    {art.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                    <span>·</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="font-body font-semibold text-base text-zinc-950 group-hover:text-red-600 transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>

                  <p className="font-body text-xs text-zinc-600 font-normal line-clamp-3 leading-relaxed">
                    {art.shortDescription}
                  </p>
                </div>
              </div>

              {/* Read More button */}
              <div className="px-5 pb-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadArticle(art.slug);
                  }}
                  className="w-full bg-white group-hover:bg-red-600 text-zinc-900 group-hover:text-white border border-zinc-200 group-hover:border-red-600 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
