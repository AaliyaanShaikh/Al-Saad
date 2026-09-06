'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getPortfolioAdvice } from '@/lib/gemini';

type Msg = { role: 'user' | 'model'; content: string };

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'model',
      content:
        'Hello — ask about Bandra to Jogeshwari, pricing clarity, or how I work with buyers.',
    },
  ]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, loading]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: userMsg }]);
    setLoading(true);
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const reply = await getPortfolioAdvice(userMsg, history);
    setMessages((m) => [...m, { role: 'model', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed right-4 bottom-4 z-[80] sm:right-6 sm:bottom-6">
      {open && (
        <div className="card mb-3 flex h-[420px] w-[min(92vw,360px)] flex-col overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <div>
              <p className="kicker">Assistant</p>
              <p className="text-sm text-ink">Al-Saad</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-[18px] px-3 py-2 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-ink text-ivory'
                    : 'bg-paper-2 text-ink-2'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-muted">Thinking…</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={submit} className="border-t border-ink/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a market…"
              className="field"
            />
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn shadow-lg"
        aria-label="Open chat"
      >
        Chat
      </button>
    </div>
  );
}
