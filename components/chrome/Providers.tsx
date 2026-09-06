'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CallModal } from '@/components/chrome/CallModal';

type CallContextValue = {
  openCall: () => void;
  closeCall: () => void;
  isOpen: boolean;
  heroReady: boolean;
  setHeroReady: (v: boolean) => void;
};

const CallContext = createContext<CallContextValue | null>(null);

export function useCallModal() {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCallModal must be used within Providers');
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const openCall = useCallback(() => setIsOpen(true), []);
  const closeCall = useCallback(() => setIsOpen(false), []);

  return (
    <CallContext.Provider value={{ openCall, closeCall, isOpen, heroReady, setHeroReady }}>
      {children}
      <CallModal isOpen={isOpen} onClose={closeCall} />
    </CallContext.Provider>
  );
}
