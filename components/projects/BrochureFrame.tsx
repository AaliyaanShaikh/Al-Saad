'use client';

import { useEffect, useRef, useState } from 'react';

export function BrochureFrame({ src }: { src: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const frame = frameRef.current;
    const pages = pagesRef.current;
    if (!frame || !pages) return;

    let cancelled = false;
    let generation = 0;
    let renderWidth = 0;

    const paint = async (width: number) => {
      if (width < 16 || Math.abs(width - renderWidth) < 8) return;
      renderWidth = width;
      const id = ++generation;
      setStatus('loading');
      pages.replaceChildren();

      const pdfjs = await import('pdfjs-dist');
      if (cancelled || id !== generation) return;
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const task = pdfjs.getDocument({ url: src });

      try {
        const pdf = await task.promise;
        if (cancelled || id !== generation) return;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled || id !== generation) return;
          const page = await pdf.getPage(pageNumber);
          const unscaled = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: width / unscaled.width });
          const canvas = document.createElement('canvas');
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(viewport.width * ratio);
          canvas.height = Math.floor(viewport.height * ratio);
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.display = 'block';
          const context = canvas.getContext('2d');
          if (!context) continue;
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          pages.appendChild(canvas);
          await page.render({ canvasContext: context, canvas, viewport }).promise;
        }

        if (!cancelled && id === generation) setStatus('ready');
      } catch {
        if (!cancelled && id === generation) setStatus('error');
      } finally {
        await task.destroy();
      }
    };

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      void paint(width);
    });
    observer.observe(frame);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      ref={frameRef}
      className="relative h-[70vh] overflow-y-auto bg-[#f4f0e8] md:h-[75vh]"
    >
      {status === 'loading' && (
        <p className="absolute inset-x-0 top-6 text-center text-xs uppercase tracking-[0.16em] text-muted">
          Opening brochure
        </p>
      )}
      {status === 'error' && (
        <p className="px-6 py-10 text-center text-sm text-ink-2">
          The brochure could not be displayed in this window.
        </p>
      )}
      <div ref={pagesRef} />
    </div>
  );
}
