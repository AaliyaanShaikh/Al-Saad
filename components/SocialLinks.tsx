import React, { useState, useMemo } from 'react';
import ClayGrid from '@/components/ClayGrid';
import { CLAY_GRID_FEATURES } from '@/clayGridConstants';
import type { ContentSource } from '@/types';

export type SocialItem = { name: string; url: string };

const defaultLinks: SocialItem[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/alsaad.in/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@alsaad_in' },
];

export type SocialFilter = 'all' | ContentSource;

interface SocialLinksProps {
  links?: SocialItem[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links = defaultLinks }) => {
  const [filter, setFilter] = useState<SocialFilter>('all');

  const filteredContent = useMemo(() => {
    const features =
      filter === 'all'
        ? CLAY_GRID_FEATURES.slice(0, 8)
        : CLAY_GRID_FEATURES.filter((f) => f.source === filter);
    return features.map(({ id, source, ...item }) => ({ ...item, id }));
  }, [filter]);

  return (
    <>
      <div className="mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-16 md:pt-20 border-t border-white/5">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em] text-stone-500 font-medium mb-6 sm:mb-8">
          Social
        </p>
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
          {links.map((social) => (
            <button
              key={social.name}
              type="button"
              onClick={() => setFilter(social.name.toLowerCase() as ContentSource)}
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-medium transition-all border-b pb-2 hover-lift ${
                filter === social.name.toLowerCase()
                  ? 'text-white border-white'
                  : 'text-stone-500 border-stone-800 hover:text-white hover:border-white'
              }`}
            >
              {social.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-medium transition-all border-b pb-2 hover-lift ${
              filter === 'all'
                ? 'text-white border-white'
                : 'text-stone-500 border-stone-800 hover:text-white hover:border-white'
            }`}
          >
            All
          </button>
        </div>
      </div>
      <ClayGrid content={filteredContent} />
    </>
  );
};

export default SocialLinks;
