import React from 'react';
import { AppState } from '../types';

interface PrivacyPageProps {
  onNavigate: (state: AppState) => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 flex items-center justify-between rounded-full glass-dark shadow-2xl">
          <button
            onClick={() => onNavigate(AppState.HOME)}
            className="flex items-center space-x-3 text-white hover:text-stone-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.2em] sm:tracking-[0.3em] font-medium">AL-SAAD</span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 pt-32 sm:pt-40 md:pt-48 pb-20">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-stone-500 text-sm sm:text-base">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10 text-stone-400 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">1. Introduction</h2>
            <p>
              Al-Saad ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-3">
              <p><strong className="text-white">Personal Information:</strong> We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request a callback or contact us</li>
                <li>Subscribe to our newsletter</li>
                <li>Use our AI chat assistant</li>
                <li>Interact with our website</li>
              </ul>
              <p className="mt-3">This may include your name, email address, phone number, and any messages you send us.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Schedule callbacks and appointments</li>
              <li>Improve our website and services</li>
              <li>Send you updates about our services (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With service providers who assist us in operating our website (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">7. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">8. Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">9. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-white">Email:</strong> alsaad.in@gmail.com</p>
              <p><strong className="text-white">Phone:</strong> +91 87960 28980</p>
            </div>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5">
          <button
            onClick={() => onNavigate(AppState.HOME)}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-stone-200 transition-all shadow-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
