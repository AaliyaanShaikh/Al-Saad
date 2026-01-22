import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import PropertiesSection from './components/PropertiesSection';
import ProjectCard from './components/ProjectCard';
import AIChatAssistant from './components/AIChatAssistant';
import CallbackForm from './components/CallbackForm';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { StrokeFill } from './components/StrokeFill';
import TrustBuilderSection from './components/TrustBuilderSection';
import { AppState } from './types';
import { MOCK_PROJECTS, SHOWCASE_PROJECTS } from './constants';

// Hero Section Positioning Helper Function
// Adjust these values to change mobile screen positioning
const getHeroTextPositioning = () => {
  // Mobile positioning values (modify these as needed)
  const mobileTopTextTop = 'top-40';      // Top text from top (mobile)
  const mobileBottomTextBottom = 'bottom-36'; // Bottom text from bottom (mobile)
  
  // Default responsive breakpoint values (usually don't need to change)
  const smTopTextTop = 'sm:top-32';
  const mdTopTextTop = 'md:top-36';
  const lgTopTextTop = 'lg:top-[150px]';
  
  const smBottomTextBottom = 'sm:bottom-24';
  const mdBottomTextBottom = 'md:bottom-28';
  const lgBottomTextBottom = 'lg:bottom-[130px]';
  
  return {
    topText: `${mobileTopTextTop} ${smTopTextTop} ${mdTopTextTop} ${lgTopTextTop}`,
    bottomText: `${mobileBottomTextBottom} ${smBottomTextBottom} ${mdBottomTextBottom} ${lgBottomTextBottom}`
  };
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isCallbackFormOpen, setIsCallbackFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get hero text positioning classes
  const heroPositioning = getHeroTextPositioning();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setHasScrolledPastHero(window.scrollY > window.innerHeight);
    };
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
      // Observe all reveal elements
      setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-pop').forEach(el => observer.observe(el));
      }, 100);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [appState]);

  if (appState === AppState.INTRO) {
    return <IntroAnimation onComplete={() => setAppState(AppState.HOME)} />;
  }

  if (appState === AppState.PRIVACY) {
    return <PrivacyPage onNavigate={setAppState} />;
  }

  if (appState === AppState.TERMS) {
    return <TermsPage onNavigate={setAppState} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden">
      {/* Animated Background Graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Circles */}
        <div className="graphic-circle animate-float w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 top-10 sm:top-20 left-4 sm:left-10 opacity-20" style={{ animationDelay: '0s' }}></div>
        <div className="graphic-circle animate-float-reverse w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 top-1/2 right-4 sm:right-10 md:right-20 opacity-15" style={{ animationDelay: '2s' }}></div>
        <div className="graphic-circle animate-float w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bottom-20 sm:bottom-32 md:bottom-40 left-1/4 opacity-10" style={{ animationDelay: '4s' }}></div>
        <div className="graphic-circle animate-pulse-glow w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/3 right-1/3 opacity-10"></div>
        
        {/* Geometric Shapes */}
        <div className="geometric-shape w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 top-1/4 left-1/4 border-white/5 animate-rotate-slow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="geometric-shape w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 bottom-1/4 right-1/4 border-white/5 animate-rotate-slow" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', animationDirection: 'reverse', animationDuration: '15s' }}></div>
        
        {/* Animated Lines */}
        <div className="graphic-line w-px h-48 sm:h-64 md:h-80 lg:h-96 top-0 left-1/4 animate-pulse-glow" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div className="graphic-line w-48 sm:w-64 md:w-80 lg:w-96 h-px top-1/2 right-0 animate-pulse-glow" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 sm:px-6 md:px-10 pt-8 sm:pt-6 md:pt-10 ${isScrolled ? 'translate-y-[-20px]' : ''}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 flex items-center justify-between rounded-full transition-all duration-700 ${isScrolled ? 'glass-dark py-3 sm:py-4 px-4 sm:px-6 md:px-8 shadow-2xl' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-16">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              {hasScrolledPastHero && (
                <img 
                  src="/ChatGPT Image Jan 13, 2026 at 02_37_17 AM.png" 
                  alt="Al-Saad Logo"
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 object-contain hover-lift cursor-pointer transition-all duration-300"
                />
              )}
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.2em] sm:tracking-[0.3em] font-medium text-white hover-lift cursor-pointer">AL-SAAD</h1>
            </div>
            <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">
              <a href="#about" className="hover:text-white transition-all relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#properties" className="hover:text-white transition-all relative group">
                Properties
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#work" className="hover:text-white transition-all relative group">
                Work
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="hover:text-white transition-all relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => setIsCallbackFormOpen(true)}
              className="bg-stone-100 text-black px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black hover:bg-stone-200 transition-all shadow-xl hover-lift"
            >
              <span className="hidden sm:inline">Request Call</span>
              <span className="sm:hidden">Call</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 px-4 sm:px-6 md:px-10 py-6 glass-dark rounded-2xl border border-white/10 animate-dropdown">
            <div className="flex flex-col space-y-4 text-[10px] uppercase tracking-[0.4em] font-black">
              <a 
                href="#properties" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-500 hover:text-white transition-all py-2 border-b border-white/5 animate-menu-item"
                style={{ animationDelay: '0.1s' }}
              >
                Properties
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-500 hover:text-white transition-all py-2 border-b border-white/5 animate-menu-item"
                style={{ animationDelay: '0.2s' }}
              >
                About
              </a>
              <a 
                href="#work" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-500 hover:text-white transition-all py-2 border-b border-white/5 animate-menu-item"
                style={{ animationDelay: '0.3s' }}
              >
                Work
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-500 hover:text-white transition-all py-2 animate-menu-item"
                style={{ animationDelay: '0.3s' }}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/ChatGPT Image Jan 13, 2026 at 02_30_41 AM.png" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Background"
            />
          </div>

          {/* Top Fixed Text */}
          <div className={`absolute left-1/2 -translate-x-1/2 z-10 w-full px-4 sm:px-6 md:px-10 ${heroPositioning.topText}`}>
            <p className="text-stone-500 uppercase tracking-[0.5em] sm:tracking-[0.6em] md:tracking-[0.8em] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-black reveal active text-center">
              Visionary • Realtor • Educator
            </p>
          </div>

          {/* Bottom Text Container */}
          <div className={`absolute left-1/2 -translate-x-1/2 z-10 w-full px-4 sm:px-6 md:px-10 ${heroPositioning.bottomText} flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12`}>
            {/* Headline */}
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-4xl mx-auto leading-tight reveal active text-center">
              Jogeshwari Real Estate, Explained Honestly.
            </h2>
            
            {/* Bottom Fixed Text */}
            <p className="text-stone-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto leading-relaxed reveal active text-center" style={{ transitionDelay: '600ms' }}>
              I help serious homebuyers and investors make clear, confident, and profitable property decisions—without pressure, misinformation, or overpricing.

            </p>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => {
              const propertiesSection = document.getElementById('work');
              if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="flex flex-col items-center space-y-4 reveal active" style={{ transitionDelay: '1000ms' }}>
              <span className="text-[9px] uppercase tracking-[0.6em] text-stone-600 font-black text-center">Explore</span>
              <div className="scroll-indicator-container">
                <div className="scroll-indicator-line"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stroke Fill Animation */}
        {/* <StrokeFill /> */}

        {/* About Section */}
        <section id="about" className="py-24 sm:py-32 md:py-48 lg:py-60 relative overflow-hidden bg-black">
          {/* Animated Circle Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border border-white/5 rounded-full pointer-events-none reveal animate-rotate-slow" style={{ animationDuration: '30s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-white/5 rounded-full pointer-events-none animate-rotate-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          
          {/* Floating Shapes */}
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 md:left-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 md:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border border-white/5 rounded-full animate-float-reverse"></div>
          
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-10 relative z-10">
            <h3 className="text-stone-700 uppercase tracking-[0.8em] sm:tracking-[1em] text-[9px] sm:text-[10px] font-black mb-12 sm:mb-16 md:mb-20 reveal-pop">About</h3>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-serif mb-6 sm:mb-8 md:mb-12 lg:mb-16 leading-[1.3] italic text-white/90 reveal-pop px-2 sm:px-4" style={{ transitionDelay: '0.1s' }}>
              "A home is not just a place—it's <span className="text-stone-500 not-italic">where life happens</span>."
            </p>
          </div>
        </section>

        {/* Properties Section */}
        <section id="properties" className="relative">
          <PropertiesSection properties={MOCK_PROJECTS} />
        </section>

        {/* Work Section */}
        <section id="work" className="py-24 sm:py-32 md:py-48 lg:py-60 relative overflow-hidden bg-black">
          {/* Animated Circle Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border border-white/5 rounded-full pointer-events-none reveal animate-rotate-slow" style={{ animationDuration: '30s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-white/5 rounded-full pointer-events-none animate-rotate-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          
          {/* Floating Shapes */}
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 md:left-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 md:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border border-white/5 rounded-full animate-float-reverse"></div>
          
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-10 relative z-10">
            <h3 className="text-stone-700 uppercase tracking-[0.8em] sm:tracking-[1em] text-[9px] sm:text-[10px] font-black mb-12 sm:mb-16 md:mb-20 reveal-pop">Work</h3>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-serif mb-6 sm:mb-8 md:mb-12 lg:mb-16 leading-[1.3] italic text-white/90 reveal-pop px-2 sm:px-4" style={{ transitionDelay: '0.1s' }}>
              "A home is not just a place—it's <span className="text-stone-500 not-italic">where life happens</span>."
            </p>
            <div className="w-32 sm:w-40 h-[1px] bg-stone-900 mx-auto mb-10 sm:mb-12 md:mb-16 reveal-pop" style={{ transitionDelay: '0.2s' }}></div>
            <p className="text-stone-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2 sm:px-4 reveal-pop" style={{ transitionDelay: '0.3s' }}>
              With years of experience in real estate, I specialize in helping clients find their perfect property. 
              Whether you're buying, selling, or investing, I provide expert guidance, market insights, 
              and personalized service to make your real estate journey seamless and successful.
            </p>
          </div>
        </section>

        {/* ProjectCard Grid Section */}
        <section className="py-24 sm:py-32 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 md:mb-24 lg:mb-32 reveal">
            <div className="max-w-2xl w-full lg:w-auto">
              <p className="text-stone-600 uppercase tracking-[0.5em] sm:tracking-[0.6em] text-[9px] sm:text-[10px] font-black mb-4 sm:mb-6 md:mb-8 animate-slide-left">Highlighting Achievements</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-serif leading-[1.1] tracking-tighter animate-scale-in">Work That<br/>Speaks for Itself
              </h2>
            </div>
            <p className="mt-8 sm:mt-10 md:mt-12 lg:mt-0 lg:ml-8 text-stone-500 text-xs sm:text-sm max-w-md leading-relaxed reveal animate-slide-right">
            A curated space honoring remarkable achievements, crafted to reflect prestige, purpose, and distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative z-10">
            {SHOWCASE_PROJECTS.map((project, i) => (
              <div key={project.id} className="reveal hover-lift" style={{ transitionDelay: `${(i % 3) * 150}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 sm:py-32 md:py-48 bg-[#050505] rounded-luxury mx-2 sm:mx-4 md:mx-8 mb-12 sm:mb-16 md:mb-24 border border-white/5 reveal hover-glow relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-gradient opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 reveal">
              <p className="text-stone-600 uppercase tracking-[0.5em] sm:tracking-[0.6em] text-[9px] sm:text-[10px] font-black mb-4 sm:mb-6 md:mb-8 animate-slide-left">Services</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-serif leading-[1.1] tracking-tighter animate-scale-in">How I Help You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 reveal">
              {[
                { title: "Strategic Property Buying", desc: "Helping end-users and investors choose the right property at the right time." },
                { title: "Honest Property Consultation", desc: "Clear answers about pricing, risks, future prospects, and suitability—without sales pressure." },
                { title: "⁠Local Market Intelligence", desc: "Deep understanding of Jogeshwari & surrounding micro-markets that most outsiders miss." }
              ].map((skill, idx) => (
                <div key={idx} className="group cursor-pointer hover-lift animate-scale-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 md:mb-10 group-hover:bg-white group-hover:scale-110 transition-all duration-500 animate-glow">
                    <span className="text-white group-hover:text-black font-serif text-lg sm:text-xl italic">0{idx + 1}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-4 sm:mb-6 tracking-tight group-hover:text-white/80 transition-colors">{skill.title}</h4>
                  <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-light italic group-hover:text-stone-400 transition-colors">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Trust Builder Section */}
      <TrustBuilderSection onRequestCall={() => setIsCallbackFormOpen(true)} />

      {/* Footer */}
      <footer id="contact" className="bg-black pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 border-t border-white/5 rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[5rem] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 sm:gap-16 md:gap-24 lg:gap-32 mb-20 sm:mb-32 md:mb-40">
            <div className="lg:col-span-2 reveal animate-slide-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 tracking-[0.2em] hover-lift">AL-SAAD</h1>
              <p className="text-stone-600 max-w-sm mb-8 sm:mb-12 md:mb-16 leading-loose text-base sm:text-lg font-light italic">
                Let's find your perfect property together. 
                I'm always available to discuss your real estate needs and answer any questions.
              </p>
              <div className="flex flex-nowrap gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {[
                  { name: 'Instagram', url: 'https://www.instagram.com/alsaad.in/' },
                  { name: 'YouTube', url: 'https://www.youtube.com/@alsaad_in' },
                  { name: 'WhatsApp', url: 'https://www.whatsapp.com/channel/0029Vb7A5K0BadmfcCLWAj2z?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnNlqOuz0dgQNmXOt453HIOTxizLmYdebXLDe9FVKYTvCoGafxQ0aFJUgxHhM_aem_CdEdI7ABSjCZiOBk48imCw' }
                ].map((social, idx) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em] font-black text-stone-700 hover:text-white transition-all border-b border-stone-900 hover:border-white pb-2 hover-lift animate-slide-left whitespace-nowrap" style={{ animationDelay: `${idx * 0.1}s` }}>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="reveal animate-slide-right">
              <h5 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em] font-black text-stone-500 mb-6 sm:mb-8 md:mb-10">Navigation</h5>
              <ul className="space-y-4 sm:space-y-6 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-stone-600 font-black">
                <li><a href="#about" className="hover:text-white transition-colors hover-lift inline-block">About</a></li>
                <li><a href="#properties" className="hover:text-white transition-colors hover-lift inline-block">Properties</a></li>
                <li><a href="#work" className="hover:text-white transition-colors hover-lift inline-block">Work</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover-lift inline-block">Contact</a></li>
              </ul>
            </div>
            <div className="lg:col-span-2 reveal animate-scale-in">
              <h5 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em] font-black text-stone-500 mb-6 sm:mb-8 md:mb-10">Get In Touch</h5>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-[#0a0a0a] p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between border border-white/5 shadow-2xl hover-lift hover-glow transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-stone-600 mb-2">Email</p>
                    <p className="text-white font-bold text-sm sm:text-base md:text-xl truncate">alsaad.in@gmail.com</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover-scale transition-transform flex-shrink-0 ml-4">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between border border-white/5 shadow-2xl hover-lift hover-glow transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-stone-600 mb-2">Phone</p>
                    <p className="text-white font-bold text-sm sm:text-base md:text-xl">+91 87960 28980</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover-scale transition-transform flex-shrink-0 ml-4">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 sm:pt-14 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em] font-black text-stone-800">
            <span className="text-center md:text-left mb-4 md:mb-0">© 2025 Al-Saad. All rights reserved. Designed by Ezor.</span>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:space-x-12 mt-4 md:mt-0">
              <button onClick={() => setAppState(AppState.PRIVACY)} className="hover:text-white transition-all hover-lift cursor-pointer">
                Privacy
              </button>
              <button onClick={() => setAppState(AppState.TERMS)} className="hover:text-white transition-all hover-lift cursor-pointer">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AIChatAssistant />
      <CallbackForm isOpen={isCallbackFormOpen} onClose={() => setIsCallbackFormOpen(false)} />
    </div>
  );
};

export default App;
