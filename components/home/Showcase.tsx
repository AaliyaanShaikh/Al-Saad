'use client';

import { showcaseProjects } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from '@/components/home/ProjectCard';

export function Showcase() {
  return (
    <section className="relative mx-auto max-w-7xl bg-black px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-48">
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />

      <Reveal>
        <div className="mb-12 flex flex-col items-start justify-between sm:mb-16 md:mb-24 lg:mb-32 lg:flex-row lg:items-end">
          <div className="w-full max-w-2xl lg:w-auto">
            <p className="mb-4 text-[9px] font-medium tracking-[0.5em] text-stone-600 uppercase sm:mb-6 sm:text-[10px] sm:tracking-[0.6em] md:mb-8">
              Highlighting Achievements
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Work That
              <br />
              Speaks for Itself
            </h2>
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-stone-500 sm:mt-10 md:mt-12 lg:mt-0 lg:ml-8">
            A curated space honoring remarkable achievements, crafted to reflect prestige, purpose,
            and distinction.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        {showcaseProjects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
