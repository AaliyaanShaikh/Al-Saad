'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      refresh();
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      let offset = 0;
      let node: HTMLElement | null = el;
      while (node) {
        offset += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      const navOffset = 88;
      const top = Math.max(0, offset - navOffset);
      if (lenisRef.current && !reduced) {
        lenisRef.current.scrollTo(top, { duration: 1.2 });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }, [pathname, reduced]);

  return <>{children}</>;
}
