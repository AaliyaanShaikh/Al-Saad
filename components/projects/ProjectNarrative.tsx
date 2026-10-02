'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicSrc, type Project } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectInquiry } from '@/components/projects/ProjectInquiry';
import { BrochureFrame } from '@/components/projects/BrochureFrame';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const spaces = [
  {
    title: 'Bedroom',
    caption: 'Secondary bedroom in the 3 bed home. The carved wall is the headboard, not a feature lobby.',
    image: '/Project1/Secondary Bedroom 3BHK (1).webp',
  },
  {
    title: 'Powder room',
    caption: 'The 3 bed powder bath: green stone, a bronze basin, and a screen of timber slats.',
    image: '/Project1/POWDER BATHROOM -3BHK TYPE A (2).webp',
  },
  {
    title: 'Duplex dining',
    caption: 'The larger home. The spiral stair sits in the dining room, so the second floor is part of daily life.',
    image: '/Project1/WhatsApp Image 2026-01-15 at 5.44.21 PM.webp',
  },
  {
    title: 'Sitting room',
    caption: 'A quieter lounge with a balcony. This is a room to stay in, not a passage.',
    image: '/Project1/WhatsApp Image 2026-01-14 at 4.14.59 PM.webp',
  },
  {
    title: 'Pool lounge',
    caption: 'Amenity deck at dusk. Seating faces the water, with the tower’s timber wall behind it.',
    image: '/Project1/View 2_ (1).webp',
  },
  {
    title: 'Loungers',
    caption: 'The same deck in daylight. Two timber screens, planting, and a shallow edge of pool.',
    image: '/Project1/View 1_ (1).webp',
  },
  {
    title: 'Terrace lawn',
    caption: 'Outdoor seating against the glass pavilion. This is the daytime version of the amenity floor.',
    image: '/Project1/Terrace View 2_.webp',
  },
  {
    title: 'Rooftop pavilion',
    caption: 'A glass room on the roof, with a lawn, outdoor gym, and the city at the railing.',
    image: '/Project1/Terrace View 4_.webp',
  },
  {
    title: 'Gym',
    caption: 'Training floor with the skyline outside. Cardio faces the glass; weights sit toward the room.',
    image: '/Project1/Gym 2_Updated_.webp',
  },
  {
    title: 'Playroom',
    caption: 'Daylight, a climbing wall, and the city beyond the glass. The indoor playroom is a real room, not a corner.',
    image: '/Project1/c97a90e9-4be5-4152-92e1-87dad9dfb14d.webp',
  },
  {
    title: 'Banquet',
    caption: 'Round tables, a long glass wall, and a ceiling of glass leaves. Built for a seated gathering.',
    image: '/Project1/BANQUET RENDER 1.webp',
  },
  {
    title: 'Boardroom',
    caption: 'A long table, shelving, and blinds. This is the meeting room, separate from the banquet.',
    image: '/Project1/CONFERENCE ROOM RENDER 1 .webp',
  },
];

const contents = [
  { href: '#read', label: 'The read' },
  { href: '#arrival', label: 'Arrival' },
  { href: '#lobby', label: 'Lobby' },
  { href: '#residence', label: '3 bed home' },
  { href: '#duplex', label: 'Duplex' },
  { href: '#spaces', label: 'Rooms' },
  { href: '#figures', label: 'Figures' },
  { href: '#brochure', label: 'Brochure' },
];

