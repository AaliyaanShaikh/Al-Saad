'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { nav, site } from '@/lib/data';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openCall } = useCallModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    if (!open) return;
    gsap.fromTo(
      '.mobile-menu-panel',
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut' }
    );
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10 ${
            scrolled ? 'border-b border-ink/10' : 'border-b border-transparent'
          }`}
        >
          <Link href="/" className="display text-lg tracking-[0.14em] text-ink md:text-xl">
            {site.wordmark}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-clay"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic onClick={openCall} className="btn hidden sm:inline-flex">
              Request a call
              <span className="btn-arrow">→</span>
            </Magnetic>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu-panel fixed inset-0 z-[60] flex flex-col bg-paper px-6 py-8">
          <div className="mb-12 flex items-center justify-between">
            <span className="display tracking-[0.14em] text-ink">{site.wordmark}</span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display text-4xl text-ink"
              >
                {item.label}
              </Link>
            ))}
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
