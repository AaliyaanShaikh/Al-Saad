import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { markets, publicSrc, site, testimonials } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { Words } from '@/components/motion/Words';

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `Meet ${site.founder} — honest property advisory across Mumbai’s western suburbs.`,
};

export default function AboutPage() {
  const quote = testimonials[0];

  return (
    <div className="bg-void">
      <section className="px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link href="/" className="kicker mb-8 inline-block text-muted hover:text-silver">
              ← Home
            </Link>
            <p className="kicker mb-6 text-silver">About</p>
            <Words
              text="Not just a *broker*."
              className="display text-4xl text-ivory md:text-6xl lg:text-7xl"
            />
            <p className="display mt-3 text-3xl text-ivory/45 md:text-5xl lg:text-6xl">
              A long-term advisor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory/10 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="max-w-xl space-y-5 text-base leading-relaxed text-ivory/65 md:text-lg">
                <p>
                  {site.founder}, founder of {site.name}. I work across Mumbai’s western suburbs —
                  helping buyers avoid the expensive mistakes that look harmless on a brochure.
                </p>
                <p>
                  My job is not to sell you a flat. It is to help you make the right decision —
                  whether that means buying now, waiting, or walking away.
                </p>
                <p>
                  Pricing without theatre. Timing without pressure. Counsel that still makes sense
                  years later.
                </p>
              </div>

              <div className="mt-14">
                <p className="kicker mb-6">Markets covered</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {markets.map((market) => (
                    <li
                      key={market.id}
                      className="text-sm uppercase tracking-[0.14em] text-ivory/55"
                    >
                      {market.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image
                  src={publicSrc('/profile.jpeg')}
                  alt={site.founder}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/50 to-transparent p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-silver-bright">
                    Founder
                  </p>
                  <p className="display mt-2 text-2xl text-ivory">{site.founder}</p>
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

      <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <h2 className="display text-3xl text-ivory md:text-4xl">Ready for an honest conversation?</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">
              Start with clarity — no manufactured urgency.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Link href="/contact" className="btn">
              Get in touch
              <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
