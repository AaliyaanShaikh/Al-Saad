
import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),  // Logo reveal
      setTimeout(() => setStage(2), 2600), // Fade out
      setTimeout(() => onComplete(), 3800) // Complete
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-[1.2s] ease-in-out ${stage === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center relative">
        <div className="h-[150px] md:h-[225px] flex items-center justify-center overflow-hidden">
          <img 
            src="/ChatGPT Image Jan 13, 2026 at 02_37_17 AM.png" 
            alt="Al-Saad Logo"
            className={`max-w-[200px] md:max-w-[300px] w-full h-auto transition-opacity duration-[1.8s] ease-out ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: 'translate(0, 0)', display: 'block' }}
          />
        </div>
        <div className={`h-[1px] bg-white/30 mx-auto mt-8 transition-all duration-[2s] ease-in-out relative z-10 ${stage >= 1 ? 'w-64' : 'w-0'}`} />
        <p className={`text-[10px] uppercase tracking-[0.6em] text-stone-500 font-medium mt-8 transition-all duration-[1.5s] delay-500 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          Al-Saad
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
