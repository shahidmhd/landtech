import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { formatPrice } from '@/lib/format';

export default function ProjectCard({ project }: { project: Project }) {
  const img =
    project.heroImage?.url ||
    project.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80';

  return (
    <article className="group relative h-full overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
          <Image
            src={img}
            alt={project.heroImage?.alt || project.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="eyebrow text-gold-300">
              {project.address?.city || project.developer || 'Signature Project'}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-cream md:text-3xl">
              {project.name}
            </h3>
            {project.tagline && (
              <p className="mt-2 max-w-md text-sm text-cream/75 line-clamp-2">
                {project.tagline}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between text-cream/85">
              <div className="text-xs uppercase tracking-widest2">
                {project.startingPrice
                  ? `From ${formatPrice(project.startingPrice, project.currency)}`
                  : project.status.replace('-', ' ')}
              </div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-gold-300 transition-transform group-hover:translate-x-1">
                Discover <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
