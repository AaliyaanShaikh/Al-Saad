import React, { useRef, useState, useEffect } from 'react';
import { XCircle, TrendingUp, Shield, Target, Lightbulb, ArrowDownLeft } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SocialLinks from './SocialLinks';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isInView) setHasBeenVisible(true);
  }, [isInView]);
  useEffect(() => {
    const t = setTimeout(() => setHasBeenVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const differences = [
    {
      icon: XCircle,
      title: 'I clearly tell you when NOT to buy',
      description: 'Honest guidance even when it means no sale.'
    },
    {
      icon: TrendingUp,
      title: 'I explain pricing reality, not sales pitches',
      description: 'Transparent market insights without sales pressure.'
    },
    {
      icon: Target,
      title: 'I focus on select projects, not everything in the market',
      description: 'Curated projects chosen for long-term value.'
    },
    {
      icon: Shield,
      title: 'I break down pros, cons, and risks honestly',
      description: 'You see the full picture before you commit.'
    },
    {
      icon: Lightbulb,
      title: 'I work best with people who value transparency over hype',
      description: 'If you want truth and strategy, you are in the right place.'
    }
  ];

  return (
    <div ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      <motion.section
        className="relative flex flex-col py-24 sm:py-32 md:py-40 max-w-7xl mx-auto px-4 sm:px-6 md:px-10"
        initial={{ opacity: 0 }}
        animate={isInView || hasBeenVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section eyebrow + heading — first on all screens */}
        <div className="mb-8 sm:mb-12 md:mb-20 text-left">
          <p className="text-stone-700 uppercase tracking-[0.8em] text-[9px] sm:text-[10px] font-medium mb-4">
            About
          </p>
          <h2 className="font-serif text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight text-white whitespace-nowrap overflow-x-auto pb-1 -mx-1 px-1 md:mx-0 md:px-0">
            Not just a broker — <span className="text-stone-400 italic">a long-term advisor.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {/* Founder Portrait — second on mobile, right column on desktop */}
          <motion.div
            className="relative md:order-2 col-span-1 md:col-span-5 min-h-[280px] sm:min-h-[340px] md:min-h-[420px] overflow-hidden bg-[#050505] border border-white/10 rounded-3xl"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 h-full w-full">
              <div className="relative h-full w-full">
                <img
                  src="/profile.jpeg"
                  alt="Muhd Saad Patel, Founder of Al-Saad"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-stone-400 font-medium mb-2">
                        Founder
                      </p>
                      <p className="text-white text-lg sm:text-xl font-medium mb-1">
                        Muhd Saad Patel
                      </p>
                      <p className="text-stone-400 text-xs">
                        Al-Saad · Mumbai Real Estate
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-medium mb-1">
                        Markets
                      </span>
                      <span className="text-stone-200 text-xs">
                        Jogeshwari · Andheri
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Founder Story — third on mobile, left column on desktop */}
          <div className="relative md:order-1 col-span-1 md:col-span-7 flex flex-col justify-between border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 bg-[#050505]/60 backdrop-blur">
            {/* Section Label */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <p className="text-stone-600 uppercase tracking-[0.7em] text-[9px] sm:text-[10px] font-medium mb-4">
                Personal Introduction
              </p>
              <div className="w-20 h-px bg-white/20" />
            </motion.div>

            {/* Massive Title — one line across all devices */}
            <div className="mt-2 sm:mt-4 overflow-hidden">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light uppercase leading-[0.9] tracking-tight flex flex-row flex-nowrap items-baseline gap-2 whitespace-nowrap">
                <div className="overflow-hidden shrink-0">
                  <motion.span
                    className="inline"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                  >
                    Not Just
                  </motion.span>
                </div>
                <div className="overflow-hidden shrink-0">
                  <motion.span
                    className="inline text-transparent"
                    style={{ WebkitTextStroke: '2px white' }}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
                  >
                    A Broker
                  </motion.span>
                </div>
              </h1>
            </div>

            {/* Content Block */}
            <motion.div
              className="mt-12 sm:mt-16 flex max-w-md flex-col gap-6"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                My name is <span className="text-white font-medium">Muhd Saad Patel</span>, founder of{' '}
                <span className="text-white font-medium">Al-Saad</span>.
              </p>

              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                I work closely with buyers and investors across <span className="text-white">Jogeshwari</span>,{' '}
                <span className="text-white">Andheri</span>, and nearby micro-markets, helping them avoid the most common
                (and expensive) mistakes people make while buying property in Mumbai.
              </p>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-3">
                  {/* Real people avatars – copyright-free Unsplash portraits */}
                  <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&h=200&q=80"
                      alt="Client portrait 1"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=200&h=200&q=80"
                      alt="Client portrait 2"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&h=200&q=80"
                      alt="Client portrait 3"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-stone-400">
                  Trusted Advisor
                </span>
              </div>

              {/* Founder Insight Card */}
              <motion.div
                className="mt-6 inline-flex items-center gap-4 bg-[#050505] border border-white/10 rounded-full px-6 py-4 hover-lift transition-all"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/ChatGPT Image Jan 13, 2026 at 02_37_17 AM.png" 
                    alt="Al-Saad Logo"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium">
                    Founder Insight
                  </p>
                  <p className="text-stone-200 text-sm">
                    My job is not to sell you a flat—<span className="text-white">it is to help you make the right decision.</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Corner Decor */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
              <ArrowDownLeft className="h-7 w-7 sm:h-9 sm:w-9 stroke-1 text-white/20" />
            </div>
          </div>
        </div>

        {/* Slider control row */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-stone-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400/70 animate-pulse" />
            <span>{showDetails ? 'Why Choose Me' : 'About Al-Saad'}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="inline-flex items-center gap-3 bg-stone-100 text-black px-5 sm:px-7 py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-medium hover:bg-white hover-lift transition-all"
          >
            {showDetails ? 'Back to About' : 'Why Choose Me'}
            <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">
              {showDetails ? '←' : '→'}
            </span>
          </button>
        </div>

        {/* How We Work – hidden when "Why Choose Me" is open */}
        <AnimatePresence initial={false} mode="wait">
          {!showDetails && (
            <motion.section
              key="how-we-work"
              className="mt-16 sm:mt-20 md:mt-24 w-full border border-white/10 rounded-3xl overflow-hidden bg-[#050505]/80 backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="px-8 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-14 md:py-16 lg:py-20">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-stone-500 font-medium mb-6 sm:mb-8">
                  How We Work
                </p>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-stone-400 leading-[1.2] sm:leading-[1.25]">
                  Every conversation starts with understanding your{' '}
                  <span className="font-medium text-white">real situation</span>{' '}
                  — <span className="font-medium text-white">budget</span>,{' '}
                  <span className="font-medium text-white">timing</span>,{' '}
                  <span className="font-medium text-white">family needs</span>, and{' '}
                  <span className="font-medium text-white">long-term plans</span>{' '}
                  — before talking about any project or price.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Sliding content: Why Choose Me */}
        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatePresence initial={false} mode="wait">
            {showDetails && (
              <motion.div
                key="why-choose-me"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="border border-white/10 rounded-3xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 bg-[#050505]/80 backdrop-blur space-y-8 sm:space-y-10"
              >
                <div className="space-y-3">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-stone-600 font-medium">
                    Why Clients Trust Me
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white leading-snug">
                    Clear advice. No pressure. Long-term thinking.
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
                  {differences.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="group bg-black/60 border border-white/10 rounded-2xl p-5 sm:p-6 hover-lift hover-glow transition-all relative overflow-hidden"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 + idx * 0.07, ease: 'easeOut' }}
                      >
                        <div className="flex items-start gap-4 sm:gap-5">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#050505] border border-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg text-white mb-1.5 tracking-tight font-light">
                              {item.title}
                            </h4>
                            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border border-white/10 rounded-2xl px-5 sm:px-7 py-6 sm:py-7 bg-black/60">
                  <p className="text-stone-300 text-sm leading-relaxed mb-2">
                    If you are looking for <span className="text-white">pressure tactics</span> or{' '}
                    <span className="text-white">manufactured urgency</span>, I am not the right person.
                  </p>
                  <p className="text-white text-sm leading-relaxed font-light">
                    If you want <span className="font-medium">truth</span>, <span className="font-medium">strategy</span>, and{' '}
                    <span className="font-medium">clarity before commitment</span>, you are in the right place.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social — under About, before Properties */}
        <SocialLinks />
      </motion.section>
    </div>
  );
};

export default AboutSection;
