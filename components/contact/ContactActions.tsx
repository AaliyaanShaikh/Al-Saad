'use client';

import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';

export function ContactActions() {
  const { openCall } = useCallModal();

  return (
    <Magnetic onClick={openCall} className="btn">
      Request a call
      <span className="btn-arrow">→</span>
    </Magnetic>
  );
}
