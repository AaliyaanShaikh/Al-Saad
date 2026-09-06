'use client';

import Image from 'next/image';
import { projects, publicSrc } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

export function Projects() {
  return (
    <section id="projects" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker mb-4">Projects</p>
          <h2 className="display mb-4 max-w-3xl text-4xl text-ink md:text-6xl">
            Carefully chosen inventory.
          </h2>
          <p className="lede mb-14">
            Only what is correctly priced and suited to the right buyer — not short-term noise.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08}>
              <article className="card group overflow-hidden" data-cursor="view">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={publicSrc(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="kicker mb-2 text-muted">{project.location}</p>
                    <h3 className="display text-2xl text-ink md:text-3xl">{project.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-ink-2">{project.description}</p>
                  </div>
                  <div className="shrink-0 text-sm text-ink-2 md:text-right">
                    <p className="font-medium text-ink">{project.price}</p>
                    <p className="mt-1">
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
