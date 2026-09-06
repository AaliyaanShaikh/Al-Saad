import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';

export default function TermsPage() {
  return (
    <div className="bg-void px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/" className="kicker mb-8 inline-block text-muted hover:text-silver">
            ← Home
          </Link>
          <h1 className="display mb-4 text-4xl text-ivory md:text-6xl">Terms of Service</h1>
          <p className="mb-12 text-sm text-muted">Last updated: January 2025</p>
        </Reveal>

        <div className="space-y-10 text-sm leading-relaxed text-ink-2">
          <section>
            <h2 className="display mb-3 text-2xl text-ivory">1. Agreement</h2>
            <p>
              By accessing this website, you agree to these Terms. If you do not agree, please do
              not use the site.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ivory">2. Services</h2>
            <p>
              Al-Saad provides real estate advisory information and introductions. Listings and
              market commentary are informational and do not constitute a binding offer, legal
              advice, or financial advice.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ivory">3. Accuracy</h2>
            <p>
              We aim for clarity, but property details, pricing, and availability can change. Always
              verify independently before making decisions.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ivory">4. Governing law</h2>
            <p>These Terms are governed by the laws of India.</p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ivory">5. Contact</h2>
            <p>muhdsaadpatel786@gmail.com · +91 87960 28980</p>
          </section>
        </div>
      </div>
    </div>
  );
}
