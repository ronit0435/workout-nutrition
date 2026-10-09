import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const SocialGridSection: React.FC = () => {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      tag: '#WorkoutNutritionAthletes',
      caption: 'Pushing heavy singles with Platinum Creatine.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      tag: '#CleanMacros',
      caption: 'Post-leg day recovery with 27g Whey Isolate.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      tag: '#TunnelVision',
      caption: 'Pre-workout loaded. 320mg caffeine in full effect.',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80',
      tag: '#HeavyLifts',
      caption: 'Strength progression through dedicated consistency.',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      tag: '#HydrationEAAs',
      caption: 'Intra-workout aminos for zero muscular breakdown.',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
      tag: '#NextLevelCommunity',
      caption: 'Join India’s strongest community of lifters.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5 font-mono">
            <Instagram className="w-4 h-4" />
            <span>@WORKOUTNUTRITION</span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
            FOLLOW THE FITNESS JOURNEY
          </h2>
          <p className="font-body text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
            Tag us in your workout stories to get featured on our athlete wall.
          </p>
        </div>

        {/* 6 Grid items with increased card height (aspect-[3/4]) as requested */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 shadow-sm block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 block">
                    {post.tag}
                  </span>
                  <p className="text-[11px] leading-tight line-clamp-2 mt-1 text-zinc-200">
                    {post.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
