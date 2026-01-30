import React, { useState } from 'react';

/** POST to same-origin /api/callback (proxied to Google Sheets in dev; use serverless in prod) */
const CALLBACK_API = '/api/callback';

interface CallbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackForm: React.FC<CallbackFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
        const res = await fetch(CALLBACK_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            preferredTime: formData.preferredTime,
            message: formData.message
          })
        });
        if (!res.ok) {
          let msg = `Could not save (${res.status}). Please try again.`;
          try {
            const text = await res.text();
            const data = text.startsWith('{') ? JSON.parse(text) : null;
            if (data?.hint) msg = data.hint;
            else if (data?.error && data?.detail) msg = `${data.error}: ${String(data.detail).slice(0, 300)}`;
            else if (data?.error) msg = data.error;
            else if (data?.detail) msg = String(data.detail).slice(0, 300);
            else if (res.status === 404) msg = 'Endpoint not found. Set GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables.';
            else if (res.status === 500) msg = 'Server error (500). Open your-site.vercel.app/api/callback in a browser — if hasGoogleScriptUrl is false, add GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables and redeploy.';
            else if (text.length > 0) msg = `Server: ${text.slice(0, 200).replace(/\s+/g, ' ')}`;
          } catch (_e) {
            if (res.status === 500) msg = 'Server error (500). Check Vercel → Project → Settings → Environment Variables and add GOOGLE_SCRIPT_URL, then redeploy.';
            else if (res.status === 404) msg = 'Endpoint not found. Set GOOGLE_SCRIPT_URL in Vercel.';
          }
          throw new Error(msg);
        }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '', preferredTime: '' });
        onClose();
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      const isNetworkError = err instanceof TypeError && (err.message === 'Failed to fetch' || err.message?.includes('Load failed'));
      const message = isNetworkError
        ? 'Network error. Run the site with npm run dev, set VITE_GOOGLE_SCRIPT_URL in .env, and restart the dev server.'
        : (err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitError(message);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    'w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all';
  const textareaClass =
    'w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all resize-none';
  const labelClass =
    'block text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-2 sm:mb-3';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto min-w-0">
        {/* Close Button — responsive position/size for touch */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form Header — responsive spacing and type */}
        <div className="mb-6 sm:mb-8 md:mb-10 pr-12 sm:pr-0">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-2 sm:mb-4 tracking-tight">
            Request a Call
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
            Fill in your details and we'll get back to you at your preferred time.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-3 sm:mb-4">Thank You!</h3>
            <p className="text-stone-400 text-sm sm:text-base">We'll contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="+91 99999 99999"
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className={labelClass}>Preferred Call Time</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-base text-white focus:outline-none focus:border-white/30 transition-all"
              >
                <option value="" className="bg-[#1a1a1a]">Select a time</option>
                <option value="morning" className="bg-[#1a1a1a]">Morning (9 AM - 12 PM)</option>
                <option value="afternoon" className="bg-[#1a1a1a]">Afternoon (12 PM - 5 PM)</option>
                <option value="evening" className="bg-[#1a1a1a]">Evening (5 PM - 8 PM)</option>
                <option value="flexible" className="bg-[#1a1a1a]">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                className={textareaClass}
                placeholder="Tell us what you'd like to discuss..."
              />
            </div>

            {submitError && (
              <p className="text-red-400 text-sm" role="alert">{submitError}</p>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] bg-[#1a1a1a] border border-white/10 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 min-h-[44px] bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-stone-200 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {isSubmitting ? 'Submitting...' : 'Request Call'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CallbackForm;
