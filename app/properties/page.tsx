import type { Metadata } from 'next';
import SplitWords from '@/components/SplitWords';
import PropertyFilter from '@/components/PropertyFilter';
import { properties } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent',
  description: 'Browse luxury apartments, villas, and penthouses curated by Landtech.',
  alternates: { canonical: '/properties' },
};

export default function PropertiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-32 text-cream md:pb-20 md:pt-40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 to-ink-900" />
        <div className="container relative">
          <p className="eyebrow text-gold-300">Residences</p>
          <SplitWords
            as="h1"
            className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl"
          >
            <span className="font-extrabold">PROPERTIES</span>{' '}
            <span className="font-extralight">FOR&nbsp;SALE&nbsp;&amp;&nbsp;RENT</span>
          </SplitWords>
          <p className="mt-4 max-w-2xl text-cream/75">
            A curated selection of homes available across the region.
          </p>
        </div>
      </section>

      <PropertyFilter properties={properties} />
    </>
  );
}
