'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    },
    { dependencies: [pathname, reduced] }
  );

  return <div ref={ref}>{children}</div>;
}
