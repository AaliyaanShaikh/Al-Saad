import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import BrochureModal from './BrochureModal';

interface PropertiesSectionProps {
  properties: Project[];
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({ properties }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'exclusive' | 'archived'>('exclusive');
  const [brochureOpen, setBrochureOpen] = useState<{ pdfUrl: string; title: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter properties based on active filter
  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'all') return true;
    return property.category === activeFilter;
  });

  return (
    <section className="py-20 sm:py-32 md:py-40 px-4 sm:px-6 max-w-[1600px] mx-auto relative">
      {/* Background Decorative Text */}
          <div className="absolute left-0 w-full overflow-hidden pointer-events-none -z-10 opacity-[0.03] select-none">
        <div 
          className="font-serif text-[20vw] sm:text-[22vw] md:text-[25vw] font-medium uppercase whitespace-nowrap"
          style={{ transform: `translateX(${-20 + scrollY * 0.05}%)` }}
        >
          Al-Saad Premium Properties
        </div>
      </div>

      <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 border-b border-white/5 pb-8 sm:pb-12 md:pb-16">
        <div className="w-full md:flex-1">
          <span className="text-stone-600 uppercase tracking-[0.5em] sm:tracking-[0.6em] text-[9px] sm:text-[10px] font-medium mb-4 sm:mb-6 md:mb-8 block">FEATURED PROJECTS</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight mb-4 sm:mb-6 md:mb-8">
            Carefully<br /> <span className="whitespace-nowrap">Selected Projects.</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed mt-6 sm:mt-8">
            Every project here is featured with purpose. I highlight only properties that are correctly priced, clearly suited to the right buyer or investor, and built for long-term value—not short-term hype. Each is something I'd confidently recommend to my own family.
          </p>
        </div>
        
        <div className="flex items-center flex-wrap gap-4 sm:gap-6 md:gap-8 lg:space-x-8 xl:space-x-12 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40">
          <button 
            onClick={() => setActiveFilter('exclusive')}
            className={`transition-colors pb-2 ${
              activeFilter === 'exclusive' 
                ? 'text-white border-b border-white' 
                : 'hover:text-white'
            }`}
          >
            Exclusive
          </button>
          <button 
            onClick={() => setActiveFilter('archived')}
            className={`transition-colors pb-2 ${
              activeFilter === 'archived' 
                ? 'text-white border-b border-white' 
                : 'hover:text-white'
            }`}
          >
            Archived
          </button>
          <button 
            onClick={() => setActiveFilter('all')}
            className={`transition-colors pb-2 ${
              activeFilter === 'all' 
                ? 'text-white border-b border-white' 
                : 'hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 sm:gap-y-24 md:gap-y-32 gap-x-6 sm:gap-x-8 md:gap-x-12">
        {filteredProperties.map((property, idx) => {
          // Make property 7 (id: '7') regular size to fill remaining space
          const isLarge = idx % 3 === 0 && property.id !== '7';
          return (
            <div 
              key={property.id} 
              className={`group flex flex-col ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
            >
              <div 
                className={`property-card-image-clip parallax-container relative overflow-hidden bg-[#0a0a0a] mb-6 sm:mb-8 md:mb-10 cursor-pointer transition-all duration-700 ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                onClick={() => {
                  if (property.brochure) {
                    setBrochureOpen({ pdfUrl: property.brochure, title: property.title });
                    return;
                  }
                  if (property.link && property.link !== '#') {
                    window.open(property.link, '_blank');
                  } else {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {/* Rounded wrapper clips; inner div has parallax + hover zoom so image stays rounded */}
                <div
                  className="property-card-inner absolute inset-0 overflow-hidden"
                  style={{ borderRadius: '1rem' }}
                >
                  <div
                    className="absolute inset-0 w-full h-full transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                    style={{
                      transform: `translateY(${scrollY * (idx % 2 === 0 ? 0.012 : -0.012)}px)`,
                    }}
                  >
                    <img
                      src={property.image ? encodeURI(property.image) : property.image}
                      alt={property.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{ borderRadius: '1rem' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/fallback-property.png';
                      }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" style={{ borderRadius: '1rem' }} />
                
                {/* Visual Label */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 overflow-hidden">
                  <span className="inline-block text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    Explore
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between items-start gap-4 sm:gap-6 px-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-2 sm:mb-3 transition-all group-hover:translate-x-2">{property.title}</h3>
                  <p className="text-[9px] sm:text-[10px] font-medium text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.4em]">{property.location || property.category}</p>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <p className="text-base sm:text-lg font-light tracking-tight mb-1 sm:mb-2 whitespace-nowrap">{property.price || 'Price on Request'}</p>
                  <div className="flex flex-col items-end text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/10 space-y-1">
                    {property.beds && <span className="whitespace-nowrap">{property.beds} BHK</span>}
                    {property.sqft && <span className="whitespace-nowrap">{property.sqft} SQFT</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {brochureOpen && (
        <BrochureModal
          isOpen={!!brochureOpen}
          onClose={() => setBrochureOpen(null)}
          pdfUrl={brochureOpen.pdfUrl}
          title={brochureOpen.title}
        />
      )}
    </section>
  );
};

export default PropertiesSection;
