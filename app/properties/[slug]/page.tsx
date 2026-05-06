import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BedDouble, Bath, Maximize2, MapPin, Home } from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';
import LeadForm from '@/components/LeadForm';
import MapView from '@/components/MapView';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/components/Hero';
import { allPropertySlugs, getProperty, getProject } from '@/lib/content';
import { formatPrice } from '@/lib/format';

export function generateStaticParams() {
  return allPropertySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const property = getProperty(params.slug);
  if (!property) return { title: 'Property not found' };
  const cover = property.coverImage?.url || property.images?.[0]?.url;
  return {
    title: property.seo?.title || property.title,
    description:
      property.seo?.description ||
      property.summary ||
      property.description.slice(0, 200),
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.summary,
      type: 'article',
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  if (!property) notFound();
  const linkedProject = property.projectSlug ? getProject(property.projectSlug) : undefined;

  const cover =
    property.coverImage?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80';
  const coords = property.location?.coordinates;

  const titleWords = property.title.split(' ');
  const titleHead = titleWords.slice(0, 1).join(' ');
  const titleTail = titleWords.slice(1).join(' ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: property.title,
    description: property.description,
    image: cover,
    address: property.address && {
      '@type': 'PostalAddress',
      streetAddress: property.address.line1,
      addressLocality: property.address.city,
      addressRegion: property.address.region,
      addressCountry: property.address.country,
    },
    numberOfRooms: property.bedrooms,
    floorSize: property.areaSqft && {
      '@type': 'QuantitativeValue',
      value: property.areaSqft,
      unitCode: 'FTK',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency || 'AED',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        eyebrow={`${property.listingType === 'rent' ? 'For Rent' : 'For Sale'} · ${property.type}`}
        title={
          <>
            <span className="font-extrabold uppercase">{titleHead}</span>{' '}
            <span className="font-extralight uppercase">{titleTail}</span>
          </>
        }
        subtitle={
          property.address?.city
            ? `${property.address.city}${property.address.country ? `, ${property.address.country}` : ''}`
            : undefined
        }
        imageUrl={cover}
        fullScreen={false}
      />

      <section className="bg-cream py-16">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div className="grid grid-cols-2 gap-6 border-y border-ink-100 py-8 md:grid-cols-4">
              <Stat icon={<Home size={18} />} label="Type" value={property.type} />
              <Stat
                icon={<BedDouble size={18} />}
                label="Beds"
                value={property.bedrooms?.toString() || '—'}
              />
              <Stat
                icon={<Bath size={18} />}
                label="Baths"
                value={property.bathrooms?.toString() || '—'}
              />
              <Stat
                icon={<Maximize2 size={18} />}
                label="Area"
                value={property.areaSqft ? `${property.areaSqft.toLocaleString()} sqft` : '—'}
              />
            </div>

            <ScrollReveal>
              <p className="eyebrow">Overview</p>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-700">
                {property.description}
              </p>
            </ScrollReveal>

            {property.amenities && property.amenities.length > 0 && (
              <ScrollReveal>
                <p className="eyebrow">Amenities</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-700 md:grid-cols-3">
                  {property.amenities.map((a) => (
                    <li key={a} className="border-l-2 border-gold-500 pl-3 py-1">
                      {a}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {property.images && property.images.length > 0 && (
              <ScrollReveal>
                <p className="eyebrow">Gallery</p>
                <div className="mt-4">
                  <ImageGallery images={property.images} />
                </div>
              </ScrollReveal>
            )}

            {coords && coords.length === 2 && (
              <ScrollReveal>
                <p className="eyebrow">Location</p>
                <div className="mt-4">
                  <MapView lng={coords[0]} lat={coords[1]} label={property.title} />
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-500">
                  <MapPin size={14} />{' '}
                  {[property.address?.city, property.address?.country].filter(Boolean).join(', ')}
                </p>
              </ScrollReveal>
            )}

            {linkedProject && (
              <div className="border border-ink-100 bg-white p-6">
                <p className="eyebrow">Part of</p>
                <Link
                  href={`/projects/${linkedProject.slug}`}
                  className="mt-2 block font-display text-2xl font-bold text-ink-900 hover:text-gold-600"
                >
                  {linkedProject.name} →
                </Link>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-ink-100 bg-white p-8">
              <p className="eyebrow">Asking Price</p>
              <p className="mt-2 font-display text-3xl font-bold text-gold-600">
                {formatPrice(property.price, property.currency || 'AED')}
                {property.pricePeriod && property.pricePeriod !== 'once' && (
                  <span className="ml-1 text-sm uppercase tracking-widest2 text-ink-400">
                    /{property.pricePeriod}
                  </span>
                )}
              </p>
              <div className="mt-6">
                <LeadForm
                  source={`property:${property.slug}`}
                  property={property.slug}
                  title="Enquire about this property"
                  description="A senior advisor will reach out within one business day."
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gold-600">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest2 text-ink-400">{label}</p>
        <p className="font-display text-lg font-bold capitalize">{value}</p>
      </div>
    </div>
  );
}
