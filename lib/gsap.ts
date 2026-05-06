'use client';

/**
 * Single-source GSAP module. Imported only by `'use client'` components,
 * so the static export build never executes GSAP at SSR time.
 *
 * Exports:
 *   - `gsap`, `ScrollTrigger`        — direct re-exports
 *   - `useGsap(scopeRef, setup)`     — `useLayoutEffect` + `gsap.context()` with auto-revert
 *   - `prefersReducedMotion()`       — runtime check; consumers should bail early when true
 */

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Setup = (ctx: gsap.Context) => void | (() => void);

/**
 * Scoped GSAP effect. Runs `setup` inside a `gsap.context(scope)`,
 * and reverts on unmount (so route changes don't leak ScrollTrigger instances).
 */
export function useGsap(
  scopeRef: React.RefObject<HTMLElement | null>,
  setup: Setup,
  deps: React.DependencyList = []
) {
  // useLayoutEffect avoids a flash of unstyled (post-mount) animation.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    if (!scopeRef.current) return;
    const ctx = gsap.context(setup, scopeRef.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Word-split helper used by Hero + SplitWords. Wraps each whitespace-separated
 * word in `<span class="split-line"><span>word</span></span>` so a yPercent
 * tween on the inner span produces a clean reveal masked by the outer span.
 *
 * Idempotent — calling twice does nothing the second time (checks for existing markers).
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('.split-line > span'));
  }
  const text = el.textContent ?? '';
  el.textContent = '';
  const words = text.trim().split(/\s+/);
  words.forEach((word, i) => {
    const outer = document.createElement('span');
    outer.className = 'split-line';
    const inner = document.createElement('span');
    inner.textContent = word;
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
  el.dataset.split = 'true';
  return Array.from(el.querySelectorAll<HTMLElement>('.split-line > span'));
}
