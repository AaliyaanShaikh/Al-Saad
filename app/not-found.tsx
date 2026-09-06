import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-5 text-center">
      <p className="kicker mb-4">404</p>
      <h1 className="display mb-6 text-5xl text-ink">Page not found</h1>
      <Link href="/" className="btn">
        Return home
        <span className="btn-arrow">→</span>
      </Link>
    </div>
  );
}
