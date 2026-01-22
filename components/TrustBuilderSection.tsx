import React, { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

interface TrustBuilderSectionProps {
  onRequestCall?: () => void;
}

const TrustBuilderSection: React.FC<TrustBuilderSectionProps> = ({ onRequestCall }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative bg-black py-6 md:py-8"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Architectural graphic element */}
          <div className="flex justify-center mb-6">
            <svg width="80" height="50" viewBox="0 0 120 80" className="opacity-90">
              <g>
                <line x1="20" y1="70" x2="20" y2="30" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="40" strokeDashoffset="40">
                  <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.2s" fill="freeze" />
                </line>
                <line x1="40" y1="70" x2="40" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" strokeDasharray="50" strokeDashoffset="50">
                  <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1.4s" fill="freeze" />
                </line>
                <line x1="60" y1="70" x2="60" y2="10" stroke="white" strokeWidth="2" opacity="0.9" strokeDasharray="60" strokeDashoffset="60">
                  <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.6s" fill="freeze" />
                </line>
                <line x1="80" y1="70" x2="80" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" strokeDasharray="50" strokeDashoffset="50">
                  <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1.4s" fill="freeze" />
                </line>
                <line x1="100" y1="70" x2="100" y2="30" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="40" strokeDashoffset="40">
                  <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.2s" fill="freeze" />
                </line>
                <line x1="10" y1="70" x2="110" y2="70" stroke="white" strokeWidth="2" opacity="0.2" />
              </g>
            </svg>
          </div>

          {/* Main message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-3 tracking-tight leading-tight">
              One honest conversation can save you
              <span className="bold"> "years of regret"</span>
            </h2>
            
            <div className="w-12 h-px bg-white mx-auto my-4 opacity-40"></div>
            
            <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Whether you're <span className="text-white font-normal inline-block hover:scale-105 transition-transform duration-300 cursor-default">buying now</span>, <span className="text-white font-normal inline-block hover:scale-105 transition-transform duration-300 cursor-default">later</span>, or just <span className="text-white font-normal inline-block hover:scale-105 transition-transform duration-300 cursor-default">exploring</span>—I'm here.<br />
              Even if you don't buy through me, <span className="text-white font-medium border-b border-white/0 hover:border-white/100 transition-all duration-500 cursor-default">I'll ensure you make the right decision.</span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={onRequestCall}
              className="group relative px-8 py-3 border border-white text-white font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-white hover:text-black overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Phone className="w-4 h-4" />
                Request a Call
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
            
            <p className="text-gray-600 text-xs uppercase tracking-widest">
              No spam · No pressure · Just clarity
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustBuilderSection;
