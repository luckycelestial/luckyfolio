import { Hero } from '@/components/Hero';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Timeline } from '@/components/Timeline';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <TechStack />
      <Projects />
      <Timeline />
      <Contact />
    </main>
  );
}
