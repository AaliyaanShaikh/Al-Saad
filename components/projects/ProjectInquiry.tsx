'use client';

import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';

export function ProjectInquiry() {
  const { openCall } = useCallModal();

  return (
    <Magnetic onClick={openCall} className="btn mt-8 w-full justify-center">
      Request a private briefing
      <span className="btn-arrow">→</span>
    </Magnetic>
  );
}
