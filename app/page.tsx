import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { Markets } from '@/components/home/Markets';
import { Projects } from '@/components/home/Projects';
import { Process } from '@/components/home/Process';
import { DarkChapter } from '@/components/home/DarkChapter';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Markets />
      <Projects />
      <Process />
      <DarkChapter />
      <FinalCTA />
    </>
  );
}
