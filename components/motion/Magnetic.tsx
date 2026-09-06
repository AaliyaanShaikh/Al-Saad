'use client';

import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

type MagneticProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
};

export function Magnetic({
  children,
  className = '',
  strength = 0.35,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </button>
  );
}
