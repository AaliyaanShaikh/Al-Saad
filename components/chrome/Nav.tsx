'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { nav, projects, site } from '@/lib/data';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const { openCall } = useCallModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileProjectsOpen(false);
      return;
    }
    gsap.fromTo(
      '.mobile-menu-panel',
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut' }
    );
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-void/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5 ${
            scrolled ? 'border-b border-ivory/10' : 'border-b border-transparent'
          }`}
        >
          <Link
            href="/"
            className="display text-base tracking-[0.16em] text-ivory md:text-lg"
          >
            {site.wordmark}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) =>
              item.label === 'Projects' ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/65 transition-colors hover:text-ivory"
                    aria-expanded={projectsOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      className={`h-3 w-3 transition-transform duration-200 ${
                        projectsOpen ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2.5 4.5L6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <div
                    className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      projectsOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-1 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-void/95 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
                      <ul className="py-2">
                        {projects.map((project) => (
                          <li key={project.id}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="block px-5 py-2.5 text-[11px] tracking-[0.04em] text-ivory/65 transition-colors hover:bg-ivory/5 hover:text-ivory"
                              onClick={() => setProjectsOpen(false)}
                            >
                              <span className="block font-medium text-ivory/90">
                                {project.title}
                              </span>
                              <span className="mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-muted">
                                {project.location}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-ivory/10 px-5 py-3">
                        <Link
                          href="/#projects"
                          className="text-[9px] uppercase tracking-[0.18em] text-silver transition-colors hover:text-ivory"
                          onClick={() => setProjectsOpen(false)}
                        >
                          View all projects →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/65 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic onClick={openCall} className="btn hidden sm:inline-flex">
              Request a call
              <span className="btn-arrow">→</span>
            </Magnetic>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-sm text-ivory md:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu-panel fixed inset-0 z-[60] flex flex-col bg-void px-6 py-8">
          <div className="mb-14 flex items-center justify-between">
            <span className="display tracking-[0.14em] text-ivory">{site.wordmark}</span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto">
            {nav.map((item) =>
              item.label === 'Projects' ? (
                <div key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between display text-4xl text-ivory"
                    onClick={() => setMobileProjectsOpen((v) => !v)}
                    aria-expanded={mobileProjectsOpen}
                  >
                    {item.label}
                    <svg
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileProjectsOpen ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2.5 4.5L6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {mobileProjectsOpen && (
                    <ul className="mt-4 space-y-3 border-l border-ivory/15 pl-5">
                      {projects.map((project) => (
                        <li key={project.id}>
                          <Link
                            href={`/projects/${project.slug}`}
                            onClick={() => setOpen(false)}
                            className="block text-lg text-ivory/70 transition-colors hover:text-ivory"
                          >
                            {project.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/#projects"
                          onClick={() => setOpen(false)}
                          className="block text-sm uppercase tracking-[0.16em] text-silver"
                        >
                          View all →
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display text-4xl text-ivory"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <button
            type="button"
            className="btn w-full justify-center"
            onClick={() => {
              setOpen(false);
              openCall();
            }}
          >
            Request a call
            <span className="btn-arrow">→</span>
          </button>
        </div>
      )}
    </>
  );
}
