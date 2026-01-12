
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const imageMap: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=90&w=1200',
    '2': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=1200',
    '3': 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=90&w=1200',
    '4': 'https://images.unsplash.com/photo-1580587767526-d3c2600811a1?auto=format&fit=crop&q=90&w=1200',
    '5': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1200',
    '6': 'https://images.unsplash.com/photo-1600607687940-c52fb0a4599c?auto=format&fit=crop&q=90&w=1200'
  };

  const displayImage = imageMap[property.id] || property.image;

  return (
    <div className="group relative bg-[#0a0a0a] rounded-luxury overflow-hidden border border-white/5 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] hover:-translate-y-2">
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={displayImage} 
          alt={property.title}
          className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:scale-110 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        
        <div className="absolute top-8 left-8">
          <span className="bg-black/80 backdrop-blur px-5 py-2 rounded-full text-[10px] tracking-[0.3em] uppercase font-black text-white border border-white/10">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="p-10 relative">
        <h3 className="text-3xl font-serif text-white mb-3 italic">{property.title}</h3>
        <p className="text-stone-500 text-sm mb-8 flex items-center tracking-tight font-medium">
          <svg className="w-4 h-4 mr-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
          {property.location}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex space-x-6 text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">
            <span>{property.beds} BEDS</span>
            <span>{property.baths} BATHS</span>
          </div>
          <div className="text-2xl font-serif text-white">{property.price}</div>
        </div>
        
        <button className="mt-10 w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-stone-200 transition-all shadow-xl">
          Inquire Privately
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
