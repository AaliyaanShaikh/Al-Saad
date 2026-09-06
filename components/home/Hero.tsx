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
        { borderRadius: 32, scale: 0.92, y: 40 },
        {
          borderRadius: 0,
          scale: 1,
          y: 0,
          width: '100vw',
          height: '100vh',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=90%',
            scrub: true,
            pin: true,
          },
        }
      );

      if (hintRef.current) {
        gsap.to(hintRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=40%',
            scrub: true,
          },
        });
      }
    },
    { dependencies: [reduced, heroReady] }
  );

  return (
    <section ref={sectionRef} className="relative bg-paper pt-28 md:pt-36">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:px-10">
        <div className={`transition-opacity duration-700 ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
          <p className="kicker mb-6">Mumbai western suburbs</p>
          <Words
            text="Property decisions,//explained *honestly*."
            className="display max-w-4xl text-5xl text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          />
          <p className="lede mt-8 max-w-xl">
            {site.tagline} From Bandra and Khar to Santacruz, Andheri, Versova, and Jogeshwari.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic onClick={openCall} className="btn">
              Request a call
              <span className="btn-arrow">→</span>
            </Magnetic>
            <a href="#markets" className="btn btn-ghost">
              Explore markets
            </a>
          </div>
        </div>

        <div
          ref={mediaRef}
          data-cursor="view"
          className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[32px] md:aspect-[16/10] md:max-w-4xl"
        >
          <Image
            src={publicSrc('/Lodha.jpeg')}
            alt="Western suburbs residence"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/35 via-transparent to-transparent" />
        </div>

        <p ref={hintRef} className="kicker pb-10 text-center text-muted">
          Scroll
        </p>
      </div>
    </section>
  );
}
