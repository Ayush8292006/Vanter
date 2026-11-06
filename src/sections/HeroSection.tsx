import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { VanterFlacon } from '../components/brand/VanterFlacon';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const flaconScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const flaconY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] w-full bg-[#0B0B0B] text-ivory flex flex-col justify-between overflow-hidden pt-24 pb-10 px-6 sm:px-12 select-none"
    >
      {/* Background Film Grain Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric Gold Radial Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-tr from-gold/15 via-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Tagline / Meta Status */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.35em] text-taupe font-sans">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Maison de Parfumerie</span>
        </span>
        <span className="hidden sm:inline">Paris — Grasse — Est. 2026</span>
        <span>Batch N° 26-B</span>
      </div>

      {/* Centerpiece: Clean Editorial Hero with Bespoke VANTÉR Flacon */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full my-auto flex flex-col items-center justify-center text-center py-6">
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative w-full flex flex-col items-center"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold font-sans mb-3 sm:mb-4"
          >
            — EXTRAIT DE PARFUM ANTHOLOGY —
          </motion.div>

          {/* Heading: The Art of Invisible Elegance */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] text-ivory max-w-5xl"
            >
              The Art of <span className="italic font-normal text-gold-light">Invisible</span> Elegance
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 sm:mt-5 max-w-xl font-sans text-xs sm:text-sm text-taupe leading-relaxed tracking-wide px-4"
          >
            Eaux de Parfum composed in small batches with the world's rarest ingredients.
            A silent language of quiet luxury and sensual presence.
          </motion.p>

          {/* Floating VANTÉR Luxury Flacon (Transparent, No white box, 3D tilt) */}
          <div className="relative my-6 sm:my-8 z-30 flex items-center justify-center">
            <motion.div
              style={{ scale: flaconScale, y: flaconY }}
              animate={{
                rotateX: -mousePos.y * 0.35,
                rotateY: mousePos.x * 0.35,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="cursor-pointer group animate-float"
            >
              <VanterFlacon size="lg" />

              {/* Floating Batch Badge */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-fit px-4 py-1.5 bg-black/85 backdrop-blur-md border border-gold/40 text-[9px] uppercase tracking-[0.3em] text-gold font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                N°01 NOIR ABSOLU • FLACON N° 148/500
              </div>
            </motion.div>
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2"
          >
            <Link to="/collection">
              <Button variant="outline" size="lg" magnetic withArrow>
                Discover the Collection
              </Button>
            </Link>

            <Link to="/discover">
              <Button variant="text" size="md" withArrow>
                Find Your Olfactive Scent
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Row: Est. 2026 + Animated Scroll Indicator */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-taupe font-sans pt-4 sm:pt-6 border-t border-sand/15">
        <span className="hidden sm:inline">Crafted in Grasse • France</span>

        {/* Animated Scroll Indicator */}
        <div className="flex flex-col items-center mx-auto sm:mx-0">
          <span className="mb-1.5 text-[9px] tracking-[0.3em] text-gold/80">Scroll to Explore</span>
          <div className="w-[1px] h-7 bg-sand/30 relative overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-gold"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <span className="text-right">Pure Cold Maceration</span>
      </div>
    </section>
  );
};
