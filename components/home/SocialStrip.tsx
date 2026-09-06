'use client';

import Image from 'next/image';
import { publicSrc, socialItems } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';

export function SocialStrip() {
  return (
    <section className="bg-paper overflow-hidden py-20 md:py-28">
      <Reveal className="px-5 md:px-10">
        <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6">
          <div>
            <p className="kicker mb-3">On social</p>
            <h2 className="display text-3xl text-ink md:text-4xl">Stories from the corridor</h2>
          </div>
        </div>
      </Reveal>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-5 pb-4 md:gap-5 md:px-10">
        {socialItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="view"
            className="card w-[180px] shrink-0 md:w-[220px]"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              <Image
                src={publicSrc(item.image)}
                alt={item.title}
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
            <div className="p-3">
              <p className="truncate text-sm text-ink">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.platform}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16">
        <Marquee text="Bandra · Khar · Santacruz · Andheri · Versova · Jogeshwari" />
      </div>
    </section>
  );
}
