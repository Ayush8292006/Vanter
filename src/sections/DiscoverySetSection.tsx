import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DISCOVERY_COFFRET, formatPrice } from '../data/products';
import { Button } from '../components/common/Button';
import { Check, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const DiscoverySetSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleAddDiscovery = () => {
    const dummyProduct = {
      id: DISCOVERY_COFFRET.id,
      number: DISCOVERY_COFFRET.number,
      name: DISCOVERY_COFFRET.name,
      slug: DISCOVERY_COFFRET.slug,
      tagline: DISCOVERY_COFFRET.subtitle,
      shortDescription: DISCOVERY_COFFRET.subtitle,
      fullDescription: DISCOVERY_COFFRET.description,
      gender: 'Unisex' as const,
      family: 'Woody' as const,
      price100ml: DISCOVERY_COFFRET.price,
      mood: 'Gold & Black Linen Luxury',
      moodTint: '#C9A45C',
      gradient: 'from-black to-charcoal',
      notes: { top: [], heart: [], base: [] },
      keyNotes: ['Six 5ml Signature Flacons', 'Blotters', 'Maison Certificate'],
      images: {
        primary: DISCOVERY_COFFRET.image,
        secondary: DISCOVERY_COFFRET.image,
      },
      concentration: 'Extrait Anthology',
      maceration: '48h Matured',
      origin: 'Grasse, France',
      rating: 4.98,
      reviewsCount: 114,
    };

    addToCart(dummyProduct, '100ml', 1);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="bg-[#0B0B0B] text-ivory py-24 sm:py-36 px-6 lg:px-12 border-b border-sand/20 relative overflow-hidden select-none"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            animate={{
              rotateX: -mousePos.y,
              rotateY: mousePos.x,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full max-w-lg aspect-[4/3] sm:aspect-square bg-charcoal border border-gold/40 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden group"
          >
            <img
              src={DISCOVERY_COFFRET.image}
              alt={DISCOVERY_COFFRET.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/85 text-gold border border-gold/60 text-[9px] uppercase tracking-[0.3em] font-sans flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles size={12} />
              <span>Complimentary Atelier Engraving</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-ivory">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-sand block">
                  Limited Allocation
                </span>
                <span className="font-serif text-lg">Batch N° 26 Coffrets</span>
              </div>
              <span className="font-serif text-2xl text-gold font-semibold">
                {formatPrice(DISCOVERY_COFFRET.price)}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
              — 06 / THE INTRODUCTION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
              {DISCOVERY_COFFRET.name}
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-sand/90 mt-2">
              "{DISCOVERY_COFFRET.subtitle}"
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-taupe leading-relaxed">
            {DISCOVERY_COFFRET.description}
          </p>

          <div className="space-y-3 pt-2">
            {DISCOVERY_COFFRET.perks.map((perk: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-xs font-sans text-ivory/90">
                <div className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 border border-gold/40">
                  <Check size={12} strokeWidth={2.5} />
                </div>
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-sand/20">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold block mb-2">
              Includes 6 Miniature Extraits:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-sans text-taupe">
              {DISCOVERY_COFFRET.includes.map((item: string, idx: number) => (
                <div key={idx} className="p-2 bg-charcoal/60 border border-sand/20 text-ivory/80">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={handleAddDiscovery}
              withArrow
              className="w-full sm:w-auto"
            >
              Acquire Coffret — {formatPrice(DISCOVERY_COFFRET.price)}
            </Button>

            <Link
              to="/product/discovery-coffret"
              className="text-xs uppercase font-sans tracking-[0.25em] text-sand hover:text-gold transition-colors py-2"
            >
              View Coffret Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
