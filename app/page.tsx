import Link from 'next/link';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import PropertyCard from '@/components/PropertyCard';
import LeadForm from '@/components/LeadForm';
import ScrollReveal from '@/components/ScrollReveal';
import SplitWords from '@/components/SplitWords';
import ImageReveal from '@/components/ImageReveal';
import Counter from '@/components/Counter';
import Marquee from '@/components/Marquee';
import HorizontalScroll from '@/components/HorizontalScroll';
import { getFeaturedProjects, getFeaturedProperties } from '@/lib/content';
import { site } from '@/content/site';

export default function HomePage() {
  const projects = getFeaturedProjects(4);
  const properties = getFeaturedProperties(8);

  return (
    <>
      <Hero
        eyebrow={site.home.heroEyebrow}
        title={
          <>
            <span className="font-extrabold">{site.home.heroTitleBold}</span>{' '}
            <span className="font-extralight">{site.home.heroTitleThin}</span>
          </>
        }
        subtitle={site.home.heroSubtitle}
        videoUrl="/vedio1.mp4"
        imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
        primaryCta={{ href: '/projects', label: 'Explore Projects' }}
        secondaryCta={{ href: '/contact', label: 'Speak to an Advisor' }}
        pin
      />

      <Marquee items={site.home.marquee} />

      {/* Featured projects */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container">
          <p className="eyebrow">Signature Developments</p>
          <SplitWords
            as="h2"
            className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-5xl"
          >
            <span className="font-extrabold">A&nbsp;PORTFOLIO</span>{' '}
            <span className="font-extralight">DEFINED&nbsp;BY&nbsp;LOCATION</span>
          </SplitWords>

          <div className="mt-3 flex justify-end">
            <Link
              href="/projects"
              className="text-xs uppercase tracking-widest2 text-gold-600 hover:text-gold-500"
            >
              View all projects →
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="mt-12 border border-dashed border-ink-200 p-12 text-center text-sm text-ink-500">
              No featured projects.
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <ImageReveal key={p.id}>
                  <ProjectCard project={p} />
                </ImageReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured properties — Binghatti-style horizontal scroll */}
      <section className="bg-ink-900 py-24 text-cream md:py-32">
        <div className="container">
          <p className="eyebrow text-gold-300">Featured Residences</p>
          <SplitWords
            as="h2"
            className="mt-3 max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl"
          >
            <span className="font-extrabold">HOMES</span>{' '}
            <span className="font-extralight">READY&nbsp;TO&nbsp;MOVE&nbsp;IN</span>
          </SplitWords>
        </div>

        <div className="mt-12">
          <HorizontalScroll>
            {properties.map((p) => (
              <div key={p.id} className="w-[88vw] shrink-0 snap-center sm:w-[60vw] lg:w-[420px]">
                <PropertyCard property={p} />
              </div>
            ))}
          </HorizontalScroll>
        </div>

        <div className="container mt-12 text-center">
          <Link href="/properties" className="btn-outline">
            Browse All Properties
          </Link>
        </div>
      </section>

      {/* Why Landtech */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container">
          <p className="eyebrow">Our Practice</p>
          <SplitWords as="h2" className="mt-3 font-display text-3xl leading-tight md:text-5xl">
            <span className="font-extrabold">WHY</span>{' '}
            <span className="font-extralight">LANDTECH</span>
          </SplitWords>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {site.home.pillars.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <div className="border-t border-gold-500 pt-6">
                  <p className="eyebrow">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{b.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            {site.home.stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08}>
                <div className="border-t border-gold-500 pt-6">
                  <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    <Counter
                      target={s.value}
                      decimals={s.decimals}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-widest2 text-ink-500">
                    {s.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-ink-900 py-24 text-cream md:py-32">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <p className="eyebrow text-gold-300">Begin the Conversation</p>
            <SplitWords
              as="h2"
              className="mt-3 font-display text-3xl leading-tight text-cream md:text-5xl"
            >
              <span className="font-extrabold">DISCREET</span>{' '}
              <span className="font-extralight">ADVICE</span>
            </SplitWords>
            <p className="mt-6 max-w-lg text-cream/70">
              Share a few details and one of our senior advisors will be in touch within one
              business day.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <LeadForm variant="dark" source="home" />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
