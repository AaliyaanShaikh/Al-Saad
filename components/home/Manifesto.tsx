'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manifesto } from '@/lib/data';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const words = manifesto.split(' ');

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reduced) return;

      const spans = section.querySelectorAll('.manifesto-word');
      gsap.fromTo(
        spans,
        { color: 'rgba(243, 239, 231, 0.22)' },
        {
          color: 'rgba(243, 239, 231, 0.96)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'center 35%',
            scrub: true,
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );
      }
    },
    { dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-ivory/10 bg-void"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,176,176,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-16">
          <div className="lg:pt-2">
            <p className="kicker text-silver">Belief</p>
            <div className="mt-6 hidden h-px w-12 overflow-hidden bg-ivory/10 lg:block">
              <div ref={lineRef} className="h-full w-full origin-left bg-silver" />
            </div>
          </div>

          <div className="max-w-4xl">
            <p className="display text-[1.85rem] leading-[1.18] tracking-[-0.02em] text-ivory/25 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              {words.map((word, i) => (
                <span key={i} className="manifesto-word mr-[0.28em] inline-block">
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-12 flex flex-col gap-6 border-t border-ivory/10 pt-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between md:pt-10">
              <p className="max-w-sm text-sm leading-relaxed text-ink-2 md:text-base">
                Clarity before commitment. No theatre. No manufactured urgency.
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                Western suburbs · Mumbai
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
