'use client';

import { Magnetic } from '@/components/motion/Magnetic';
import { useCallModal } from '@/components/chrome/Providers';

export function ProjectInquiry({ projectTitle }: { projectTitle: string }) {
  const { openCall } = useCallModal();

  return (
    <Magnetic onClick={openCall} className="btn mt-8 w-full justify-center">
      Enquire about {projectTitle}
      <span className="btn-arrow">→</span>
    </Magnetic>
  );
}
