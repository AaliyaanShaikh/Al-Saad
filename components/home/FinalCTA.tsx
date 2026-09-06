'use client';

import Image from 'next/image';
import { Parallax } from '@/components/motion/Parallax';
import { Magnetic } from '@/components/motion/Magnetic';
import { Reveal } from '@/components/motion/Reveal';
import { useCallModal } from '@/components/chrome/Providers';
import { publicSrc, site } from '@/lib/data';

export function FinalCTA() {
  const { openCall } = useCallModal();

  return (
    <section id="contact" className="relative overflow-hidden bg-paper-3">
      <div className="absolute inset-0">
        <Parallax amount={8} className="h-full w-full">
          <div className="relative h-[120%] w-full -translate-y-[10%]">
            <Image
              src={publicSrc('/IMG_4653.jpg')}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-void/65" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 py-28 text-center md:px-10">
        <Reveal>
          <p className="kicker mb-5 text-gold-bright">Begin</p>
          <h2 className="display mb-6 text-4xl text-ivory md:text-6xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-ivory/70">
            Whether you’re buying now, later, or simply reading the market — one clear conversation
            is enough to start.
          </p>
          <Magnetic onClick={openCall} className="btn">
            Request a call
            <span className="btn-arrow">→</span>
          </Magnetic>
          <p className="mt-8 text-sm text-ivory/55">
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ivory">
              {site.phone}
            </a>
            {' · '}
            <a href={`mailto:${site.email}`} className="hover:text-ivory">
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
