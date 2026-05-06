import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/LenisProvider';
import GsapProvider from '@/components/GsapProvider';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'Landtech Real Estate';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} — Luxury Properties & Vacation Homes`,
    template: `%s · ${BRAND}`,
  },
  description:
    'Discover signature residences, beachfront villas, and investment-grade developments curated by Landtech.',
  openGraph: {
    type: 'website',
    siteName: BRAND,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-cream font-sans text-ink-900 antialiased">
        <LenisProvider>
          <GsapProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </GsapProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
