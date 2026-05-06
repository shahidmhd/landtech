'use client';

import { useRef } from 'react';
import { gsap, useGsap } from '@/lib/gsap';

type Props = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function Counter({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGsap(ref, () => {
    const el = ref.current;
    if (!el) return;
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const v = decimals > 0 ? counter.value.toFixed(decimals) : Math.round(counter.value);
        el.textContent = `${prefix}${Number(v).toLocaleString()}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [target, decimals]);

  // Initial textContent so reduced-motion users see the final number immediately.
  const initial = `${prefix}${decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()}${suffix}`;
  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}
