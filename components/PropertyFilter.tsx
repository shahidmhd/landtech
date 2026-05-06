'use client';

import { useMemo, useState } from 'react';
import type { Property } from '@/lib/types';
import PropertyCard from './PropertyCard';
import ScrollReveal from './ScrollReveal';

type Filters = {
  listingType: '' | 'sale' | 'rent';
  type: string;
  city: string;
  minBeds: string;
  minPrice: string;
  maxPrice: string;
  q: string;
};

const EMPTY: Filters = {
  listingType: '',
  type: '',
  city: '',
  minBeds: '',
  minPrice: '',
  maxPrice: '',
  q: '',
};

export default function PropertyFilter({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.listingType && p.listingType !== filters.listingType) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (
        filters.city &&
        !(p.address?.city || '').toLowerCase().includes(filters.city.toLowerCase())
      )
        return false;
      if (filters.minBeds && (p.bedrooms ?? 0) < Number(filters.minBeds)) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.q) {
        const q = filters.q.toLowerCase();
        const blob = `${p.title} ${p.description} ${p.address?.city || ''}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [properties, filters]);

  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <form
          className="container grid grid-cols-2 gap-3 py-6 md:grid-cols-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <select
            className="input"
            value={filters.listingType}
            onChange={(e) => update('listingType', e.target.value as Filters['listingType'])}
          >
            <option value="">Sale &amp; Rent</option>
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
          <select
            className="input"
            value={filters.type}
            onChange={(e) => update('type', e.target.value)}
          >
            <option value="">Any type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
            <option value="studio">Studio</option>
          </select>
          <input
            className="input"
            placeholder="City"
            value={filters.city}
            onChange={(e) => update('city', e.target.value)}
          />
          <input
            className="input"
            type="number"
            min={0}
            placeholder="Min beds"
            value={filters.minBeds}
            onChange={(e) => update('minBeds', e.target.value)}
          />
          <input
            className="input"
            type="number"
            min={0}
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
          />
          <input
            className="input"
            type="number"
            min={0}
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
          />
          <button
            type="button"
            className="btn-outline col-span-2 md:col-span-6 md:w-fit"
            onClick={() => setFilters(EMPTY)}
          >
            Clear filters
          </button>
        </form>
      </section>

      <section className="bg-cream py-16">
        <div className="container">
          <p className="text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </p>

          {filtered.length === 0 ? (
            <div className="mt-12 border border-dashed border-ink-200 p-16 text-center text-ink-500">
              No properties match your filters.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.04}>
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
