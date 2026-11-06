import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VMonogram } from '../components/brand/VMonogram';

export const CinematicBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] sm:min-h-[90vh] bg-black text-ivory flex items-center justify-center overflow-hidden border-b border-sand/20 select-none"
    >
      {/* Background Cinematic Visual */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1512290900672-1f02e6040854?auto=format&fit=crop&w=1800&q=85"
          alt="VANTÉR Cinematic Mood"
          className="w-full h-full object-cover object-center filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </motion.div>

      {/* Atmospheric Gold Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80" />

      {/* Centered Editorial Statement */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block mb-6">
          <VMonogram size={48} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase font-sans tracking-[0.4em] text-gold mb-4"
        >
          AN INVISIBLE SECOND SKIN
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory leading-tight"
        >
          Wear it like a <span className="italic font-normal text-gold-light">secret</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xs sm:text-sm text-sand/80 max-w-lg mx-auto font-sans leading-relaxed"
        >
          Fragrance that does not claim space by volume, but holds it by unforgettable magnetism.
        </motion.p>
      </div>
    </section>
  );
};