function RoomCard({ space }: { space: (typeof spaces)[number] }) {
  return (
    <figure className="overflow-hidden rounded-[22px] border border-ivory/10 bg-paper-2">
      <div className="relative aspect-[4/3]">
        <Image
          src={publicSrc(space.image)}
          alt={space.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <figcaption className="p-5">
        <h3 className="display text-2xl text-ivory">{space.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{space.caption}</p>
      </figcaption>
    </figure>
  );
}

function RoomSlider() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (next: number) => {
    const el = scroller.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(spaces.length - 1, next));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    setIndex(clamped);
  };

  return (
    <div className="sm:hidden">
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const el = event.currentTarget;
          if (!el.clientWidth) return;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {spaces.map((space) => (
          <div key={space.title} className="w-full shrink-0 snap-center">
            <RoomCard space={space} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory disabled:opacity-30"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous room"
        >
          ←
        </button>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {index + 1} / {spaces.length}
        </p>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory disabled:opacity-30"
          onClick={() => go(index + 1)}
          disabled={index === spaces.length - 1}
          aria-label="Next room"
        >
          →
        </button>
      </div>
    </div>
  );
}

export function ProjectNarrative({ project }: { project: Project }) {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const hero = heroRef.current;
      const media = mediaRef.current;
      if (!hero || !media || reduced) return;
      gsap.fromTo(
        media,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <div className="bg-void text-ivory">
      <section ref={heroRef} className="relative isolate min-h-[100svh] overflow-hidden">
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <Image
            src={publicSrc(project.image)}
            alt="Evening view of the G+37 tower in Andheri West"
            fill
            priority
            className={`object-cover ${project.imagePosition ?? 'object-center'}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/25" />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 md:px-10 md:pb-16">
          <Link href="/#projects" className="kicker mb-8 w-fit text-ivory/60 hover:text-ivory">
            ← All projects
          </Link>
          <p className="kicker mb-4 text-silver-bright">
            {project.developer} · {project.location}
          </p>
          <h1 className="display max-w-4xl text-4xl font-extralight sm:text-5xl md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-4 font-display text-lg italic text-ivory/75 md:text-2xl">{project.tagline}</p>
          )}
          <p className="mt-6 max-w-xl text-sm text-ivory/70 md:text-base">
            G+37 · Homes from the 8th floor · From ₹3.80 Cr all inclusive
          </p>
        </div>
      </section>

      <section id="read" className="scroll-mt-24 border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="kicker mb-5">How to read this</p>
            <p className="display text-3xl font-extralight leading-tight text-ivory md:text-5xl">
              {project.description}
            </p>
            <p className="body mt-8 max-w-2xl text-base md:text-lg">{project.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <p className="kicker mb-4 text-muted">On this page</p>
            <ol className="space-y-2">
              {contents.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-baseline gap-3 rounded-xl px-2 py-2 text-sm text-ivory/70 transition-colors hover:bg-ivory/5 hover:text-ivory"
                  >
                    <span className="text-[10px] tracking-[0.16em] text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {project.chapters?.map((chapter, index) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className="scroll-mt-24 border-t border-ivory/10 px-5 py-14 md:px-10 md:py-20"
        >
          <div
            className={`mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
              index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[16/11]">
                <Image
                  src={publicSrc(chapter.image)}
                  alt={chapter.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-5">
              <p className="kicker mb-4 text-muted">{chapter.kicker}</p>
              <h2 className="display text-3xl font-extralight text-ivory md:text-5xl">{chapter.title}</h2>
              <p className="body mt-5 text-base md:text-lg">{chapter.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="relative isolate min-h-[70svh] overflow-hidden border-t border-ivory/10">
        <Image
          src={publicSrc('/Project1/Multistar_night_001_8K_.webp')}
          alt="The tower after dark"
          fill
          className="object-cover object-[center_25%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/50" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl items-end px-5 py-16 md:px-10">
          <p className="display max-w-xl text-3xl font-extralight md:text-5xl">
            Thirty-seven floors. Homes begin on the eighth.
          </p>
        </div>
      </section>

      <section id="spaces" className="scroll-mt-24 border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="kicker mb-4">Rooms, named plainly</p>
            <h2 className="display mb-10 max-w-2xl text-3xl font-extralight md:text-5xl">
              What each picture is.
            </h2>
          </Reveal>
          <RoomSlider />
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space) => (
              <Reveal key={space.title}>
                <RoomCard space={space} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="figures" className="scroll-mt-24 border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker mb-4">Figures</p>
              <h2 className="display mb-8 text-3xl font-extralight md:text-4xl">Pricing and RERA carpet</h2>
              <ul className="space-y-3 md:hidden">
                {project.typologies?.map((row) => (
                  <li
                    key={`${row.name}-${row.area}`}
                    className="rounded-[18px] border border-ivory/10 bg-paper-2 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-ivory">{row.name}</p>
                        {row.note && <p className="mt-1 text-xs text-muted">{row.note}</p>}
                        <p className="mt-2 text-xs text-ink-2">{row.area} sq ft</p>
                      </div>
                      <p className="shrink-0 text-right text-sm text-ivory">{row.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto rounded-[22px] border border-ivory/10 md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-paper-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                    <tr>
                      <th className="px-4 py-4 font-medium lg:px-6">Home</th>
                      <th className="px-4 py-4 font-medium lg:px-6">Carpet sq ft</th>
                      <th className="px-4 py-4 text-right font-medium lg:px-6">All inclusive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.typologies?.map((row) => (
                      <tr key={`${row.name}-${row.area}`} className="border-t border-ivory/10">
                        <td className="px-4 py-4 text-ivory lg:px-6">
                          {row.name}
                          {row.note && <span className="mt-1 block text-xs text-muted">{row.note}</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-ink-2 lg:px-6">{row.area}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-ivory lg:px-6">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Indicative, and subject to change.
                {project.rera ? ` MahaRERA ${project.rera}.` : ''} The third floor band is opening soon.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="rounded-[28px] border border-ivory/10 bg-paper-2 p-5 sm:p-6 md:p-8">
                <p className="kicker mb-6 text-muted">Floor bands</p>
                <ul className="space-y-3">
                  {project.floorBands?.map((band) => (
                    <li
                      key={band.name}
                      className="flex items-baseline justify-between gap-4 border-b border-ivory/10 pb-3 last:border-0"
                    >
                      <p className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted">
                        {band.name}
                      </p>
                      <p className="text-right text-sm whitespace-nowrap text-ivory">{band.floors}</p>
                    </li>
                  ))}
                </ul>
                <ProjectInquiry />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="brochure" className="scroll-mt-24 border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="kicker mb-4">Brochure</p>
            <h2 className="display max-w-2xl text-3xl font-extralight md:text-5xl">
              The long document, without the sales voice.
            </h2>
            <p className="body mt-5 max-w-xl">
              Read it here, or open the file on its own.
            </p>
            {project.brochureUrl && (
              <a href={project.brochureUrl} target="_blank" rel="noreferrer" className="btn mt-8 inline-flex">
                Open brochure
                <span className="btn-arrow">→</span>
              </a>
            )}
          </Reveal>
          {project.brochureUrl && (
            <div className="mt-10 overflow-hidden rounded-[24px] border border-ivory/10">
              <BrochureFrame src={project.brochureUrl} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
