import React, { useState, useEffect, useRef } from 'react';
import IntroAnimation from './components/IntroAnimation';
import ProjectCard from './components/ProjectCard';
import AIChatAssistant from './components/AIChatAssistant';
import { AppState } from './types';
import { MOCK_PROJECTS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden">
      {/* Animated Background Graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Circles */}
        <div className="graphic-circle animate-float w-96 h-96 top-20 left-10 opacity-20" style={{ animationDelay: '0s' }}></div>
        <div className="graphic-circle animate-float-reverse w-64 h-64 top-1/2 right-20 opacity-15" style={{ animationDelay: '2s' }}></div>
        <div className="graphic-circle animate-float w-80 h-80 bottom-40 left-1/4 opacity-10" style={{ animationDelay: '4s' }}></div>
        <div className="graphic-circle animate-pulse-glow w-72 h-72 top-1/3 right-1/3 opacity-10"></div>
        
        {/* Geometric Shapes */}
        <div className="geometric-shape w-32 h-32 top-1/4 left-1/4 border-white/5 animate-rotate-slow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="geometric-shape w-24 h-24 bottom-1/4 right-1/4 border-white/5 animate-rotate-slow" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', animationDirection: 'reverse', animationDuration: '15s' }}></div>
        
        {/* Animated Lines */}
        <div className="graphic-line w-px h-96 top-0 left-1/4 animate-pulse-glow" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div className="graphic-line w-96 h-px top-1/2 right-0 animate-pulse-glow" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-10 pt-10 ${isScrolled ? 'translate-y-[-20px]' : ''}`}>
        <div className={`max-w-7xl mx-auto px-10 py-6 flex items-center justify-between rounded-full transition-all duration-700 ${isScrolled ? 'glass-dark py-4 px-8 shadow-2xl' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-16">
            <h1 className="text-2xl font-serif tracking-[0.3em] font-medium text-white hover-lift cursor-pointer">AL-SAAD</h1>
            <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">
              <a href="#work" className="hover:text-white transition-all relative group">
                Work
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="hover:text-white transition-all relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="hover:text-white transition-all relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
          <button className="bg-white text-black px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-stone-200 transition-all shadow-xl hover-lift hover-glow">
            Inquire
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Image with Parallax */}
          <div className="absolute inset-0 z-0 scale-100">
            <img 
              src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=90&w=2560" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-transform duration-[30s] hover:scale-110"
              alt="Background"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=2560";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black animate-gradient" style={{ background: 'linear-gradient(180deg, #000 0%, transparent 50%, #000 100%)' }} />
            
            {/* Animated Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Morphing Background Shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-white/0 animate-morph blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center px-10 max-w-5xl">
            <div className="overflow-hidden mb-8">
              <p className="text-stone-500 uppercase tracking-[0.8em] text-[11px] font-black reveal active animate-text-reveal">
                Designer • Creative Director • Visionary
              </p>
            </div>
            <h2 className="text-6xl md:text-[8rem] font-serif mb-8 leading-[0.95] tracking-tighter reveal active animate-scale-in" style={{ transitionDelay: '300ms' }}>
              Crafting <br /><span className="italic font-light animate-shimmer">Digital Experiences.</span>
            </h2>
            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed reveal active animate-slide-left" style={{ transitionDelay: '600ms' }}>
              I create meaningful connections between brands and audiences through thoughtful design, 
              strategic thinking, and innovative solutions.
            </p>
          </div>

          {/* Scroll Indicator with Animation */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 reveal active animate-float" style={{ transitionDelay: '1000ms' }}>
            <span className="text-[9px] uppercase tracking-[0.6em] text-stone-600 font-black">Explore</span>
            <div className="scroll-indicator-container">
              <div className="scroll-indicator-line"></div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-48 max-w-7xl mx-auto px-10 relative">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 reveal">
            <div className="max-w-2xl">
              <p className="text-stone-600 uppercase tracking-[0.6em] text-[10px] font-black mb-8 animate-slide-left">Selected Work</p>
              <h2 className="text-5xl md:text-8xl font-serif leading-[1.1] tracking-tighter animate-scale-in">Recent <br/> Projects.</h2>
            </div>
            <p className="mt-12 lg:mt-0 text-stone-500 text-sm max-w-md leading-relaxed reveal animate-slide-right">
              A collection of projects that represent my approach to design, 
              strategy, and creative problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {MOCK_PROJECTS.map((project, i) => (
              <div key={project.id} className="reveal hover-lift" style={{ transitionDelay: `${(i % 3) * 150}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-60 relative overflow-hidden bg-black">
          {/* Animated Circle Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border border-white/5 rounded-full pointer-events-none reveal animate-rotate-slow" style={{ animationDuration: '30s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-white/5 rounded-full pointer-events-none animate-rotate-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          
          {/* Floating Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/5 rounded-full animate-float-reverse"></div>
          
          <div className="max-w-4xl mx-auto text-center px-10 relative z-10 reveal">
            <h3 className="text-stone-700 uppercase tracking-[1em] text-[10px] font-black mb-20 animate-scale-in">About</h3>
            <p className="text-4xl md:text-7xl font-serif mb-16 leading-[1.3] italic text-white/90 animate-text-reveal">
              "Design is not just what it looks like—design is <span className="text-stone-500 not-italic animate-shimmer">how it works</span>."
            </p>
            <div className="w-40 h-[1px] bg-stone-900 mx-auto mb-16 animate-shimmer"></div>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-slide-left">
              With a passion for creating meaningful digital experiences, I blend aesthetic sensibility 
              with functional design. Every project is an opportunity to tell a story, solve a problem, 
              and connect with people on a deeper level.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-48 bg-[#050505] rounded-luxury mx-8 mb-24 border border-white/5 reveal hover-glow relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-gradient opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-12 relative z-10">
            <div className="text-center mb-20">
              <p className="text-stone-600 uppercase tracking-[0.6em] text-[10px] font-black mb-8 animate-slide-left">Capabilities</p>
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tighter animate-scale-in">What I Do.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
              {[
                { title: "Design Strategy", desc: "Transforming complex ideas into clear, compelling visual narratives that resonate with audiences." },
                { title: "Creative Direction", desc: "Leading multidisciplinary teams to create cohesive brand experiences across all touchpoints." },
                { title: "Digital Innovation", desc: "Exploring emerging technologies and platforms to push the boundaries of digital design." }
              ].map((skill, idx) => (
                <div key={idx} className="group cursor-pointer hover-lift animate-scale-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white group-hover:scale-110 transition-all duration-500 animate-glow">
                    <span className="text-white group-hover:text-black font-serif text-xl italic">0{idx + 1}</span>
                  </div>
                  <h4 className="text-3xl font-serif text-white mb-6 tracking-tight group-hover:text-white/80 transition-colors">{skill.title}</h4>
                  <p className="text-stone-600 text-lg leading-relaxed font-light italic group-hover:text-stone-400 transition-colors">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-60 pb-20 border-t border-white/5 rounded-t-[5rem] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-32 mb-40">
            <div className="lg:col-span-2 reveal animate-slide-left">
              <h1 className="text-4xl font-serif text-white mb-10 tracking-[0.2em] hover-lift">AL-SAAD</h1>
              <p className="text-stone-600 max-w-sm mb-16 leading-loose text-lg font-light italic">
                Let's create something meaningful together. 
                I'm always open to discussing new projects and creative opportunities.
              </p>
              <div className="flex space-x-12">
                {['Instagram', 'LinkedIn', 'Dribbble'].map((social, idx) => (
                  <a key={social} href="#" className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-700 hover:text-white transition-all border-b border-stone-900 hover:border-white pb-2 hover-lift animate-slide-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="reveal animate-slide-right">
              <h5 className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-500 mb-10">Navigation</h5>
              <ul className="space-y-6 text-[11px] uppercase tracking-[0.3em] text-stone-600 font-black">
                <li><a href="#work" className="hover:text-white transition-colors hover-lift inline-block">Work</a></li>
                <li><a href="#about" className="hover:text-white transition-colors hover-lift inline-block">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover-lift inline-block">Contact</a></li>
              </ul>
            </div>
            <div className="lg:col-span-2 reveal animate-scale-in">
              <h5 className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-500 mb-10">Get In Touch</h5>
              <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] flex items-center justify-between border border-white/5 shadow-2xl hover-lift hover-glow transition-all">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-600 mb-2">Email</p>
                  <p className="text-white font-bold text-xl">hello@al-saad.com</p>
                </div>
                <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover-scale transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.6em] font-black text-stone-800">
            <span>© 2024 Al-Saad. All rights reserved.</span>
            <div className="flex space-x-12 mt-8 md:mt-0">
              <a href="#" className="hover:text-white transition-all hover-lift">Privacy</a>
              <a href="#" className="hover:text-white transition-all hover-lift">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <AIChatAssistant />
    </div>
  );
};

export default App;
