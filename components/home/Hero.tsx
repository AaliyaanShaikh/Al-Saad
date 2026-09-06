'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Words } from '@/components/motion/Words';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';
import { publicSrc, site } from '@/lib/data';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const { openCall, heroReady } = useCallModal();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media || reduced) return;

      gsap.fromTo(
        media,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      if (hintRef.current) {
        gsap.to(hintRef.current, {
          opacity: 0,
          y: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=35%',
            scrub: true,
          },
        });
      }
    },
    { dependencies: [reduced, heroReady] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-void"
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform" data-cursor="view">
        <Image
          src={publicSrc('/Lodha.jpeg')}
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-transparent" />
      </div>

      <div
        className={`relative z-10 w-full px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40 transition-opacity duration-700 ${
          heroReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <p className="display mb-8 text-4xl tracking-[0.18em] text-ivory sm:text-5xl md:mb-10 md:text-6xl lg:text-7xl">
            {site.wordmark}
          </p>
          <Words
            text="Western suburbs,//explained *honestly*."
            className="display max-w-4xl text-3xl text-ivory sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 md:mt-8 md:text-lg">
            Clear counsel for buyers and investors from Bandra to Jogeshwari.
          </p>
          <div className="mt-8 md:mt-10">
            <Magnetic onClick={openCall} className="btn">
              Request a call
              <span className="btn-arrow">→</span>
            </Magnetic>
          </div>
        </div>
      </div>

      <p
        ref={hintRef}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.28em] text-ivory/45"
      >
        Scroll
      </p>
    </section>
  );
}
