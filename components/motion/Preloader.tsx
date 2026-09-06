'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { site } from '@/lib/data';
import { useReducedMotion } from '@/lib/useReducedMotion';

const STORAGE_KEY = 'alsaad-preloader-seen';

type PreloaderProps = {
  onReady?: () => void;
};

export function Preloader({ onReady }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    const hold = reduced ? 400 : seen ? 1700 : 3400;

    if (reduced) {
      const t = setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setDone(true);
        onReady?.();
      }, hold);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const letters = lettersRef.current.filter(Boolean);
      gsap.set(letters, { yPercent: 110 });
      gsap.to(letters, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: 'power3.out',
        delay: 0.15,
      });
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: hold / 1000 - 0.6, ease: 'power1.inOut', transformOrigin: 'left center' }
      );

      const exitDelay = hold / 1000 - 0.35;
      gsap.delayedCall(exitDelay, () => onReady?.());
      gsap.to('.preloader-sheet-top', {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: exitDelay + 0.15,
      });
      gsap.to('.preloader-sheet-bottom', {
        yPercent: 100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: exitDelay + 0.15,
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, '1');
          setDone(true);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [done, onReady, reduced]);

  if (done) return null;

  const chars = site.wordmark.split('');

  return (
    <div ref={rootRef} className="fixed inset-0 z-[250] pointer-events-none">
      <div className="preloader-sheet-top absolute inset-x-0 top-0 h-1/2 bg-paper" />
      <div className="preloader-sheet-bottom absolute inset-x-0 bottom-0 h-1/2 bg-paper" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div
          className="display text-2xl tracking-[0.12em] text-ink md:text-3xl"
          style={{ paddingLeft: '0.12em' }}
        >
          {chars.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span
                ref={(el) => {
                  if (el) lettersRef.current[i] = el;
                }}
                className="inline-block"
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            </span>
          ))}
        </div>
        <div className="h-px w-40 overflow-hidden bg-ink/10 md:w-56">
          <div ref={lineRef} className="h-full w-full origin-left bg-gold" />
        </div>
      </div>
    </div>
  );
}
