'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line || reduced) return;
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'bottom 65%',
            scrub: true,
          },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="process" ref={sectionRef} className="bg-paper-2 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="kicker mb-5">Process</p>
            <h2 className="display max-w-sm text-4xl text-ivory md:text-5xl lg:text-6xl">
              Without hurry.
            </h2>
            <p className="lede mt-6">
              Every conversation starts with your real situation — before any project or price.
            </p>
          </Reveal>
        </div>

        <div className="relative pl-6 md:pl-10">
          <div className="absolute top-1 left-0 h-[calc(100%-8px)] w-px bg-ivory/10">
            <div ref={lineRef} className="h-full w-full origin-top bg-silver" />
          </div>
          <ol className="space-y-14 md:space-y-20">
            {processSteps.map((step) => (
              <Reveal key={step.id} as="li">
                <div className="flex items-baseline gap-4">
                  <span className="kicker text-silver">{step.number}</span>
                  <h3 className="display text-2xl text-ivory md:text-4xl">{step.title}</h3>
                </div>
                <p className="body mt-4 max-w-md pl-[3.25rem] text-sm md:text-base">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
