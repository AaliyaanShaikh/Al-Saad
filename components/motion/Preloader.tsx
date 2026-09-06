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
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const finish = () => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setDone(true);
    };

    const seen = sessionStorage.getItem(STORAGE_KEY) === '1';

    if (reduced) {
      const t = setTimeout(() => {
        onReady?.();
        finish();
      }, seen ? 220 : 420);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      gsap.set(wordRef.current, {
        opacity: 0,
        letterSpacing: '0.55em',
        y: 12,
      });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(tagRef.current, { opacity: 0, y: 8 });
      gsap.set(hintRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tlRef.current = tl;

      tl.to({}, { duration: seen ? 0.12 : 0.28 })
        .to(wordRef.current, {
          opacity: 1,
          y: 0,
          letterSpacing: '0.28em',
          duration: 1.15,
          ease: 'power3.out',
        })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.7,
            ease: 'power3.inOut',
            transformOrigin: 'center center',
          },
          '-=0.45'
        )
        .to(
          tagRef.current,
          { opacity: 0.5, y: 0, duration: 0.45 },
          '-=0.35'
        )
        .to(
          hintRef.current,
          { opacity: 0.28, duration: 0.4 },
          '-=0.2'
        )
        .to({}, { duration: seen ? 0.2 : 0.45 })
        .add(() => onReady?.())
        .to(hintRef.current, { opacity: 0, duration: 0.2 }, '<')
        .to(markRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.45,
          ease: 'power2.in',
        })
        .to(
          '.preloader-sheet-top',
          { yPercent: -101, duration: 1.1, ease: 'power4.inOut' },
          '-=0.15'
        )
        .to(
          '.preloader-sheet-bottom',
          {
            yPercent: 101,
            duration: 1.1,
            ease: 'power4.inOut',
            onComplete: finish,
          },
          '<'
        );
    }, rootRef);

    return () => {
      tlRef.current = null;
      ctx.revert();
    };
  }, [done, onReady, reduced]);

  const skip = () => {
    if (done) return;
    if (tlRef.current) tlRef.current.progress(1);
    else {
      onReady?.();
      sessionStorage.setItem(STORAGE_KEY, '1');
      setDone(true);
    }
  };

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[250] cursor-pointer select-none"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') skip();
      }}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <div className="preloader-sheet-top absolute inset-x-0 top-0 h-1/2 bg-void" />
      <div className="preloader-sheet-bottom absolute inset-x-0 bottom-0 h-1/2 bg-void" />

      <div
        ref={markRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
      >
        <h1
          ref={wordRef}
          className="display m-0 text-[clamp(2.4rem,9vw,5.25rem)] font-light tracking-[0.28em] text-ivory"
        >
          {site.wordmark}
        </h1>

        <div className="mt-8 h-px w-[min(48vw,220px)] overflow-hidden bg-ivory/10">
          <div ref={lineRef} className="h-full w-full origin-center bg-silver" />
        </div>

        <p
          ref={tagRef}
          className="mt-5 text-[10px] font-medium uppercase tracking-[0.48em] text-silver"
        >
          {site.wordmark}
        </p>
      </div>

      <p
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.32em] text-ivory"
      >
        Tap to enter
      </p>
    </div>
  );
}
