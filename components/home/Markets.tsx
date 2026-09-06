'use client';

import Image from 'next/image';
import { markets, publicSrc } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

export function Markets() {
  return (
    <section id="markets" className="bg-paper-2 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker mb-4">Markets</p>
          <h2 className="display mb-4 max-w-3xl text-4xl text-ink md:text-6xl">
            Six suburbs. One corridor.
          </h2>
          <p className="lede mb-14">
            Bandra to Jogeshwari — each with its own price ladder, liquidity, and timing.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market, i) => (
            <Reveal key={market.id} delay={i * 0.05}>
              <article className="card group" data-cursor="view">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={publicSrc(market.image)}
                    alt={market.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-void/10 transition-colors group-hover:bg-void/0" />
                  <span className="absolute top-5 left-5 font-display text-3xl text-ivory/70">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="display text-2xl text-ink">{market.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{market.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
