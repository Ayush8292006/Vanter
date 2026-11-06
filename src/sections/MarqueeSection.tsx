import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeSection: React.FC = () => {
  const marqueeItems = [
    'WILD ASSAM OUD',
    'BALTIC AMBER',
    'MYSORE SANDALWOOD',
    'ROSE DE MAI',
    'HAITIAN VETIVER',
    'CALABRIAN BERGAMOT',
    'FLORENTINE ORRIS',
    'MADAGASCAR VANILLA',
  ];

  return (
    <section className="bg-black border-y border-sand/20 py-6 sm:py-8 overflow-hidden select-none relative z-20">
      <div className="flex w-fit">
        <motion.div
          className="flex items-center space-x-8 sm:space-x-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
        >
          {/* Double items for seamless infinite loop */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-8 sm:space-x-12">
              <span
                className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] text-transparent hover:text-gold transition-colors duration-500 cursor-default"
                style={{
                  WebkitTextStroke: '1px rgba(201, 164, 92, 0.45)',
                }}
              >
                {item}
              </span>
              <span className="text-gold text-sm sm:text-lg opacity-60">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

