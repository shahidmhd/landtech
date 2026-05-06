import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays, MapPin, Building2 } from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';
import LeadForm from '@/components/LeadForm';
import MapView from '@/components/MapView';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';
import SplitWords from '@/components/SplitWords';
import Hero from '@/components/Hero';
import { allProjectSlugs, getProject, getRelatedProperties } from '@/lib/content';
import { formatPrice } from '@/lib/format';

export function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project not found' };
  const cover = project.heroImage?.url || project.gallery?.[0]?.url;
  return {
    title: project.seo?.title || project.name,
    description: project.seo?.description || project.tagline || project.description.slice(0, 200),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: 'article',
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const properties = getRelatedProperties(project.slug, 6);

  const hero =
    project.heroImage?.url ||
    project.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=2400&q=80';
  const coords = project.location?.coordinates;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: project.name,
    description: project.description,
    image: hero,
    address: project.address && {
      '@type': 'PostalAddress',
      streetAddress: project.address.line1,
      addressLocality: project.address.city,
      addressCountry: project.address.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        eyebrow={`${project.developer || 'Landtech'} · ${project.address?.city || ''}`}
        title={
          <>
            <span className="font-extrabold uppercase">
              {project.name.split(' ').slice(0, 1).join(' ')}
            </span>{' '}
            <span className="font-extralight uppercase">
              {project.name.split(' ').slice(1).join(' ')}
            </span>
          </>
        }
        subtitle={project.tagline}
        imageUrl={hero}
        pin
      />

      <section className="bg-cream py-16">
        <div className="container">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-ink-500">
            {project.address?.city && (
              <span className="inline-flex items-center gap-2 text-sm">
                <MapPin size={16} /> {project.address.city}
              </span>
            )}
            {project.handoverDate && (
              <span className="inline-flex items-center gap-2 text-sm">
                <CalendarDays size={16} /> Handover{' '}
                {new Date(project.handoverDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                })}
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest2">
              <Building2 size={16} /> {project.status.replace('-', ' ')}
            </span>
            {project.startingPrice && (
              <span className="ml-auto font-display text-2xl font-bold text-gold-600">
                From {formatPrice(project.startingPrice, project.currency)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-cream pb-24 md:pb-32">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
          <ScrollReveal>
            <p className="eyebrow">Overview</p>
            <SplitWords
              as="h2"
              className="mt-3 font-display text-3xl leading-tight md:text-4xl"
            >
              <span className="font-extrabold">AN&nbsp;ADDRESS</span>{' '}
              <span className="font-extralight">DEFINED&nbsp;BY&nbsp;CRAFT</span>
            </SplitWords>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="md:col-span-2">
            <p className="whitespace-pre-line leading-relaxed text-ink-700">
              {project.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="bg-ink-900 py-24 text-cream md:py-32">
          <div className="container">
            <p className="eyebrow text-gold-300">Highlights</p>
            <SplitWords
              as="h2"
              className="mt-3 max-w-2xl font-display text-3xl leading-tight text-cream md:text-5xl"
            >
              <span className="font-extrabold">DEFINING</span>{' '}
              <span className="font-extralight">ELEMENTS</span>
            </SplitWords>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((h, i) => (
                <ScrollReveal key={h} delay={i * 0.05}>
                  <div className="border-t border-gold-500 pt-5">
                    <p className="text-xs uppercase tracking-widest2 text-gold-300">
                      0{String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 font-display text-xl font-bold">{h}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unit types */}
      {project.unitTypes && project.unitTypes.length > 0 && (
        <section className="bg-cream py-24 md:py-32">
          <div className="container">
            <p className="eyebrow">Residence Types</p>
            <SplitWords as="h2" className="mt-3 font-display text-3xl md:text-5xl">
              <span className="font-extrabold">A&nbsp;RESIDENCE</span>{' '}
              <span className="font-extralight">FOR&nbsp;EVERY&nbsp;CHAPTER</span>
            </SplitWords>
            <div className="mt-12 overflow-x-auto">
              <table className="min-w-full border border-ink-100 bg-white text-left text-sm">
                <thead>
                  <tr className="bg-ink-50 text-xs uppercase tracking-widest2 text-ink-500">
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Beds</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">From</th>
                  </tr>
                </thead>
                <tbody>
                  {project.unitTypes.map((u) => (
                    <tr key={u.label} className="border-t border-ink-100">
                      <td className="px-6 py-4 font-display text-lg font-bold">{u.label}</td>
                      <td className="px-6 py-4">{u.bedrooms ?? '—'}</td>
                      <td className="px-6 py-4">
                        {u.areaSqftFrom
                          ? `${u.areaSqftFrom.toLocaleString()}${
                              u.areaSqftTo ? `–${u.areaSqftTo.toLocaleString()}` : ''
                            } sqft`
                          : '—'}
                      </td>
                      <td className="px-6 py-4 font-display font-bold text-gold-600">
                        {u.priceFrom ? formatPrice(u.priceFrom, project.currency) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-cream pb-24">
          <div className="container">
            <p className="eyebrow">Gallery</p>
            <div className="mt-6">
              <ImageGallery images={project.gallery} />
            </div>
          </div>
        </section>
      )}

      {/* Available residences */}
      {properties.length > 0 && (
        <section className="bg-ink-900 py-24 text-cream md:py-32">
          <div className="container">
            <p className="eyebrow text-gold-300">Available Residences</p>
            <SplitWords
              as="h2"
              className="mt-3 font-display text-3xl text-cream md:text-5xl"
            >
              <span className="font-extrabold">AVAILABLE&nbsp;IN</span>{' '}
              <span className="font-extralight">{project.name.toUpperCase()}</span>
            </SplitWords>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.05}>
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map + lead */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          {coords && coords.length === 2 ? (
            <div>
              <p className="eyebrow">Location</p>
              <div className="mt-4">
                <MapView lng={coords[0]} lat={coords[1]} label={project.name} height={520} />
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-ink-200 p-12 text-sm text-ink-500">
              Location coordinates not yet published.
            </div>
          )}
          <div>
            <LeadForm
              source={`project:${project.slug}`}
              project={project.slug}
              title={`Enquire about ${project.name}`}
              description="Receive the brochure, floor plans, and a private consultation."
            />
          </div>
        </div>
      </section>
    </>
  );
}
