import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import SplitWords from '@/components/SplitWords';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Discover Landtech signature developments across the region.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-32 text-cream md:pb-24 md:pt-40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 to-ink-900" />
        <div className="container relative">
          <p className="eyebrow text-gold-300">Developments</p>
          <SplitWords
            as="h1"
            className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl"
          >
            <span className="font-extrabold">SIGNATURE</span>{' '}
            <span className="font-extralight">PROJECTS</span>
          </SplitWords>
          <p className="mt-4 max-w-2xl text-cream/75">
            Architecture-first developments in the region’s most desirable districts.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container">
          {projects.length === 0 ? (
            <div className="border border-dashed border-ink-200 p-16 text-center text-ink-500">
              No projects yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.06}>
                  <ProjectCard project={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
