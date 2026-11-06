import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIsMobile';

interface IntroLoaderProps {
  onComplete: () => void;
  isMobile?: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, isMobile = false }) => {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'drawing' | 'filled' | 'wordmark' | 'finished'>('drawing');

  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }

    // Counter timer 0 -> 100
    const duration = isMobile ? 2200 : 3200;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const current = Math.min(100, Math.round((stepCount / steps) * 100));
      setProgress(current);

      if (current >= 30 && phase === 'drawing') {
        setPhase('filled');
      }
      if (current >= 55 && phase !== 'wordmark') {
        setPhase('wordmark');
      }
      if (current >= 100) {
        clearInterval(timer);
        setPhase('finished');
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, prefersReduced, isMobile, phase]);

  const handleSkip = () => {
    setProgress(100);
    setPhase('finished');
    onComplete();
  };

  const letters = ['V', 'A', 'N', 'T', 'É', 'R'];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onClick={handleSkip}
      >
        {/* Curtains / Exit panels */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-black origin-top z-10"
          animate={phase === 'finished' ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-black origin-bottom z-10"
          animate={phase === 'finished' ? { y: '100%' } : { y: '0%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Ambient Gold Dust / Radial Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            className="w-[420px] h-[420px] rounded-full bg-gold/10 blur-[100px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.2, 0.5, 0.3], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Skip Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-taupe/60 hover:text-gold transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
        >
          <span>Skip Intro</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60 group-hover:bg-gold transition-colors" />
        </button>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-md w-full">
          {/* Animated SVG Monogram */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E8B8" />
                  <stop offset="40%" stopColor="#C9A45C" />
                  <stop offset="80%" stopColor="#E2C685" />
                  <stop offset="100%" stopColor="#8A6724" />
                </linearGradient>
              </defs>

              {/* Stroke Draw Paths */}
              <motion.path
                d="M 45 60 L 95 60 L 150 225 L 150 245 L 138 245 L 45 60 Z"
                stroke="#C9A45C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                fill={progress > 30 ? 'url(#introGoldGrad)' : 'none'}
                style={{ transition: 'fill 0.8s ease' }}
              />

              <motion.path
                d="M 255 60 L 205 60 L 150 225 L 150 245 L 162 245 L 255 60 Z"
                stroke="#C9A45C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                fill={progress > 30 ? 'url(#introGoldGrad)' : 'none'}
                style={{ transition: 'fill 0.8s ease' }}
              />

              <motion.path
                d="M 112 60 L 188 60 L 150 140 Z"
                stroke="#E3C88A"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                fill={progress > 35 ? 'url(#introGoldGrad)' : 'none'}
                style={{ transition: 'fill 0.8s ease' }}
              />

              <motion.path
                d="M 150 152 L 142 215 L 150 235 L 158 215 Z"
                stroke="#E3C88A"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                fill={progress > 40 ? 'url(#introGoldGrad)' : 'none'}
                style={{ transition: 'fill 0.8s ease' }}
              />
            </svg>

            {/* Light sheen sweeping across */}
            {progress > 45 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                initial={{ x: '-120%', opacity: 0 }}
                animate={{ x: '120%', opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* Staggered Wordmark Reveal: V A N T É R */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-5 my-3 h-10 overflow-hidden">
            {letters.map((char, idx) => (
              <motion.span
                key={idx}
                className="font-cinzel text-xl sm:text-2xl text-gold tracking-widest inline-block"
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={
                  progress >= 50
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 25, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.6,
                  delay: idx === 4 ? 0.35 : idx * 0.08, // Accent on É drops in last with distinct cadence!
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-taupe font-sans mt-1"
            initial={{ opacity: 0 }}
            animate={progress >= 65 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            HAUTE PARFUMERIE • PARIS
          </motion.p>

          {/* Expanding Gold Progress Bar */}
          <div className="w-48 sm:w-56 h-[1px] bg-sand/20 mt-8 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Numerical Counter */}
          <div className="mt-3 font-sans text-[10px] tracking-[0.3em] text-taupe/80 flex items-center justify-between w-48 sm:w-56">
            <span>Maison 2026</span>
            <span className="font-mono text-gold/90">{String(progress).padStart(3, '0')}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

