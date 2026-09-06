'use client';

import { useEffect, useState, type FormEvent } from 'react';

type CallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CallModal({ isOpen, onClose }: CallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        let msg = `Could not save (${res.status}). Please try again.`;
        try {
          const data = await res.json();
          if (data?.hint) msg = data.hint;
          else if (data?.error) msg = data.error;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '', preferredTime: '' });
        onClose();
      }, 2000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-void/80 p-4 backdrop-blur-sm">
      <div className="panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-paper-2 p-6 sm:p-8 md:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory hover:bg-ivory hover:text-void"
          aria-label="Close"
        >
          ×
        </button>

        <p className="kicker mb-3">Appointment</p>
        <h2 className="display mb-2 pr-10 text-3xl text-ivory md:text-4xl">Request a call</h2>
        <p className="body mb-8 text-sm">
          Share a few details. I’ll return at your preferred hour — without pressure.
        </p>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <p className="display text-3xl text-ivory">Thank you</p>
            <p className="body mt-3 text-sm">I’ll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="kicker mb-2 block text-muted">Full name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="kicker mb-2 block text-muted">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="kicker mb-2 block text-muted">Phone</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="field"
                placeholder="+91 …"
              />
            </div>
            <div>
              <label className="kicker mb-2 block text-muted">Preferred time</label>
              <select
                required
                name="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="field appearance-none"
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (9 AM – 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM – 5 PM)</option>
                <option value="evening">Evening (5 PM – 8 PM)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="kicker mb-2 block text-muted">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="field field-textarea"
                placeholder="What are you looking for?"
              />
            </div>
            {submitError && (
              <p className="text-sm text-silver-bright" role="alert">
                {submitError}
              </p>
            )}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              <button type="button" onClick={onClose} className="btn btn-ghost flex-1 justify-center">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn flex-1 justify-center">
                {isSubmitting ? 'Sending…' : 'Request call'}
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
