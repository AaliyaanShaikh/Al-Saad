'use client';

import { useState } from 'react';
import { publicSrc, type ShowcaseItem } from '@/lib/data';

export function ProjectCard({ project }: { project: ShowcaseItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative h-[400px] overflow-hidden bg-[#0a0a0a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicSrc(project.image)}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-all duration-[2s] ${
            isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-60' : 'opacity-80'
          }`}
        />

        <div
          className={`absolute top-8 left-8 transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
          }`}
        >
          <span className="rounded-full border border-white/10 bg-black/80 px-5 py-2 text-[10px] font-medium tracking-[0.3em] text-white uppercase backdrop-blur">
            {project.category}
          </span>
        </div>
        <div
          className={`absolute top-8 right-8 transition-all duration-500 ${
            isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
          }`}
        >
          <span className="rounded-full border border-white/10 bg-black/80 px-5 py-2 text-[10px] font-medium tracking-[0.3em] text-white uppercase backdrop-blur">
            {project.year}
          </span>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 md:p-10">
        <h3
          className={`mb-2 font-serif text-2xl font-light text-white transition-all duration-500 sm:mb-3 sm:text-3xl md:text-4xl ${
            isHovered ? 'translate-x-2' : 'translate-x-0'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mb-4 text-sm leading-relaxed font-light transition-all duration-500 sm:mb-6 md:mb-8 ${
            isHovered ? 'translate-x-1 text-stone-400' : 'translate-x-0 text-stone-500'
          }`}
        >
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full border border-white/10 bg-black px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-stone-500 uppercase transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
              style={{
                transitionDelay: `${idx * 50}ms`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`flex items-center text-sm transition-all duration-500 ${
            isHovered ? 'translate-x-2 text-white' : 'translate-x-0 text-stone-400'
          }`}
        >
          <span className="mr-3 text-[10px] font-medium tracking-[0.4em] uppercase">
            View Project
          </span>
          <svg
            className={`h-4 w-4 transition-all duration-500 ${
              isHovered ? 'translate-x-2 scale-110' : 'translate-x-0 scale-100'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
