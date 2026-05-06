import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react';
import type { Property } from '@/lib/types';
import { formatPrice } from '@/lib/format';

export default function PropertyCard({ property }: { property: Property }) {
  const img =
    property.coverImage?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-ink-100 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      <Link href={`/properties/${property.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-ink-100">
          <Image
            src={img}
            alt={property.coverImage?.alt || property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="bg-ink-900/80 px-3 py-1 text-[10px] uppercase tracking-widest2 text-cream">
              {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            {property.featured && (
              <span className="bg-gold-500 px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink-900">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow">
            {property.type}
            {property.address?.city ? ` · ${property.address.city}` : ''}
          </p>
          {/* min-h reserves space for two title lines so cards don't differ when the title is short */}
          <h3 className="mt-2 min-h-[3.25rem] font-display text-xl font-bold leading-tight text-ink-900 line-clamp-2">
            {property.title}
          </h3>

          <p className="mt-4 font-display text-2xl font-bold text-gold-600">
            {formatPrice(property.price, property.currency || 'AED')}
            {property.pricePeriod && property.pricePeriod !== 'once' && (
              <span className="ml-1 text-xs uppercase tracking-widest2 text-ink-400">
                /{property.pricePeriod}
              </span>
            )}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-xs text-ink-500">
            {property.bedrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble size={14} /> {property.bedrooms}
              </span>
            )}
            {property.bathrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <Bath size={14} /> {property.bathrooms}
              </span>
            )}
            {property.areaSqft != null && (
              <span className="inline-flex items-center gap-1.5">
                <Maximize2 size={14} /> {property.areaSqft.toLocaleString()} sqft
              </span>
            )}
            {property.address?.city && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {property.address.city}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
