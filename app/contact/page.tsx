import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import ScrollReveal from '@/components/ScrollReveal';
import SplitWords from '@/components/SplitWords';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Speak with a senior advisor at Landtech Real Estate.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-ink-900 pb-16 pt-32 text-cream md:pb-20 md:pt-40">
        <div className="container">
          <p className="eyebrow text-gold-300">Contact</p>
          <SplitWords
            as="h1"
            className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl"
          >
            <span className="font-extrabold">BEGIN&nbsp;A&nbsp;DISCREET</span>{' '}
            <span className="font-extralight">CONVERSATION</span>
          </SplitWords>
          <p className="mt-4 max-w-xl text-cream/75">
            Tell us what you’re looking for. A senior advisor will reach out within one business
            day.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Call</p>
                <a
                  href={site.phoneHref}
                  className="mt-2 block font-display text-2xl font-bold"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-display text-2xl font-bold"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="eyebrow">Hours</p>
                <p className="mt-2 font-display text-2xl font-bold">{site.hours}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <LeadForm source="contact" />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
