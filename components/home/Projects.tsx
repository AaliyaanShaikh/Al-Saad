'use client';

import Image from 'next/image';
import { projects, publicSrc } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

export function Projects() {
  return (
    <section id="projects" className="bg-paper px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <p className="kicker mb-5">Projects</p>
            <h2 className="display max-w-3xl text-4xl text-ivory md:text-6xl">
              Carefully chosen inventory.
            </h2>
            <p className="lede mt-6">
              Correctly priced. Suited to the right buyer. Built for long-term value.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.06}>
              <article
                className={`group grid gap-0 overflow-hidden rounded-[28px] border border-ivory/10 bg-paper-2 md:grid-cols-2 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
                data-cursor="view"
              >
                <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[360px]">
                  <Image
                    src={publicSrc(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 lg:px-14">
                  <p className="kicker mb-4 text-muted">{project.location}</p>
                  <h3 className="display text-3xl text-ivory md:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-2 md:text-base">
                    {project.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-ivory/10 pt-6">
                    <p className="display text-2xl text-ivory">{project.price}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {project.beds} · {project.sqft} sq ft
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
