import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data/products';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t: Testimonial = TESTIMONIALS[current];

  return (
    <section className="bg-beige text-charcoal py-24 sm:py-36 px-6 lg:px-12 border-b border-sand overflow-hidden select-none">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="w-16 h-16 mx-auto mb-8 text-gold/30 flex items-center justify-center">
          <Quote size={48} strokeWidth={1} />
        </div>

        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-1 text-gold">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-black leading-snug max-w-3xl mx-auto px-4">
                "{t.quote}"
              </blockquote>

              <div className="space-y-1 pt-2">
                <p className="text-xs uppercase font-sans tracking-[0.25em] text-black font-semibold">
                  {t.author}
                </p>
                <p className="text-[11px] font-sans text-taupe">
                  {t.title} • {t.location}
                </p>
                <span className="inline-block mt-1 text-[10px] uppercase font-sans tracking-[0.3em] text-gold border border-gold/40 px-2 py-0.5">
                  Wearing: {t.fragrance}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-sand bg-ivory text-black hover:border-gold hover:text-gold transition-colors flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            aria-label="Previous Quote"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  current === i ? 'w-8 bg-gold' : 'w-2 bg-sand hover:bg-taupe'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-sand bg-ivory text-black hover:border-gold hover:text-gold transition-colors flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            aria-label="Next Quote"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
