import React, { useState, useRef, useEffect } from 'react';
import { getRealEstateAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome to Elysian Estates. I am your personal concierge. How may I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await getRealEstateAdvice(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      {isOpen ? (
        <div className="w-[350px] md:w-[400px] h-[550px] bg-[#000000] border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-5 duration-500">
          {/* Header - Solid Color, No Blinking */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-black font-black text-xs">EE</span>
              </div>
              <div>
                <span className="block font-bold text-sm text-white tracking-tight">Concierge Desk</span>
                <span className="block text-[9px] text-stone-500 font-black uppercase tracking-widest">Active Portfolio Advisory</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-[13px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-white text-black font-bold' 
                    : 'bg-[#111111] text-stone-300 border border-white/5'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#111111] px-5 py-4 rounded-[1.5rem] border border-white/5">
                  <div className="flex items-center">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-8 bg-[#0a0a0a] border-t border-white/5">
            <div className="flex space-x-3">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire about our collection..."
                className="flex-1 bg-[#1a1a1a] border border-transparent rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-white/10 transition-all placeholder:text-stone-700"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all duration-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;