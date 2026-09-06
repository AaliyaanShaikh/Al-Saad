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
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="process" ref={sectionRef} className="bg-ivory px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="kicker mb-4">Process</p>
            <h2 className="display max-w-md text-4xl text-ink md:text-5xl">
              How we work — without hurry.
            </h2>
          </Reveal>
        </div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute top-2 left-0 h-[calc(100%-1rem)] w-px bg-ink/10 md:left-2">
            <div ref={lineRef} className="h-full w-full origin-top bg-clay" />
          </div>
          <ol className="space-y-12 md:space-y-16">
            {processSteps.map((step) => (
              <Reveal key={step.id} as="li">
                <p className="kicker mb-3 text-gold">{step.number}</p>
                <h3 className="display text-2xl text-ink md:text-3xl">{step.title}</h3>
                <p className="body mt-3 max-w-md text-sm">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
