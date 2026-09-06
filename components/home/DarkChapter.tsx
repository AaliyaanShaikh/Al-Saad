'use client';

import Image from 'next/image';
import { publicSrc, site, testimonials } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { Words } from '@/components/motion/Words';

export function DarkChapter() {
  const quote = testimonials[0];

  return (
    <section id="about" className="bg-void px-5 py-24 text-ivory md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="kicker mb-5 text-gold">About</p>
          <Words
            text="Not just a *broker* — //a long-term advisor."
            className="display text-4xl text-ivory md:text-5xl lg:text-6xl"
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/65">
            My name is {site.founder}, founder of {site.name}. I work with buyers and investors across
            Mumbai’s western suburbs — helping them avoid the most common, and expensive, mistakes.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/65">
            My job is not to sell you a flat. It is to help you make the right decision.
          </p>
          {quote && (
            <blockquote className="mt-10 max-w-lg border-l border-gold/40 pl-5">
              <p className="font-display text-xl italic leading-snug text-ivory/90 md:text-2xl">
                “{quote.quote}”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.18em] text-ivory/45">
                {quote.name} · {quote.detail}
              </footer>
            </blockquote>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]" data-cursor="view">
            <Image
              src={publicSrc('/profile.jpeg')}
              alt={site.founder}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/40 to-transparent p-6 md:p-8">
              <p className="kicker text-gold-bright">Founder</p>
              <p className="display mt-2 text-2xl">{site.founder}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
