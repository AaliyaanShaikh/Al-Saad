import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Public folder asset (handles spaces in filenames) */
const publicAsset = (filename: string) => `/${encodeURIComponent(filename)}`;

const FALLBACK_IMAGE = publicAsset('screenshot-jogeshwari.png');

const CREATORS = [
  {
    id: '1',
    name: 'Bandra',
    followers: 'Premium apex',
    media: publicAsset('screenshot-jogeshwari-2.png'),
  },
  {
    id: '2',
    name: 'Khar',
    followers: 'Redevelopment hub',
    media: publicAsset('screenshot-jogeshwari.png'),
  },
  {
    id: '3',
    name: 'Santacruz',
    followers: 'Growth corridor',
    media: publicAsset('WhatsApp Image 2026-01-25 at 13.07.14.jpeg'),
  },
  {
    id: '4',
    name: 'Andheri',
    followers: 'Connectivity play',
    media: publicAsset('screenshot-bandivali.png'),
  },
  {
    id: '5',
    name: 'Versova',
    followers: 'Coastal upside',
    media: publicAsset('screenshot-2026-01-30.png'),
  },
  {
    id: '6',
    name: 'Jogeshwari',
    followers: 'Value micro-market',
    media: publicAsset('screenshot-2026-01-31-jogeshwari.png'),
  },
];

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(decodeURIComponent(src));

interface StudioCreatorsProps {
  onOpenBooking?: () => void;
}

const StudioCreators: React.FC<StudioCreatorsProps> = ({ onOpenBooking }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="creators"
      className="bg-black mt-0 mb-0 pt-6 sm:pt-8 md:pt-8 pb-10 sm:pb-12 md:pb-16 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 md:px-24">
        <div className="mb-12 md:mb-16">
          <div className="h-px w-full bg-white/25 mt-4 md:mt-5 mb-6 md:mb-8" />
          <div className="flex items-center justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-xl md:text-2xl font-light text-white tracking-tight max-w-2xl"
            >
              You've seen these markets everywhere
            </motion.h2>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 flex items-center justify-center text-white transition-colors touch-manipulation shrink-0"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 flex items-center justify-center text-white transition-colors touch-manipulation shrink-0"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CREATORS.map((creator) => (
            <MediaCard key={creator.id} creator={creator} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 md:mt-20 mb-6 md:mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        >
          <div
            className="relative flex min-h-[240px] items-center justify-center bg-cover bg-center px-6 py-14 sm:min-h-[260px] md:min-h-[360px] md:px-16 md:py-20 lg:min-h-[420px] lg:px-20 lg:py-28"
            style={{
              backgroundImage: `url("${publicAsset('IMG_4653.jpg')}")`,
            }}
          >
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-2 text-center sm:px-4 md:max-w-3xl lg:max-w-4xl">
              <h3 className="mb-4 font-serif text-lg font-light text-white sm:mb-5 sm:text-xl md:mb-6 md:text-2xl lg:mb-7 lg:text-3xl">
                Ready to get started?
              </h3>
              <button
                type="button"
                onClick={() => onOpenBooking?.()}
                className="min-h-[44px] rounded-full border border-white px-6 py-2.5 font-medium text-sm uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95 touch-manipulation sm:px-8 md:px-10 md:py-3"
              >
                Request a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MediaCard: React.FC<{
  creator: (typeof CREATORS)[0];
}> = ({ creator }) => {
  const cardRef = useRef<HTMLDivElement>(null);
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
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px -40px 0px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[180px] md:w-[220px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
        <div className="aspect-[9/16] overflow-hidden relative bg-stone-900">
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
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src={isInView ? mediaSrc : undefined}
              alt={creator.name}
              loading="lazy"
              decoding="async"
              onError={handleMediaError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-3 md:p-4 flex items-start gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 font-serif text-xs font-medium text-white"
            aria-hidden
          >
            {creator.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-serif font-light text-white text-sm md:text-base truncate">
              {creator.name}
            </h3>
            <p className="text-stone-400 text-xs md:text-sm">{creator.followers}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default StudioCreators;
