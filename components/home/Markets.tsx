'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { publicSrc } from '@/lib/data';
import { useCallModal } from '@/components/chrome/Providers';

const FALLBACK_IMAGE = publicSrc('/screenshot-jogeshwari.png');

const CREATORS = [
  { id: '1', name: 'Bandra', followers: 'Premium apex', media: publicSrc('/screenshot-jogeshwari-2.png') },
  { id: '2', name: 'Khar', followers: 'Redevelopment hub', media: publicSrc('/screenshot-jogeshwari.png') },
  {
    id: '3',
    name: 'Santacruz',
    followers: 'Growth corridor',
    media: publicSrc('/WhatsApp Image 2026-01-25 at 13.07.14.jpeg'),
  },
  { id: '4', name: 'Andheri', followers: 'Connectivity play', media: publicSrc('/screenshot-bandivali.png') },
  { id: '5', name: 'Versova', followers: 'Coastal upside', media: publicSrc('/screenshot-2026-01-30.png') },
  {
    id: '6',
    name: 'Jogeshwari',
    followers: 'Value micro-market',
    media: publicSrc('/screenshot-2026-01-31-jogeshwari.png'),
  },
];

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(decodeURIComponent(src));

export function Markets() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openCall } = useCallModal();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -240 : 240,
      behavior: 'smooth',
    });
  };

  return (
    <section id="markets" className="overflow-hidden bg-void pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="w-full px-5 sm:px-6 md:px-24">
        <div className="mb-12 md:mb-16">
          <div className="mt-4 mb-6 h-px w-full bg-ivory/20 md:mt-5 md:mb-8" />
          <div className="flex items-center justify-between gap-6">
            <h2 className="display max-w-2xl text-xl font-light tracking-tight text-ivory md:text-2xl">
              You&apos;ve seen these markets everywhere
            </h2>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 active:bg-ivory/25 sm:h-14 sm:w-14"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 active:bg-ivory/25 sm:h-14 sm:w-14"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 md:gap-5"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CREATORS.map((creator) => (
            <MediaCard key={creator.id} creator={creator} />
          ))}
        </div>

        <div className="mt-12 mb-6 overflow-hidden rounded-2xl border border-ivory/10 shadow-xl md:mt-20 md:mb-10">
          <div
            className="relative flex min-h-[240px] items-center justify-center bg-cover bg-center px-6 py-14 sm:min-h-[260px] md:min-h-[360px] md:px-16 md:py-20 lg:min-h-[420px] lg:px-20 lg:py-28"
            style={{ backgroundImage: `url("${publicSrc('/IMG_4653.jpg')}")` }}
          >
            <div className="absolute inset-0 bg-void/70" />
            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-2 text-center sm:px-4 md:max-w-3xl lg:max-w-4xl">
              <h3 className="display mb-4 text-lg font-light text-ivory sm:mb-5 sm:text-xl md:mb-6 md:text-2xl lg:mb-7 lg:text-3xl">
                Ready to get started?
              </h3>
              <button
                type="button"
                onClick={openCall}
                className="min-h-[44px] touch-manipulation rounded-full border border-ivory px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-ivory transition-all hover:bg-ivory hover:text-void active:scale-95 sm:px-8 md:px-10 md:py-3"
              >
                Request a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaCard({
  creator,
}: {
  creator: (typeof CREATORS)[0];
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(creator.media);
  const useVideo = isVideoSrc(mediaSrc);

  const handleMediaError = () => {
    if (mediaSrc !== FALLBACK_IMAGE) setMediaSrc(FALLBACK_IMAGE);
  };

  useEffect(() => {
    setMediaSrc(creator.media);
  }, [creator.media]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin: '120px 35% 120px 35%', threshold: 0.01 }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !useVideo || !videoRef.current) return;
    const v = videoRef.current;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', 'true');
    v.muted = true;
    const kick = () => {
      void v.play().catch(() => {});
    };
    kick();
    v.addEventListener('loadeddata', kick);
    v.addEventListener('canplay', kick);
    return () => {
      v.removeEventListener('loadeddata', kick);
      v.removeEventListener('canplay', kick);
    };
  }, [isInView, mediaSrc, useVideo]);

  return (
    <article
      ref={cardRef}
      className="group w-[180px] flex-shrink-0 cursor-pointer md:w-[220px]"
      style={{ scrollSnapAlign: 'start' }}
      data-cursor="view"
    >
      <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/5">
        <div className="relative aspect-[9/16] overflow-hidden bg-ink">
          {useVideo ? (
            <video
              ref={videoRef}
              src={isInView ? mediaSrc : undefined}
              muted
              loop
              playsInline
              autoPlay
              preload={isInView ? 'auto' : 'none'}
              onError={handleMediaError}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={isInView ? mediaSrc : undefined}
              alt={creator.name}
              loading="lazy"
              decoding="async"
              onError={handleMediaError}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex items-start gap-3 p-3 md:p-4">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ivory/20 bg-ivory/10 font-display text-xs text-ivory"
            aria-hidden
          >
            {creator.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-light text-ivory md:text-base">
              {creator.name}
            </h3>
            <p className="line-clamp-2 text-xs text-muted md:text-sm">{creator.followers}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
