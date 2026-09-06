'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manifesto } from '@/lib/data';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = manifesto.split(' ');

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const spans = el.querySelectorAll('.manifesto-word');
      gsap.fromTo(
        spans,
        { color: '#7f786c' },
        {
          color: '#191714',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: true,
          },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section ref={ref} className="bg-paper px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="kicker mb-10">Manifesto</p>
        <p className="display text-3xl leading-[1.15] text-muted sm:text-4xl md:text-5xl lg:text-6xl">
          {words.map((word, i) => (
            <span key={i} className="manifesto-word mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
