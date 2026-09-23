import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { publicSrc, site } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { ContactActions } from '@/components/contact/ContactActions';

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: `Speak with ${site.founder} — ${site.phone} · ${site.email}`,
};

export default function ContactPage() {
  return (
    <div className="bg-void">
      <section className="relative isolate min-h-[85svh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={publicSrc('/teamedit.png')}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-void/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/50 to-void/60" />
        </div>

        <div className="relative mx-auto flex min-h-[85svh] max-w-3xl flex-col items-center justify-center px-5 py-32 text-center md:px-10">
          <Reveal>
            <Link
              href="/"
              className="kicker mb-10 inline-block text-ivory/50 transition-colors hover:text-ivory"
            >
              ← Home
            </Link>
            <p className="display mb-6 text-5xl tracking-[0.16em] text-ivory md:text-6xl">
              {site.wordmark}
            </p>
            <h1 className="display mb-6 text-3xl text-ivory md:text-5xl">
              One honest conversation.
            </h1>
            <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-ivory/75">
              Buying now, later, or simply reading the market — start with clarity.
            </p>
            <ContactActions />
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ivory"
              >
                Instagram
              </a>
              <span className="opacity-30">·</span>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ivory"
              >
                YouTube
              </a>
              <span className="opacity-30">·</span>
              <a
                href={site.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ivory"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
