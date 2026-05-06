import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import SplitWords from '@/components/SplitWords';
import Counter from '@/components/Counter';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Landtech is a property advisory and development house curating signature residences across the region.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Landtech"
        title={
          <>
            <span className="font-extrabold">A&nbsp;PROPERTY</span>{' '}
            <span className="font-extralight">HOUSE</span>
          </>
        }
        subtitle="Defined by design, discretion, and detail."
        videoUrl="/vedio2.mp4"
        imageUrl="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2400&q=80"
        pin
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
          <ScrollReveal>
            <p className="eyebrow">Our Practice</p>
            <SplitWords as="h2" className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              <span className="font-extrabold">WE&nbsp;CURATE</span>{' '}
              <span className="font-extralight">ADDRESSES</span>
            </SplitWords>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="md:col-span-2">
            <p className="leading-relaxed text-ink-700">{site.about.intro}</p>
            <p className="mt-6 leading-relaxed text-ink-700">{site.about.intro2}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-ink-900 py-24 text-cream md:py-32">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
          {site.home.stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className="border-t border-gold-500 pt-6">
                <p className="font-display text-5xl font-bold tracking-tight text-cream md:text-6xl">
                  <Counter
                    target={s.value}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest2 text-cream/60">
                  {s.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
