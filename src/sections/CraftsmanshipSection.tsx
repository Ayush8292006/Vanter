import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CRAFTSMANSHIP_STEPS } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="craft" className="bg-ivory text-charcoal py-24 sm:py-36 px-6 lg:px-12 border-b border-sand overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
            — 04 / SAVOIR-FAIRE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-tight">
            The Architecture of <span className="italic font-normal text-gold">Perfection</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-taupe mt-3 leading-relaxed">
            True luxury cannot be hurried. From remote botanical sanctuaries to hand-sealed flacons in Grasse, explore the four uncompromised stages of our craft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] bg-beige overflow-hidden border border-sand shadow-2xl">
              {CRAFTSMANSHIP_STEPS.map((step, idx: number) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: activeStep === idx ? 1 : 0,
                    scale: activeStep === idx ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-ivory">
                    <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-1">
                      Pillar {step.step} / 04
                    </span>
                    <h4 className="font-serif text-2xl text-ivory">{step.title}</h4>
                    <p className="font-sans text-xs text-sand/80 mt-1">{step.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8 relative">
            <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-sand/60 hidden sm:block" />

            {CRAFTSMANSHIP_STEPS.map((step, idx: number) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 transition-all duration-500 cursor-pointer border rounded-none relative sm:pl-16 ${
                    isActive
                      ? 'bg-beige/90 border-gold shadow-lg translate-x-1 sm:translate-x-2'
                      : 'bg-ivory border-sand/40 hover:border-sand hover:bg-beige/40'
                  }`}
                >
                  <div
                    className={`hidden sm:flex absolute left-4 top-8 w-4 h-4 rounded-full border items-center justify-center -translate-x-1/2 transition-colors ${
                      isActive ? 'border-gold bg-gold text-black' : 'border-sand bg-ivory text-transparent'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs uppercase font-sans tracking-[0.3em] font-semibold transition-colors ${
                        isActive ? 'text-gold' : 'text-taupe'
                      }`}
                    >
                      Step {step.step}
                    </span>
                    <span className="text-[10px] uppercase font-sans text-taupe tracking-wider">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-2xl sm:text-3xl transition-colors ${
                      isActive ? 'text-black' : 'text-charcoal/70'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`font-sans text-xs sm:text-sm mt-3 leading-relaxed transition-colors ${
                      isActive ? 'text-charcoal' : 'text-taupe'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
