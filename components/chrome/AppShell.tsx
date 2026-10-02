'use client';

import { type ReactNode } from 'react';
import { Preloader } from '@/components/motion/Preloader';
import { useCallModal } from '@/components/chrome/Providers';

export function AppShell({ children }: { children: ReactNode }) {
  const { setHeroReady } = useCallModal();

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center">
        <p className="mt-2 rounded-full border border-ivory/20 bg-void/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory/80 backdrop-blur">
          Design preview — not the live site
        </p>
      </div>
      <Preloader onReady={() => setHeroReady(true)} />
      {children}
    </>
  );
}
