'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) {
      document.documentElement.classList.remove('has-cursor');
      setEnabled(false);
      return;
    }
    document.documentElement.classList.add('has-cursor');
    setEnabled(true);

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      gsap.to(dotRef.current, { x, y, duration: 0.01 });
      gsap.to(ringRef.current, { x, y, duration: 0.35, ease: 'power3.out' });
      gsap.to(labelRef.current, { x, y, duration: 0.2, ease: 'power2.out' });
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const media = target?.closest('[data-cursor="view"]');
      if (media) {
        gsap.to(ringRef.current, { scale: 2.2, duration: 0.3 });
        gsap.to(labelRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    const out = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest('[data-cursor="view"]')) return;
      gsap.to(ringRef.current, { scale: 1, duration: 0.3 });
      gsap.to(labelRef.current, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[300] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[299] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/30"
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[301] -translate-x-1/2 -translate-y-1/2 opacity-0"
      >
        <span className="kicker text-[10px] text-ink">View</span>
      </div>
    </>
  );
}
