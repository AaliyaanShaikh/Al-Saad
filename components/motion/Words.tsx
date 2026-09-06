'use client';

import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type WordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
};

/** Supports `//` for desktop-only line break and *word* for italic cut. */
export function Words({ text, className = '', wordClassName = '' }: WordsProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  const lines = useMemo(() => {
    return text.split('//').map((line) => {
      const tokens = line.trim().split(/(\*[^*]+\*)/g).filter(Boolean);
      const words: { text: string; italic: boolean }[] = [];
      tokens.forEach((token) => {
        if (token.startsWith('*') && token.endsWith('*')) {
          words.push({ text: token.slice(1, -1), italic: true });
        } else {
          token.split(/\s+/).filter(Boolean).forEach((w) => {
            words.push({ text: w, italic: false });
          });
        }
      });
      return words;
    });
  }, [text]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const wordEls = el.querySelectorAll('.word-inner');
      gsap.fromTo(
        wordEls,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.045,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { dependencies: [reduced, text] }
  );

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => (
        <span
          key={li}
          className={li > 0 ? 'mt-1 block md:mt-2' : 'block'}
        >
          {line.map((word, wi) => (
            <span
              key={`${li}-${wi}`}
              className={`mr-[0.28em] inline-block overflow-hidden align-bottom last:mr-0 ${wordClassName}`}
            >
              <span
                className={`word-inner inline-block ${word.italic ? 'italic' : ''}`}
              >
                {word.text}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
