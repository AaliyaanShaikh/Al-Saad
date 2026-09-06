'use client';

import { services } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

export function Services() {
  return (
    <section className="reveal relative mx-2 mb-12 overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#050505] py-24 sm:mx-4 sm:mb-16 sm:py-32 md:mx-8 md:mb-24 md:py-48">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <Reveal>
          <div className="mb-12 text-center sm:mb-16 md:mb-20">
            <p className="mb-4 text-[9px] font-medium tracking-[0.5em] text-stone-600 uppercase sm:mb-6 sm:text-[10px] sm:tracking-[0.6em] md:mb-8">
              Services
            </p>
            <h2 className="font-serif text-3xl leading-[1.1] font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              How I Help You
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3 md:gap-16 lg:gap-24 xl:gap-32">
          {services.map((skill, idx) => (
            <Reveal key={skill.title} delay={idx * 0.1}>
              <div className="group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black transition-all duration-500 group-hover:scale-110 group-hover:bg-white sm:mb-8 sm:h-14 sm:w-14 md:mb-10 md:h-16 md:w-16">
                  <span className="font-serif text-xl text-white italic transition-colors group-hover:text-black sm:text-2xl">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="mb-4 font-serif text-2xl font-light tracking-tight text-white transition-colors group-hover:text-white/80 sm:mb-6 sm:text-3xl md:text-4xl">
                  {skill.title}
                </h4>
                <p className="text-sm leading-relaxed font-light text-stone-600 transition-colors group-hover:text-stone-400 sm:text-base">
                  {skill.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
