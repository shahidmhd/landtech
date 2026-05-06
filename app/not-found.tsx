import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-ink-900 text-cream">
      <div className="container text-center">
        <p className="eyebrow text-gold-300">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">Page not found.</h1>
        <p className="mt-4 text-cream/70">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="btn-outline mt-10 inline-flex">
          Return Home
        </Link>
      </div>
    </section>
  );
}
