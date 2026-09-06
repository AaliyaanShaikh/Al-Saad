'use client';

import Image from 'next/image';
import { Magnetic } from '@/components/motion/Magnetic';
import { Reveal } from '@/components/motion/Reveal';
import { useCallModal } from '@/components/chrome/Providers';
import { publicSrc, site } from '@/lib/data';

export function FinalCTA() {
  const { openCall } = useCallModal();

  return (
    <section id="contact" className="relative isolate min-h-[85svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={publicSrc('/teamedit.png')}
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/45 to-void/55" />
      </div>

      <div className="relative mx-auto flex min-h-[85svh] max-w-3xl flex-col items-center justify-center px-5 py-28 text-center md:px-10">
        <Reveal>
          <p className="display mb-6 text-5xl tracking-[0.16em] text-ivory md:text-6xl">
            {site.wordmark}
          </p>
          <h2 className="display mb-6 text-3xl text-ivory md:text-5xl">
            One honest conversation.
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-ivory/75">
            Buying now, later, or simply reading the market — start with clarity.
          </p>
          <Magnetic onClick={openCall} className="btn">
            Request a call
            <span className="btn-arrow">→</span>
          </Magnetic>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-ivory/55">
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="tracking-wide hover:text-ivory"
            >
              {site.phone}
            </a>
            <span className="opacity-40">/</span>
            <a
              href={`mailto:${site.email}`}
              className="normal-case tracking-normal hover:text-ivory"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
