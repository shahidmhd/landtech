'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/format';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'Landtech';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-ink-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container flex h-24 items-center justify-between md:h-28">
        <Link href="/" aria-label={BRAND} className="flex items-center">
          <Image
            src="/logo-white.png"
            alt={BRAND}
            width={480}
            height={140}
            priority
            className="h-20 w-auto md:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-xs font-medium uppercase tracking-widest2 transition-colors',
                  active ? 'text-gold-400' : 'text-cream/85 hover:text-gold-300'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-glass !px-8 !py-3">
            Enquire
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center p-2 text-cream transition-colors hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden bg-ink-900/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container flex flex-col gap-4 py-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-widest2 text-cream/90"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-glass mt-2">
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
