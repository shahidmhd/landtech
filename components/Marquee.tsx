'use client';

import { ReactNode } from 'react';

type Props = {
  items: ReactNode[];
  className?: string;
};

/**
 * Pure-CSS marquee. Doubles items so the loop is seamless when translateX(-50%).
 * The `animate-marquee` Tailwind keyframe is defined in tailwind.config.ts.
 */
export default function Marquee({ items, className }: Props) {
  return (
    <div className={`overflow-hidden bg-gold-500 text-ink-900 py-3 ${className ?? ''}`} aria-hidden>
      <div className="flex gap-12 whitespace-nowrap animate-marquee text-xs font-bold uppercase tracking-widest2">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
