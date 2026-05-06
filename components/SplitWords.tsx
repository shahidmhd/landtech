'use client';

import { ElementType, ReactNode, useRef } from 'react';
import { gsap, splitWords, useGsap } from '@/lib/gsap';

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  trigger?: boolean; // false = run on mount; true = run on scroll into view
  children: ReactNode;
};

export default function SplitWords({
  as: Tag = 'h2',
  className,
  delay = 0,
  trigger = true,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGsap(ref, () => {
    const el = ref.current;
    if (!el) return;
    const spans = splitWords(el);
    if (!spans.length) return;
    gsap.set(spans, { yPercent: 110 });
    gsap.to(spans, {
      yPercent: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
      delay,
      scrollTrigger: trigger
        ? { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        : undefined,
    });
  });

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
