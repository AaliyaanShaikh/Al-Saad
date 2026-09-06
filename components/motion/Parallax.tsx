'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
};

export function Parallax({ children, className = '', amount = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { dependencies: [reduced, amount] }
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
