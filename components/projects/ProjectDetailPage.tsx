'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { publicSrc, type Project } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

type ProjectDetailPageProps = {
  project: Project;
  others: Project[];
};

export function ProjectDetailPage({ project, others }: ProjectDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'location-map' | 'floor-plan' | 'unit-plan' | 'video' | 'renders' | 'rera' | 'al-saad-opinion'>('home');

  const brochureUrl = project.brochureUrl ?? '/brochures/Noor A3 presenter Final_compressed.pdf';

  const sidebarItems = [
    { id: 'home', label: 'Home' },
    { id: 'location-map', label: 'LOCATION MAP' },
    { id: 'floor-plan', label: 'FLOOR PLAN' },
    { id: 'unit-plan', label: 'UNIT PLAN' },
    { id: 'video', label: 'VIDEO' },
    { id: 'renders', label: 'RENDERS' },
    { id: 'rera', label: 'RERA' },
    { id: 'al-saad-opinion', label: 'AlSaad Opinion' },
  ] as const;

  const locationImages = [
    '/Project1/View 1_ (1).jpg',
    '/Project1/View 2_ (1).jpg',
    '/Project1/Terrace View 2_.jpg',
    '/Project1/Terrace View 4_.jpg',
  ];

  const floorPlanImages = [
    '/Project1/006_n_Post.jpg',
    '/Project1/001_n_Post (1).jpeg',
    '/Project1/WhatsApp Image 2026-01-15 at 5.44.21 PM.jpg',
  ];

  const unitPlanImages = [
    '/Project1/LIVING ROOM _3BHK TYPE A (1) (2).jpg',
    '/Project1/POWDER BATHROOM -3BHK TYPE A (2).jpg',
    '/Project1/Secondary Bedroom 3BHK (1).jpg',
    '/Project1/IMG_7946.JPG',
  ];

  const renderImages = [
    '/Project1/BANQUET RENDER 1.png',
    '/Project1/CONFERENCE ROOM RENDER 1 .png',
    '/Project1/LIFT LOBBY REDNER 1 EDITED2.png',
    '/Project1/MAIN LOBBY 2- EDITED .png',
    '/Project1/MEETING ROOM RENDER 1 - EDITED.png',
    '/Project1/Multistar_night_001_8K_.jpg',
    '/Project1/duplex render REal.jpg',
  ];

  const creativeImages = [
    '/Project1/76e5c69f-774f-4782-9fba-b5d6e88bf6b6.jpg',
    '/Project1/c97a90e9-4be5-4152-92e1-87dad9dfb14d.jpg',
    '/Project1/WhatsApp Image 2026-01-14 at 4.14.59 PM.jpg',
  ];

  const contentMap = {
    home: {
      eyebrow: 'Home',
      title: project.title,
      description: project.description,
      tagline: project.tagline,
      cta: 'Open brochure',
      media: (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-end">
          <div className="project-visual overflow-hidden rounded-[26px] border border-ivory/15 bg-black/20 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={publicSrc(project.image)}
                alt={project.title}
                fill
                className={`${project.imagePosition ?? ''} object-cover`}
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>
          </div>

          <div className="project-brief-card rounded-[26px] border border-ivory/15 bg-void/70 p-5 backdrop-blur-md">
            <p className="kicker mb-5 text-[9px] text-muted">Al-Saad opinion</p>
            <div className="space-y-4 text-sm text-ivory/80">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Location</span>
                <span className="mt-2 block text-base text-ivory">{project.location}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Unit mix</span>
                <span className="mt-2 block text-base text-ivory">{project.beds}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Entry</span>
                <span className="mt-2 block text-base text-ivory">{project.price}</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    'location-map': {
      eyebrow: 'Location map',
      title: 'Where the address performs',
      description: 'A quick read on the micro-market, movement, and the lifestyle logic behind the address.',
      tagline: null,
      cta: 'See map set',
      media: (
        <div className="grid gap-5 md:grid-cols-2">
          {locationImages.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-ivory/10 bg-black/30">
              <div className="relative aspect-[4/3]">
                <Image
                  src={publicSrc(image)}
                  alt={`Location map view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    'floor-plan': {
      eyebrow: 'Floor plan',
      title: 'Arrival, movement, and tower logic',
      description: 'The vertical structure, bandwidths, and how the tower reads from ground to sky.',
      tagline: null,
      cta: 'Study tower layout',
      media: (
        <div className="grid gap-5 md:grid-cols-3">
          {floorPlanImages.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-ivory/10 bg-black/30">
              <div className="relative aspect-[3/4]">
                <Image
                  src={publicSrc(image)}
                  alt={`Floor plan image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    'unit-plan': {
      eyebrow: 'Unit plan',
      title: 'Layouts, room logic, and usable scale',
      description: 'The real shortlist of formats and room choreography behind the purchase decision.',
      tagline: null,
      cta: 'Review unit mix',
      media: (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[22px] border border-ivory/10 bg-void/40 p-5">
            <div className="space-y-6">
              {project.typologies?.map((row) => (
                <div key={`${row.name}-${row.area}`} className="border-b border-ivory/10 pb-4 last:border-0 last:pb-0">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{row.note ?? row.name}</p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-base text-ivory">{row.name}</span>
                    <span className="text-sm text-ink-2">{row.area} sq ft</span>
                  </div>
                  <p className="mt-2 text-sm text-ivory">{row.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {unitPlanImages.map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-ivory/10 bg-black/20">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={publicSrc(image)}
                    alt={`Unit plan image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    video: {
      eyebrow: 'Video',
      title: 'A cinematic walk-through',
      description: 'Preview the visual language and the feeling of the address before the detail gets technical.',
      tagline: null,
      cta: 'Play preview',
      media: (
        <div className="overflow-hidden rounded-[24px] border border-ivory/10 bg-black">
          <div className="relative aspect-video">
            <Image
              src={publicSrc(project.image)}
              alt={`${project.title} video preview`}
              fill
              className="object-cover opacity-75"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/30 bg-white/5 backdrop-blur-sm text-2xl text-ivory">
                ▶
              </div>
            </div>
          </div>
        </div>
      ),
    },
    renders: {
      eyebrow: 'Renders',
      title: 'Project atmosphere, materiality, and lifestyle cues',
      description: 'This is where the idea sells itself: the finished texture, the mood, and the lived-in feel.',
      tagline: null,
      cta: 'View render set',
      media: (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {renderImages.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-ivory/10 bg-black/20">
              <div className="relative aspect-[4/3]">
                <Image
                  src={publicSrc(image)}
                  alt={`Render ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    rera: {
      eyebrow: 'RERA',
      title: 'Project register and legal clarity',
      description: 'Technical detail, registration status, and the fundamentals buyers still verify before they commit.',
      tagline: null,
      cta: 'Review RERA',
      media: (
        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[22px] border border-ivory/10 bg-void/30 p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Registration</p>
            <h3 className="display mt-3 text-3xl text-ivory">{project.rera ?? 'PR1180002501853'}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              This project is positioned as a premium residential asset with a clear tower profile, anchoring amenity floors, and a progressive release structure through the higher bands.
            </p>
          </div>
          <div className="rounded-[22px] border border-ivory/10 bg-void/30 p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Project snapshot</p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li>G+37 storey tower</li>
              <li>3 BHK to penthouse</li>
              <li>30+ lifestyle amenities</li>
              <li>Andheri West – Oshiwara</li>
            </ul>
          </div>
        </div>
      ),
    },
    'al-saad-opinion': {
      eyebrow: 'Al-Saad opinion',
      title: 'The strategic read',
      description: 'An evaluation of the address, product, and buyer intent in plain English.',
      tagline: null,
      cta: 'Read opinion',
      media: (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[22px] border border-ivory/10 bg-void/30 p-5">
            <p className="text-sm leading-relaxed text-ink-2">
              This is a strategic urban-address play in Andheri West — strong on access, aspirational on lifestyle, and well-positioned for buyers who want premium scale without compromise. The tower format, amenity stack, and the 3-bed-to-penthouse ladder give it a conventional luxury appeal, but the real edge is how the address works in day-to-day life: proximity, movement, and privacy in a micro-market that still matters.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {creativeImages.map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-ivory/10 bg-black/20">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={publicSrc(image)}
                    alt={`Creative concept ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  } as const;

  const activeContent = contentMap[activeTab];

  return (
    <div className="bg-void text-ivory">
      <section className="project-hero relative isolate overflow-hidden border-b border-ivory/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src={publicSrc(project.image)}
            alt={project.title}
            fill
            priority
            className={`object-cover ${project.imagePosition ?? ''}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(7,10,15,0.42),_rgba(0,0,0,0.78)_58%,_rgba(0,0,0,0.9))]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03070d] via-[#02070d]/75 to-[#02070d]/40" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-16 md:px-10 md:pb-12 md:pt-20 xl:px-14 xl:pt-24">
          <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-10">
            <aside className="project-sidebar hidden min-h-[560px] pt-2 xl:block">
              <div className="flex flex-col gap-4 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/70">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`text-left transition-opacity ${activeTab === item.id ? 'text-ivory opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="pb-10 xl:pb-14">
              <div className="mb-8 flex flex-col gap-5 xl:mb-10 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-xl">
                  <p className="kicker mb-5 text-[9px] text-silver-bright md:text-[10px]">
                    {project.developer ? `${project.developer} · ${project.location}` : project.location}
                  </p>
                  <h1 className="display max-w-5xl text-[3.6rem] leading-[0.82] text-ivory sm:text-[5rem] md:text-[6.5rem] lg:text-[7.2rem]">
                    {activeTab === 'home' ? project.title : activeContent.title}
                  </h1>
                </div>

                <button type="button" className="btn btn-outline w-fit self-start xl:self-end">
                  Request a call
                  <span className="btn-arrow">→</span>
                </button>
              </div>

              {activeTab === 'home' ? (
                <>
                  {project.tagline && (
                    <p className="font-display text-[2rem] italic text-ivory/75 md:text-[2.8rem]">
                      “{project.tagline}”
                    </p>
                  )}

                  <p className="mt-7 max-w-[1200px] text-[1.2rem] leading-[1.5] text-ivory/75 md:text-[1.7rem]">
                    {project.description}
                  </p>

                  <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-end">
                    <div className="project-visual overflow-hidden rounded-[26px] border border-ivory/15 bg-black/20 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={publicSrc(project.image)}
                          alt={project.title}
                          fill
                          className={`${project.imagePosition ?? ''} object-cover`}
                          sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                      </div>
                    </div>

                    <div className="project-brief-card rounded-[26px] border border-ivory/15 bg-void/70 p-5 backdrop-blur-md">
                      <p className="kicker mb-5 text-[9px] text-muted">Al-Saad opinion</p>
                      <div className="space-y-4 text-sm text-ivory/80">
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Location</span>
                          <span className="mt-2 block text-base text-ivory">{project.location}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Unit mix</span>
                          <span className="mt-2 block text-base text-ivory">{project.beds}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Entry</span>
                          <span className="mt-2 block text-base text-ivory">{project.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-8 max-w-[1200px]">
                  <div className="mb-6">
                    <p className="kicker mb-3 text-[9px] text-muted">{activeContent.eyebrow}</p>
                    <h2 className="display text-3xl text-ivory md:text-5xl">{activeContent.title}</h2>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-ivory/75 md:text-lg">
                      {activeContent.description}
                    </p>
                  </div>

                  {activeContent.media}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        {activeTab === 'home' && (
          <section className="scroll-mt-28 py-8">
            <div className="project-shell rounded-[28px] border border-ivory/10 bg-paper-2 p-6 md:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="kicker mb-4 text-muted">Home</p>
                  <h2 className="display text-3xl text-ivory md:text-5xl">A full understanding of the position</h2>
                </div>
                <a href={brochureUrl} target="_blank" rel="noreferrer" className="btn w-fit">
                  Open brochure
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {activeTab !== 'home' && (
          <section className="scroll-mt-28 py-8">
            <div className="project-shell rounded-[28px] border border-ivory/10 bg-paper-2 p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="kicker mb-2 text-muted">{activeContent.eyebrow}</p>
                  <h2 className="display text-3xl text-ivory md:text-5xl">{activeContent.title}</h2>
                </div>
                <button type="button" className="btn btn-outline hidden sm:inline-flex" onClick={() => setActiveTab('home')}>
                  Back to home
                  <span className="btn-arrow">→</span>
                </button>
              </div>
              {activeContent.media}
            </div>
          </section>
        )}
      </main>

      <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-[28px] border border-ivory/10 bg-[#070b10] px-4 py-5 md:px-6 md:py-6">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-ivory/60 md:text-[12px]">The Position</p>
            </div>

            <div className="space-y-0">
              {[
                ['Developer', project.developer ?? 'Multistar Builders'],
                ['Pricing', project.price],
                ['Format', project.beds],
                ['Carpet', project.sqft],
                ['Location', project.location],
                ['Access', project.status],
                ['MahaRERA', project.rera ?? 'PR1180002501853'],
              ].map(([label, value], index, arr) => {
                const isLast = index === arr.length - 1;

                return (
                  <div
                    key={label}
                    className={`grid gap-4 border-t border-ivory/10 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${isLast ? 'border-b border-ivory/10' : ''}`}
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 md:text-[12px]">
                      {label}
                    </div>
                    <div className="text-left text-[1.05rem] font-medium text-ivory md:text-[1.6rem] md:font-normal">
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button type="button" className="w-full rounded-full border border-ivory/10 bg-[#f1efe9] px-6 py-4 text-center text-[13px] uppercase tracking-[0.18em] text-[#0d1014] transition-transform hover:-translate-y-0.5 md:text-[15px]">
                Request a private briefing
                <span className="ml-2 inline-block">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="kicker mb-4 text-muted">Exclusive residences</p>
          <h2 className="display mb-8 text-3xl text-ivory md:text-4xl">Pricing & RERA carpet</h2>

          <div className="overflow-hidden rounded-[24px] border border-ivory/10 bg-paper-2">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="bg-void/40 text-[10px] uppercase tracking-[0.16em] text-muted">
                    <th className="px-5 py-4 font-medium">Typology</th>
                    <th className="px-5 py-4 font-medium">RERA Carpet (sq ft)</th>
                    <th className="px-5 py-4 font-medium">Price (all incl.)</th>
                  </tr>
                </thead>
                <tbody>
                  {project.typologies?.map((row) => (
                    <tr key={`${row.name}-${row.area}`} className="border-t border-ivory/10 text-sm text-ivory/80">
                      <td className="border-t border-ivory/10 px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-base text-ivory">{row.name}</span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted">{row.note ?? 'Residences'}</span>
                        </div>
                      </td>
                      <td className="border-t border-ivory/10 px-5 py-4">{row.area}</td>
                      <td className="border-t border-ivory/10 px-5 py-4">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-5 text-sm text-ink-2">
            All-inclusive pricing as briefed. Figures are indicative and subject to change. MahaRERA {project.rera ?? 'PR1180002501853'}.
          </p>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="kicker mb-4">More positions</p>
              <h2 className="display mb-10 text-3xl text-ivory md:text-4xl">Continue exploring</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.05}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group block overflow-hidden rounded-[22px] border border-ivory/10 bg-paper-2"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={publicSrc(item.image)}
                        alt={item.title}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.imagePosition ?? ''}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="kicker mb-2 text-muted">{item.location}</p>
                      <h3 className="display text-xl text-ivory">{item.title}</h3>
                      <p className="mt-2 text-sm text-ink-2">{item.price}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
