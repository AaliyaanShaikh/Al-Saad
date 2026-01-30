import React from 'react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 sm:top-8 right-6 sm:right-8 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-stone-500 text-sm">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8 text-stone-400 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Al-Saad website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on Al-Saad's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">3. Services</h2>
            <p>
              Al-Saad provides real estate services including property consultation, market information, and related services. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">4. User Conduct</h2>
            <p>You agree to use our services only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Infringe the rights of others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Interfere with or disrupt the services or servers</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">5. AI Chat Assistant</h2>
            <p>
              Our AI chat assistant is provided for informational purposes only. The information provided by the AI assistant should not be considered as professional advice. Always consult with qualified professionals for specific real estate matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">6. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Al-Saad or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">7. Disclaimer</h2>
            <p>
              The materials on Al-Saad's website are provided on an 'as is' basis. Al-Saad makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">8. Limitations</h2>
            <p>
              In no event shall Al-Saad or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Al-Saad's website, even if Al-Saad or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">9. Accuracy of Materials</h2>
            <p>
              The materials appearing on Al-Saad's website could include technical, typographical, or photographic errors. Al-Saad does not warrant that any of the materials on its website are accurate, complete, or current. Al-Saad may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">10. Links</h2>
            <p>
              Al-Saad has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Al-Saad. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">11. Modifications</h2>
            <p>
              Al-Saad may revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">12. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-white mb-4">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-white">Email:</strong> muhdsaadpatel786@gmail.com</p>
              <p><strong className="text-white">Phone:</strong> +91 87960 28980</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full bg-white text-black px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-stone-200 transition-all shadow-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
