'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'li';
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  stagger,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const targets = stagger ? el.children : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { dependencies: [reduced, delay, stagger] }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
