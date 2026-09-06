'use client';

import { useReducedMotion } from '@/lib/useReducedMotion';

type MarqueeProps = {
  text: string;
  className?: string;
};

export function Marquee({ text, className = '' }: MarqueeProps) {
  const reduced = useReducedMotion();
  const content = `${text}  ·  ${text}  ·  ${text}  ·  `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block"
        style={
          reduced
            ? undefined
            : { animation: 'marquee 28s linear infinite' }
        }
      >
        <span className="display pr-8 text-[12vw] text-ivory/10 md:text-[7vw]">
          {content}
        </span>
        <span className="display pr-8 text-[12vw] text-ivory/10 md:text-[7vw]">
          {content}
        </span>
      </div>
    </div>
  );
}
