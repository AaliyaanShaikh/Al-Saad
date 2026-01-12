import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import PropertyCard from './components/PropertyCard';
import AIChatAssistant from './components/AIChatAssistant';
import { AppState } from './types';
import { MOCK_PROPERTIES } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    if (appState === AppState.HOME) {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [appState]);

  if (appState === AppState.INTRO) {
    return <IntroAnimation onComplete={() => setAppState(AppState.HOME)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Professional Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-10 pt-10 ${isScrolled ? 'translate-y-[-20px]' : ''}`}>
        <div className={`max-w-7xl mx-auto px-10 py-6 flex items-center justify-between rounded-full transition-all duration-700 ${isScrolled ? 'glass-dark py-4 px-8 shadow-2xl' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-16">
            <h1 className="text-2xl font-serif tracking-[0.3em] font-medium text-white">ELYSIAN ESTATES</h1>
            <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">
              <a href="#portfolio" className="hover:text-white transition-all">Portfolio</a>
              <a href="#philosophy" className="hover:text-white transition-all">Philosophy</a>
              <a href="#contact" className="hover:text-white transition-all">Connect</a>
            </div>
          </div>
          <button className="bg-white text-black px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-stone-200 transition-all shadow-xl">
            Inquire
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-100">
            <img 
              src="https://images.unsplash.com/photo-1600607687940-c52fb0a4599c?auto=format&fit=crop&q=90&w=2560" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-transform duration-[30s]"
              alt="Hero Masterpiece"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=2560";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>

          <div className="relative z-10 text-center px-10 max-w-5xl">
            <div className="overflow-hidden mb-8">
              <p className="text-stone-500 uppercase tracking-[0.8em] text-[11px] font-black reveal active">
                Private Advisory • Brokerage Portfolio
              </p>
            </div>
            <h2 className="text-6xl md:text-[8rem] font-serif mb-16 leading-[0.95] tracking-tighter reveal active" style={{ transitionDelay: '300ms' }}>
              Architecture for <br /><span className="italic font-light">Generations.</span>
            </h2>
            
            <div className="reveal active max-w-xl mx-auto bg-black p-2 rounded-full border border-white/10 shadow-2xl flex items-center" style={{ transitionDelay: '600ms' }}>
              <input 
                type="text" 
                placeholder="Where will your next legacy begin?" 
                className="flex-1 bg-transparent px-8 py-5 outline-none text-white text-sm font-medium placeholder:text-stone-700" 
              />
              <button className="bg-white text-black px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.5em] font-black hover:bg-stone-200 transition-all shadow-xl">
                Explore
              </button>
            </div>
          </div>

          {/* Fixed Scroll Indicator with Animation */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 reveal active" style={{ transitionDelay: '1000ms' }}>
            <span className="text-[9px] uppercase tracking-[0.6em] text-stone-600 font-black">Discover</span>
            <div className="scroll-indicator-container">
              <div className="scroll-indicator-line"></div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-48 max-w-7xl mx-auto px-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 reveal">
            <div className="max-w-2xl">
              <p className="text-stone-600 uppercase tracking-[0.6em] text-[10px] font-black mb-8">Selected Registry 2024</p>
              <h2 className="text-5xl md:text-8xl font-serif leading-[1.1] tracking-tighter">Signature <br/> Residences.</h2>
            </div>
            <button className="mt-12 lg:mt-0 bg-black border border-white/10 px-14 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-black transition-all">
              View All Portfolios
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {MOCK_PROPERTIES.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 150}ms` }}>
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-60 relative overflow-hidden bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border border-white/5 rounded-full pointer-events-none reveal" />
          
          <div className="max-w-4xl mx-auto text-center px-10 relative z-10 reveal">
            <h3 className="text-stone-700 uppercase tracking-[1em] text-[10px] font-black mb-20">The Philosophy</h3>
            <p className="text-4xl md:text-7xl font-serif mb-24 leading-[1.3] italic text-white/90">
              "We represent estates that aren't just lived in, but <span className="text-stone-500 not-italic">witnessed</span>."
            </p>
            <div className="w-40 h-[1px] bg-stone-900 mx-auto" />
          </div>
        </section>

        {/* Expertise Grid */}
        <section className="py-48 bg-[#050505] rounded-luxury mx-8 mb-24 border border-white/5 reveal">
          <div className="max-w-7xl mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
              {[
                { title: "Strategic Advisory", desc: "Global market analytics and portfolio structuring for high-net-worth architectural acquisitions." },
                { title: "Cinematic Sales", desc: "Visual storytelling that elevates a property from a residence to a cultural landmark." },
                { title: "Legacy Planning", desc: "Multi-generational asset management focusing on long-term structural and design preservation." }
              ].map((service, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                    <span className="text-white group-hover:text-black font-serif text-xl italic">0{idx + 1}</span>
                  </div>
                  <h4 className="text-3xl font-serif text-white mb-6 tracking-tight">{service.title}</h4>
                  <p className="text-stone-600 text-lg leading-relaxed font-light italic">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-60 pb-20 border-t border-white/5 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-32 mb-40">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif text-white mb-10 tracking-[0.2em]">ELYSIAN ESTATES</h1>
              <p className="text-stone-600 max-w-sm mb-16 leading-loose text-lg font-light italic">
                The international benchmark for luxury real estate services and private asset advisory.
              </p>
              <div className="flex space-x-12">
                {['Instagram', 'LinkedIn', 'Journal'].map(social => (
                  <a key={social} href="#" className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-700 hover:text-white transition-all border-b border-stone-900 hover:border-white pb-2">{social}</a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-500 mb-10">Directory</h5>
              <ul className="space-y-6 text-[11px] uppercase tracking-[0.3em] text-stone-600 font-black">
                <li><a href="#" className="hover:text-white transition-colors">Portfolios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Private Office</a></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h5 className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-500 mb-10">Inquiries</h5>
              <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] flex items-center justify-between border border-white/5 shadow-2xl">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-600 mb-2">Electronic Communications</p>
                  <p className="text-white font-bold text-xl">concierge@elysian.com</p>
                </div>
                <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.6em] font-black text-stone-800">
            <span>© 2024 Elysian Estates International.</span>
            <div className="flex space-x-12 mt-8 md:mt-0">
              <a href="#" className="hover:text-white transition-all">Privacy</a>
              <a href="#" className="hover:text-white transition-all">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <AIChatAssistant />
    </div>
  );
};

export default App;