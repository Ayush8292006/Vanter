import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VMonogram } from '../components/brand/VMonogram';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HouseStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={containerRef}
      className="relative bg-ivory text-charcoal py-24 sm:py-36 px-6 lg:px-16 overflow-hidden border-b border-sand select-none"
    >
      {/* Large faint V monogram watermark rotating in the background */}
      <motion.div
        style={{ rotate: watermarkRotate }}
        className="absolute -right-32 top-1/4 pointer-events-none opacity-[0.04] text-black"
      >
        <VMonogram size={850} watermark />
      </motion.div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Column: Tall Editorial Image with Clip-path Reveal & Parallax */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-beige border border-sand/80 shadow-xl group">
            <motion.div style={{ y: imgY }} className="w-full h-[115%] -mt-[7%]">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
                alt="VANTÉR Atelier in Grasse"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Corner Badge */}
            <div className="absolute bottom-5 left-5 bg-black/85 text-ivory px-4 py-2 text-[9px] uppercase tracking-[0.3em] font-sans border-l-2 border-gold backdrop-blur-sm">
              Atelier Grasse • N° 14
            </div>
          </div>

          {/* Overlapping small accent card */}
          <div className="hidden sm:block absolute -bottom-8 -right-8 w-44 p-4 bg-beige/95 border border-sand shadow-lg backdrop-blur-md">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-sans block mb-1">
              Savoir-Faire
            </span>
            <p className="font-serif italic text-xs text-charcoal">
              "To wear scent is to leave an indelible impression without uttering a syllable."
            </p>
          </div>
        </div>

        {/* Right Column: Editorial Text & Animated Counters */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
              — 01 / THE HOUSE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-[1.15]">
              Born from a Single Drop of <span className="italic font-normal text-gold">Obsession</span>.
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-taupe font-sans leading-relaxed max-w-2xl">
            <p>
              VANTÉR was founded with a singular conviction: fragrance should never be an accessory of noise. In an era of synthetic mass-production, our maison retreats to the patient rhythms of haute parfumerie. We compose extraits de parfum in deliberate, finite batches using botanical absolutes sourced directly from multi-generational farming families.
            </p>
            <p>
              From the high-altitude centifolia fields of Grasse to the deep agarwood reserves of Assam, every note in our anthology is aged with exacting precision. The result is an invisible second skin — magnetic, poetic, and unmistakably memorable.
            </p>
          </div>

          {/* 3 Metrics / Counters */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-sand">
            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black font-light block">
                12
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-taupe font-sans block mt-1">
                Rare Absolutes
              </span>
            </div>

            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black font-light block">
                48h
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-taupe font-sans block mt-1">
                Cold Maceration
              </span>
            </div>

            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black font-light block">
                100%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-taupe font-sans block mt-1">
                Small Batch
              </span>
            </div>
          </div>

          {/* Story Link */}
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-black hover:text-gold font-sans font-medium transition-colors group"
            >
              <span>Explore Our Heritage & Origins</span>
              <ArrowUpRight
                size={15}
                className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

