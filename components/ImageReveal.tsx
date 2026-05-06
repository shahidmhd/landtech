'use client';

import { ReactNode, useRef } from 'react';
import { gsap, useGsap } from '@/lib/gsap';

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Wraps content (typically an Image or background-image element) and reveals
 * it on scroll-into-view via a clip-path mask wipe. Initial state is set in
 * globals.css (`.reveal-img { clip-path: inset(0 0 100% 0) }`) so there is
 * no FOUC before GSAP attaches.
 */
export default function ImageReveal({ className, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGsap(ref, () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      clipPath: 'inset(0 0 0 0)',
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  return (
    <div ref={ref} className={`reveal-img ${className ?? ''}`}>
      {children}
    </div>
  );
}
