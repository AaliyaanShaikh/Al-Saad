import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';
import { Providers } from '@/components/chrome/Providers';
import { Nav } from '@/components/chrome/Nav';
import { Footer } from '@/components/chrome/Footer';
import { AIChat } from '@/components/chrome/AIChat';
import { AppShell } from '@/components/chrome/AppShell';
import { site } from '@/lib/data';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${site.name} | Mumbai Western Suburbs Real Estate`,
  description: site.tagline,
  icons: {
    icon: '/ChatGPT%20Image%20Jan%2013%2C%202026%20at%2002_37_17%20AM.png',
    apple: '/ChatGPT%20Image%20Jan%2013%2C%202026%20at%2002_37_17%20AM.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <Providers>
          <SmoothScroll>
            <AppShell>
              <Nav />
              <main>{children}</main>
              <Footer />
              <AIChat />
            </AppShell>
            <Cursor />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
