'use client';

import Image from 'next/image';
import { publicSrc, site, testimonials } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { Words } from '@/components/motion/Words';

export function DarkChapter() {
  const quote = testimonials[0];

  return (
    <section id="about" className="bg-void px-5 py-28 text-ivory md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="kicker mb-6 text-silver">About</p>
            <Words
              text="Not just a *broker*."
              className="display text-4xl text-ivory md:text-6xl lg:text-7xl"
            />
            <p className="display mt-3 text-3xl text-ivory/45 md:text-5xl lg:text-6xl">
              A long-term advisor.
            </p>
            <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-ivory/65 md:text-lg">
              <p>
                {site.founder}, founder of {site.name}. I work across Mumbai’s western suburbs —
                helping buyers avoid the expensive mistakes that look harmless on a brochure.
              </p>
              <p>My job is not to sell you a flat. It is to help you make the right decision.</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]" data-cursor="view">
              <Image
                src={publicSrc('/profile.jpeg')}
                alt={site.founder}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/50 to-transparent p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-silver-bright">Founder</p>
                <p className="display mt-2 text-2xl">{site.founder}</p>
              </div>
            </div>
            {quote && (
              <blockquote className="mt-8 border-l border-silver/35 pl-5">
                <p className="font-display text-lg italic leading-snug text-ivory/85 md:text-xl">
                  “{quote.quote}”
                </p>
                <footer className="mt-4 text-[10px] uppercase tracking-[0.18em] text-ivory/40">
                  {quote.name} · {quote.detail}
                </footer>
              </blockquote>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
