import React, { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredTime: ''
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-serif text-white mb-4 tracking-tight">Request a Call</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Fill in your details and we'll get back to you at your preferred time.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Thank You!</h3>
            <p className="text-stone-400">We'll contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-[10px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">
                Preferred Call Time
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-base text-white focus:outline-none focus:border-white/30 transition-all"
              >
                <option value="" className="bg-[#1a1a1a]">Select a time</option>
                <option value="morning" className="bg-[#1a1a1a]">Morning (9 AM - 12 PM)</option>
                <option value="afternoon" className="bg-[#1a1a1a]">Afternoon (12 PM - 5 PM)</option>
                <option value="evening" className="bg-[#1a1a1a]">Evening (5 PM - 8 PM)</option>
                <option value="flexible" className="bg-[#1a1a1a]">Flexible</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-stone-700 focus:outline-none focus:border-white/30 transition-all resize-none"
                placeholder="Tell us what you'd like to discuss..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#1a1a1a] border border-white/10 text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-white text-black px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-stone-200 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
