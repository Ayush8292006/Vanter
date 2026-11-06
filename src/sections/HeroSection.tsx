import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/common/Button';
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

  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] w-full bg-[#0B0B0B] text-ivory flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-12 select-none"
    >
      {/* Background Film Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial Gold Backlight behind the bottle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-gold/15 via-gold/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Top Tagline / Meta */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.35em] text-taupe font-sans">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Maison de Parfumerie</span>
        </span>
        <span className="hidden sm:inline">Paris • Grasse • Est. 2026</span>
        <span>Batch N° 26-B</span>
      </div>

      {/* Centerpiece: Split Headline & Floating Luxury Bottle */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10">
        {/* Split Headline around bottle */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative w-full flex flex-col items-center"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-gold font-sans mb-4"
          >
            — EXTRAIT DE PARFUM ANTHOLOGY —
          </motion.div>

          {/* Line 1: The Art of */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-ivory"
            >
              The Art of
            </motion.h1>
          </div>

          {/* Floating Luxury Flacon in the Center */}
          <div className="relative my-4 sm:-my-10 z-30 flex items-center justify-center">
            <motion.div
              style={{ scale: bottleScale, y: bottleY }}
              animate={{
                rotateX: -mousePos.y * 0.4,
                rotateY: mousePos.x * 0.4,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-56 h-72 sm:w-80 sm:h-96 md:w-96 md:h-[460px] flex items-center justify-center cursor-pointer group"
            >
              {/* Bottle Halo */}
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Perfume Bottle Image with shadow & depth */}
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85"
                alt="VANTÉR Noir Absolu Flacon"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] animate-float"
              />

              {/* Subtle Monogram Watermark Crest floating with the bottle */}
              <div className="absolute bottom-6 z-20 px-4 py-1.5 bg-black/70 backdrop-blur-md border border-gold/40 text-[9px] uppercase tracking-[0.3em] text-gold font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                N°01 NOIR ABSOLU
              </div>
            </motion.div>
          </div>

          {/* Line 2: Invisible Elegance */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-ivory"
            >
              <span className="italic font-normal text-gold-light pr-2">Invisible</span> Elegance
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 max-w-lg font-sans text-xs sm:text-sm text-taupe leading-relaxed tracking-wide px-4"
          >
            Eaux de Parfum composed in small batches with the world's rarest ingredients.
            A silent language of quiet luxury and sensual presence.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
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

      {/* Bottom Row: Est. 2026 + Scroll Indicator */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-taupe font-sans pt-6 border-t border-sand/15">
        <span className="hidden sm:inline">Crafted in Grasse • France</span>

        {/* Animated Scroll Indicator */}
        <div className="flex flex-col items-center mx-auto sm:mx-0">
          <span className="mb-2 text-[9px] tracking-[0.3em] text-gold/80">Scroll to Explore</span>
          <div className="w-[1px] h-8 bg-sand/30 relative overflow-hidden">
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

