import React, { useEffect, useState } from 'react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

/** Build PDF URL with "original size" (100% zoom) so it isn’t zoomed in on mobile. */
function pdfUrlOriginalSize(pdfUrl: string): string {
  const base = pdfUrl.split('#')[0];
  return `${encodeURI(base)}#zoom=100`;
}

const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const iframeSrc = pdfUrlOriginalSize(pdfUrl);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      setPdfLoaded(false);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, pdfUrl]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      style={{ height: '100dvh' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Brochure: ${title}` : 'Brochure'}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-6xl flex flex-col bg-[#0a0a0a] border-0 sm:border border-white/10 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: 0 }}
      >
        <div className="flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-white/10">
          <span className="text-sm font-medium text-white truncate pr-2">
            {title ? `${title} – Brochure` : 'Brochure'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors touch-manipulation"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
          {!pdfLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-sm text-stone-500">Loading brochure…</p>
            </div>
          )}
          <iframe
            src={iframeSrc}
            title={title ? `Brochure for ${title}` : 'Brochure'}
            className={`w-full flex-1 min-h-0 border-0 transition-opacity duration-300 ${pdfLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ minHeight: '50vh' }}
            onLoad={() => setPdfLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
