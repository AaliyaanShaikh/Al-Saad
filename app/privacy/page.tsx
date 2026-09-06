import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';

export default function PrivacyPage() {
  return (
    <div className="bg-paper px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/" className="kicker mb-8 inline-block text-muted hover:text-clay">
            ← Home
          </Link>
          <h1 className="display mb-4 text-4xl text-ink md:text-6xl">Privacy Policy</h1>
          <p className="mb-12 text-sm text-muted">Last updated: January 2025</p>
        </Reveal>

        <div className="space-y-10 text-sm leading-relaxed text-ink-2">
          <section>
            <h2 className="display mb-3 text-2xl text-ink">1. Introduction</h2>
            <p>
              Al-Saad (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website or use our services.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ink">2. Information We Collect</h2>
            <p className="mb-3">
              We may collect personal information you voluntarily provide when you request a
              callback, contact us, or use our AI assistant — including name, email, phone number,
              and message content.
            </p>
            <p>
              We may also collect limited technical data such as browser type and pages visited for
              site performance.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ink">3. How We Use Information</h2>
            <p>
              To respond to inquiries, schedule calls, improve our services, and communicate about
              properties or market information you requested.
            </p>
          </section>
          <section>
            <h2 className="display mb-3 text-2xl text-ink">4. Contact</h2>
            <p>
              For privacy questions, email muhdsaadpatel786@gmail.com or call +91 87960 28980.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
