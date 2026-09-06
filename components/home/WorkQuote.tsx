'use client';

import { Reveal } from '@/components/motion/Reveal';

export function WorkQuote() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-black py-24 sm:py-32 md:py-48 lg:py-60"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[90vw] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        style={{ animation: 'spin 30s linear infinite' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        style={{ animation: 'spin 20s linear infinite reverse' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 md:px-10">
        <Reveal>
          <h3 className="mb-12 text-[9px] font-medium uppercase tracking-[0.8em] text-stone-700 sm:mb-16 sm:text-[10px] sm:tracking-[1em] md:mb-20">
            Work
          </h3>
          <p className="mb-8 px-2 font-serif text-2xl leading-[1.3] font-light italic sm:mb-12 sm:px-4 sm:text-3xl md:text-4xl lg:mb-16 lg:text-5xl xl:text-6xl">
            <span className="text-stone-400">&ldquo;A home is not just a place—it&apos;s</span>{' '}
            <span className="not-italic text-white">where life happens</span>
            <span className="text-stone-400">.&rdquo;</span>
          </p>
          <div className="mx-auto mb-10 h-px w-32 bg-stone-900 sm:mb-12 sm:w-40 md:mb-16" />
          <p className="mx-auto max-w-3xl px-2 text-sm leading-relaxed text-stone-400 sm:px-4 sm:text-base">
            With years of experience across Mumbai&apos;s western suburbs, I specialize in helping
            clients navigate Bandra, Khar, Santacruz, Andheri, Versova, and Jogeshwari with clarity.
            Whether you&apos;re buying, selling, or investing, you get honest market insight and
            guidance built around long-term value—not short-term hype.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
