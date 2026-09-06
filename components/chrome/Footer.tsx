import Link from 'next/link';
import { nav, site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-void text-ivory">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-14 border-b border-ivory/10 pb-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-20 md:pb-20">
          <div>
            <p className="display mb-5 text-2xl tracking-[0.16em] md:text-3xl">{site.wordmark}</p>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/50">{site.tagline}</p>
          </div>
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-silver">Navigate</p>
            <ul className="space-y-3 text-sm text-ivory/55">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-silver">Contact</p>
            <ul className="space-y-3 text-sm text-ivory/55">
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
              <li className="pt-2">
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
                  Instagram
                </a>
                <span className="mx-2 text-ivory/25">·</span>
                <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-ivory">
                  YouTube
                </a>
              </li>
              <li className="pt-2">
                <Link href="/privacy" className="hover:text-ivory">
                  Privacy
                </Link>
                <span className="mx-2 text-ivory/25">·</span>
                <Link href="/terms" className="hover:text-ivory">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-8 text-[10px] uppercase tracking-[0.2em] text-ivory/30">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
