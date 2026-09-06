import Link from 'next/link';
import { nav, site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-void text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-28">
        <div>
          <p className="display mb-4 text-2xl tracking-[0.14em]">{site.wordmark}</p>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/60">{site.tagline}</p>
        </div>
        <div>
          <p className="kicker mb-5 text-gold">Navigate</p>
          <ul className="space-y-3 text-sm text-ivory/70">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-ivory">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ivory">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="kicker mb-5 text-gold">Contact</p>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ivory">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ivory">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-ivory">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-6 md:px-10">
        <p className="text-center text-[11px] uppercase tracking-[0.18em] text-ivory/40">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
