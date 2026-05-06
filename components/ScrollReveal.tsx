'use client';

import { ElementType, ReactNode, useRef } from 'react';
import { gsap, useGsap } from '@/lib/gsap';

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  children: ReactNode;
};

export default function ScrollReveal({
  as: Tag = 'div',
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGsap(ref, () => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out',
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
