'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ImageRef } from '@/lib/types';

export default function ImageGallery({ images }: { images: ImageRef[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') setOpenIdx((i) => (i == null ? null : (i + 1) % images.length));
      else if (e.key === 'ArrowLeft')
        setOpenIdx((i) => (i == null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, images.length]);

  if (!images?.length) return null;

  const close = () => setOpenIdx(null);
  const prev = () =>
    setOpenIdx((i) => (i == null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIdx((i) => (i == null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIdx(i)}
            className="relative aspect-[4/3] overflow-hidden bg-ink-100"
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={img.alt || `Image ${i + 1}`}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIdx != null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4">
          <button
            type="button"
            className="absolute right-4 top-4 text-cream"
            onClick={close}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 text-cream"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={images[openIdx].url}
              alt={images[openIdx].alt || 'Property image'}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 text-cream"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
