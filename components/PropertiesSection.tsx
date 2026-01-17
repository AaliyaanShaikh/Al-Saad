import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface PropertiesSectionProps {
  properties: Project[];
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({ properties }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'exclusive' | 'archived'>('exclusive');

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
    <section className="py-40 px-6 max-w-[1600px] mx-auto relative">
      {/* Background Decorative Text */}
      <div className="absolute left-0 w-full overflow-hidden pointer-events-none -z-10 opacity-[0.03] select-none">
        <div 
          className="text-[25vw] font-black font-serif uppercase whitespace-nowrap"
          style={{ transform: `translateX(${-20 + scrollY * 0.05}%)` }}
        >
          Al-Saad Premium Properties
        </div>
      </div>

      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
        <div className="max-w-xl">
          <span className="text-stone-600 uppercase tracking-[0.6em] text-[10px] font-black mb-8 block">Our Project</span>
          <h2 className="text-8xl font-serif leading-[1.1] tracking-tighter mb-8">Featured <br/> Listings.</h2>
        </div>
        
        <div className="flex items-center flex-wrap gap-8 xl:space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
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
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12">
        {filteredProperties.map((property, idx) => {
          // Make property 7 (id: '7') regular size to fill remaining space
          const isLarge = idx % 3 === 0 && property.id !== '7';
          return (
            <div 
              key={property.id} 
              className={`group flex flex-col ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
            >
              <div 
                className={`parallax-container relative overflow-hidden bg-[#0a0a0a] mb-10 cursor-pointer rounded-sm transition-all duration-700 ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                onClick={() => {
                  if (property.link && property.link !== '#') {
                    window.open(property.link, '_blank');
                  } else {
                    // Scroll to contact section or open callback form
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="parallax-img absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                  style={{ transform: `translateY(${(scrollY * (idx % 2 === 0 ? 0.05 : -0.05))}px)` }}
                  onError={(e) => {
                    // Fallback to a default image if the URL fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=2000';
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                
                {/* Visual Label */}
                <div className="absolute bottom-8 right-8 overflow-hidden">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    Explore
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between items-start gap-6 px-2">
                <div className="flex-1 min-w-0 flex-shrink">
                  <h3 className="font-serif text-4xl font-light tracking-tight mb-3 italic transition-all group-hover:translate-x-2 break-words">{property.title}</h3>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{property.location || property.category}</p>
                </div>
                <div className="flex flex-col items-end flex-shrink-0 min-w-[140px]">
                  <p className="text-2xl font-extralight tracking-tighter mb-2 whitespace-nowrap">{property.price || 'Price on Request'}</p>
                  <div className="flex flex-col items-end text-[9px] font-black uppercase tracking-[0.3em] text-white/10 space-y-1">
                    {property.beds && <span className="whitespace-nowrap">{property.beds} Bedrooms</span>}
                    {property.sqft && <span className="whitespace-nowrap">{property.sqft} SQFT</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default PropertiesSection;
