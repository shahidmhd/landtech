import Link from 'next/link';
import Image from 'next/image';

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'Landtech';
const PHONE = process.env.NEXT_PUBLIC_BRAND_PHONE || '';
const EMAIL = process.env.NEXT_PUBLIC_BRAND_EMAIL || '';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream/80">
      <div className="container grid grid-cols-1 gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo-white.png"
            alt={BRAND}
            width={560}
            height={160}
            className="h-28 w-auto md:h-32"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/65">
            Curating signature residences, beachfront villas, and investment-grade
            developments across the region.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/projects" className="hover:text-gold-300">Projects</Link></li>
            <li><Link href="/properties" className="hover:text-gold-300">Properties</Link></li>
            <li><Link href="/about" className="hover:text-gold-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <ul className="space-y-2 text-sm">
            {PHONE && (
              <li>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="hover:text-gold-300">
                  {PHONE}
                </a>
              </li>
            )}
            {EMAIL && (
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-gold-300">
                  {EMAIL}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/55 md:flex-row">
          <p>© {year} {BRAND}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold-300">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
