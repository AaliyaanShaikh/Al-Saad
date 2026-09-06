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
        "Hi! I'm Al-Saad's AI assistant. I can help with Mumbai western suburb real estate—Bandra, Khar, Santacruz, Andheri, Versova, Jogeshwari—plus property info and buying questions. How can I assist you today?",
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
    <div className="fixed right-4 bottom-4 z-[100] sm:right-8 sm:bottom-8 md:right-12 md:bottom-12">
      {open ? (
        <div className="flex h-[calc(100vh-8rem)] max-h-[600px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:h-[550px] sm:w-[350px] sm:rounded-[2rem] md:w-[400px] md:rounded-[2.5rem]">
          <div className="flex items-center justify-between border-b border-white/5 bg-black p-8">
            <div className="flex items-center space-x-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ChatGPT Image Jan 13, 2026 at 02_37_17 AM.png"
                alt="Al-Saad Logo"
                className="h-10 w-10 rounded-2xl object-contain"
              />
              <div>
                <span className="block text-sm font-medium tracking-tight text-white">
                  Let&apos;s Chat
                </span>
                <span className="block text-[9px] font-medium uppercase tracking-widest text-stone-500">
                  Ask Me Anything
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-8">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-white font-medium text-black'
                      : 'border border-white/5 bg-[#111111] text-stone-300'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-[1.5rem] border border-white/5 bg-[#111111] px-5 py-4">
                  <div className="flex items-center">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={submit}
            className="border-t border-white/5 bg-[#0a0a0a] p-8"
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about properties or real estate..."
                className="flex-1 rounded-2xl border border-transparent bg-[#1a1a1a] px-6 py-4 text-base text-white transition-all placeholder:text-stone-700 focus:border-white/10 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-20"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-110 active:scale-95 sm:h-14 sm:w-14 md:h-16 md:w-16"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
