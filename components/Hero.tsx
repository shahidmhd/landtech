'use client';

import Link from 'next/link';
import { ReactNode, useRef } from 'react';
import { gsap, splitWords, useGsap, prefersReducedMotion } from '@/lib/gsap';

type Props = {
  eyebrow?: string;
  /**
   * Render-rich title. Pass spans/markup if you want the bold/thin
   * treatment ("INVESTOR" + "RELATIONS"). Words are split + revealed
   * by walking text nodes inside the heading.
   */
  title: ReactNode;
  subtitle?: string;
  imageUrl?: string;
  /**
   * Optional fullscreen video background. When set, renders a muted
   * autoplay <video> element instead of the still image; the imageUrl
   * is used as the poster for the video.
   */
  videoUrl?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  fullScreen?: boolean;
  pin?: boolean;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  imageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80',
  videoUrl,
  primaryCta,
  secondaryCta,
  fullScreen = true,
  pin = false,
}: Props) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsap(scopeRef, () => {
    const scope = scopeRef.current;
    if (!scope) return;

    const bg = scope.querySelector<HTMLElement>('.hero__bg');
    const titleEl = scope.querySelector<HTMLElement>('.hero__title');
    const eyebrowEl = scope.querySelector<HTMLElement>('.hero__eyebrow');
    const subEl = scope.querySelector<HTMLElement>('.hero__sub');
    const ctaEl = scope.querySelector<HTMLElement>('.hero__cta');
    const content = scope.querySelector<HTMLElement>('.hero__content');

    // ---- Entry animation (one-shot, not scroll-driven) ----
    if (bg) gsap.fromTo(bg, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'power3.out' });

    if (titleEl) {
      // Walk leaf text nodes and split each one's words. This preserves
      // user-supplied <span class="font-bold"> etc. wrapping markup.
      const walker = document.createTreeWalker(titleEl, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let n: Node | null;
      while ((n = walker.nextNode())) textNodes.push(n as Text);
      textNodes.forEach((textNode) => {
        if (!textNode.parentElement) return;
        const span = document.createElement('span');
        span.textContent = textNode.textContent;
        textNode.parentElement.replaceChild(span, textNode);
        splitWords(span);
      });

      const spans = titleEl.querySelectorAll<HTMLElement>('.split-line > span');
      gsap.fromTo(
        spans,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 0.25,
        }
      );
    }

    [eyebrowEl, subEl, ctaEl].forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 + i * 0.12 }
      );
    });

    // ---- Optional pinned scrub scene ----
    if (pin && !prefersReducedMotion()) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: '+=80%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });
      if (bg) tl.to(bg, { scale: 1.12, ease: 'none' }, 0);
      if (content) tl.to(content, { opacity: 0, y: -40, ease: 'none' }, 0);
    }
  }, [pin]);

  return (
    <section
      ref={scopeRef}
      className={`relative w-full overflow-hidden ${fullScreen ? 'min-h-screen' : 'min-h-[70vh]'}`}
    >
      {videoUrl ? (
        <video
          className="hero__bg absolute inset-0 h-full w-full object-cover will-change-transform"
          src={videoUrl}
          poster={imageUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      ) : (
        <div
          className="hero__bg absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/30 to-ink-900/85" />
      <div className="absolute inset-0 bg-hero-vignette" />

      <div className="hero__content relative z-10 flex min-h-inherit items-end pb-24 pt-40">
        <div className="container">
          {eyebrow && (
            <p className="hero__eyebrow eyebrow text-gold-300">{eyebrow}</p>
          )}
          <h1 className="hero__title mt-6 max-w-5xl font-display text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="hero__sub mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="hero__cta mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-glass">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-glass">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 text-xs uppercase tracking-widest2">
        Scroll
      </div>
    </section>
  );
}
