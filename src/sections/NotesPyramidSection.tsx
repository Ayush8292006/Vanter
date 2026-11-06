import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { NoteItem, Product } from '../types';
import { Sparkles, MapPin, Info } from 'lucide-react';

export const NotesPyramidSection: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [hoveredNote, setHoveredNote] = useState<NoteItem | null>(null);

  const product = PRODUCTS[selectedProductIndex];

  return (
    <section id="pyramid" className="bg-[#0B0B0B] text-ivory py-24 sm:py-36 px-6 lg:px-12 border-b border-sand/20 relative overflow-hidden select-none">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: product.moodTint }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
            — 03 / THE ALCHEMY
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
            Anatomy of a <span className="italic font-normal text-gold">Scent</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-taupe mt-3 leading-relaxed">
            Every VANTÉR creation evolves across three distinct olfactive dimensions as warmth, oxygen, and your skin chemistry unfold.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-6 mb-12 scrollbar-none">
          {PRODUCTS.map((p: Product, idx: number) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductIndex(idx);
                setHoveredNote(null);
              }}
              className={`px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 rounded-none whitespace-nowrap border ${
                selectedProductIndex === idx
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-sand/20 bg-charcoal/40 text-taupe hover:border-gold/50 hover:text-ivory'
              }`}
            >
              {p.number} {p.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex flex-col items-center text-center p-8 bg-charcoal/40 border border-sand/20 relative">
            <div className="w-48 h-64 sm:w-56 sm:h-72 overflow-hidden mb-6 relative">
              <img
                src={product.images.primary}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
              />
            </div>

            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-1">
              {product.number} • {product.family}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
              {product.name}
            </h3>
            <p className="font-serif italic text-xs text-taupe mt-1 max-w-xs">
              "{product.tagline}"
            </p>

            <div className="mt-6 pt-6 border-t border-sand/20 w-full flex justify-around text-center text-xs font-sans">
              <div>
                <span className="text-taupe block text-[10px] uppercase tracking-wider">Concentration</span>
                <span className="text-ivory font-medium mt-0.5 block">{product.concentration}</span>
              </div>
              <div className="w-[1px] h-8 bg-sand/20" />
              <div>
                <span className="text-taupe block text-[10px] uppercase tracking-wider">Maceration</span>
                <span className="text-ivory font-medium mt-0.5 block">{product.maceration}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 bg-charcoal/60 border border-sand/25 hover:border-gold/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span>Crest / Head Notes (0 – 20 min)</span>
                </span>
                <span className="text-[10px] text-taupe font-sans">First Impression</span>
              </div>
              <p className="text-xs text-taupe mb-4 leading-relaxed">
                The immediate ethereal aura that greets the senses upon release; sparkling and fleeting.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.notes.top.map((note: NoteItem, i: number) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHoveredNote(note)}
                    onClick={() => setHoveredNote(note)}
                    className="px-3.5 py-1.5 bg-black/80 border border-sand/30 hover:border-gold text-xs text-ivory transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{note.name}</span>
                    {note.origin && (
                      <span className="text-[10px] text-gold/80 group-hover:text-gold">
                        ({note.origin})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-charcoal/60 border border-sand/25 hover:border-gold/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-light" />
                  <span>Heart / Cœur Notes (20 min – 4 hours)</span>
                </span>
                <span className="text-[10px] text-taupe font-sans">The True Character</span>
              </div>
              <p className="text-xs text-taupe mb-4 leading-relaxed">
                The emotional signature of the fragrance, carrying the floral or spice body as the top dissipates.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.notes.heart.map((note: NoteItem, i: number) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHoveredNote(note)}
                    onClick={() => setHoveredNote(note)}
                    className="px-3.5 py-1.5 bg-black/80 border border-sand/30 hover:border-gold text-xs text-ivory transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{note.name}</span>
                    {note.origin && (
                      <span className="text-[10px] text-gold/80 group-hover:text-gold">
                        ({note.origin})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-charcoal/60 border border-sand/25 hover:border-gold/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-dark" />
                  <span>Fond / Base Notes (4 – 24+ hours)</span>
                </span>
                <span className="text-[10px] text-taupe font-sans">The Lingering Sillage</span>
              </div>
              <p className="text-xs text-taupe mb-4 leading-relaxed">
                Heavy, rich botanical resins and ancient woods that bond intimately with your skin temperature.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.notes.base.map((note: NoteItem, i: number) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHoveredNote(note)}
                    onClick={() => setHoveredNote(note)}
                    className="px-3.5 py-1.5 bg-black/80 border border-sand/30 hover:border-gold text-xs text-ivory transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{note.name}</span>
                    {note.origin && (
                      <span className="text-[10px] text-gold/80 group-hover:text-gold">
                        ({note.origin})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {hoveredNote ? (
                <motion.div
                  key={hoveredNote.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 bg-gradient-to-r from-gold/15 to-transparent border-l-2 border-gold flex items-start gap-3"
                >
                  <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs uppercase font-sans tracking-wider text-ivory font-semibold">
                      {hoveredNote.name} — <span className="text-gold">{hoveredNote.origin}</span>
                    </h5>
                    <p className="text-xs text-sand/80 mt-1 leading-relaxed">
                      {hoveredNote.description}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="p-3 text-[11px] text-taupe/70 font-sans flex items-center gap-2 italic">
                  <Info size={13} />
                  <span>Hover or tap any botanical note above to reveal its geographic origin & terroir.</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
