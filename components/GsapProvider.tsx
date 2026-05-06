'use client';

/**
 * Bridges Lenis into GSAP ScrollTrigger so all scrubbed/pinned scenes
 * work against the smooth-scrolled position. Pure side-effect provider.
 */

import { useLayoutEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { useLenis } from './LenisProvider';

export default function GsapProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Recompute trigger positions after the first paint settles + images load.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(ticker);
      window.removeEventListener('load', onLoad);
    };
  }, [lenis]);

  return <>{children}</>;
}
