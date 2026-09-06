'use client';

import { type ReactNode } from 'react';
import { Preloader } from '@/components/motion/Preloader';
import { useCallModal } from '@/components/chrome/Providers';

export function AppShell({ children }: { children: ReactNode }) {
  const { setHeroReady } = useCallModal();

  return (
    <>
      <Preloader onReady={() => setHeroReady(true)} />
      {children}
    </>
  );
}
