import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-[#0a0a0a] rounded-luxury overflow-hidden border border-white/5 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Animated Border Glow */}
      <div className={`absolute inset-0 border-2 border-white/20 rounded-luxury transition-opacity duration-500 ${isHovered ? 'opacity-100 animate-glow' : 'opacity-0'}`}></div>
      
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover grayscale transition-all duration-[2s] ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-80'}`} />
        
        {/* Animated Badges */}
        <div className={`absolute top-8 left-8 transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}>
          <span className="bg-black/80 backdrop-blur px-5 py-2 rounded-full text-[10px] tracking-[0.3em] uppercase font-black text-white border border-white/10 hover-glow">
            {project.category}
          </span>
        </div>
        <div className={`absolute top-8 right-8 transform transition-all duration-500 ${isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'}`}>
          <span className="bg-black/80 backdrop-blur px-5 py-2 rounded-full text-[10px] tracking-[0.3em] uppercase font-black text-white border border-white/10 hover-glow">
            {project.year}
          </span>
        </div>

        {/* Animated Overlay Pattern */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}></div>
      </div>
      
      <div className="p-6 sm:p-8 md:p-10 relative">
        {/* Animated Title */}
        <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 sm:mb-3 italic transition-all duration-500 ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}>
          {project.title}
        </h3>
        
        {/* Animated Description */}
        <p className={`text-stone-500 text-sm sm:text-base mb-4 sm:mb-6 md:mb-8 leading-relaxed font-light transition-all duration-500 ${isHovered ? 'text-stone-400 translate-x-1' : 'text-stone-500 translate-x-0'}`}>
          {project.description}
        </p>
        
        {/* Animated Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`px-4 py-2 bg-black border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-stone-500 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover-glow`}
              style={{ 
                transitionDelay: `${idx * 50}ms`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Animated CTA */}
        <div className={`flex items-center text-stone-400 text-sm transition-all duration-500 ${isHovered ? 'text-white translate-x-2' : 'text-stone-400 translate-x-0'}`}>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black mr-3">View Project</span>
          <svg 
            className={`w-4 h-4 transform transition-all duration-500 ${isHovered ? 'translate-x-2 scale-110' : 'translate-x-0 scale-100'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 transition-all duration-1000 ${isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default ProjectCard;
