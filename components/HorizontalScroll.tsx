'use client';

import { ReactNode, useRef } from 'react';
import { gsap, ScrollTrigger, useGsap, prefersReducedMotion } from '@/lib/gsap';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Pinned horizontal scroll section (Binghatti-style). The whole section
 * pins for the duration of the horizontal travel, so it feels like vertical
 * scroll is being translated to lateral motion.
 *
 * Falls back to native horizontal overflow scroll when reduce-motion is set
 * or on narrow viewports (no pin, just overflow-x-auto).
 */
export default function HorizontalScroll({ children, className }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGsap(sectionRef, () => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Skip pin on small viewports — single-column scroll is friendlier on mobile.
    if (window.innerWidth < 1024) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + getDistance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className ?? ''}`}>
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory lg:snap-none px-4 lg:px-12"
      >
        {children}
      </div>
    </section>
  );
}
