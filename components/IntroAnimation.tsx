
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
      <div className="text-center">
        <div className="overflow-hidden">
          <h1 className={`text-5xl md:text-8xl font-serif text-white tracking-[0.3em] transition-all duration-[1.8s] ease-out ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Al-Saad
          </h1>
        </div>
        <div className={`h-[1px] bg-white/30 mx-auto mt-8 transition-all duration-[2s] ease-in-out ${stage >= 1 ? 'w-64' : 'w-0'}`} />
        <p className={`text-[11px] uppercase tracking-[0.6em] text-stone-500 mt-8 transition-all duration-[1.5s] delay-500 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          Realtor
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
