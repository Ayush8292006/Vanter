import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { VMonogram } from '../components/brand/VMonogram';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0B0B0B] text-ivory py-24 sm:py-32 px-6 lg:px-12 border-b border-sand/20 relative overflow-hidden select-none">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-block mb-6">
          <VMonogram size={38} />
        </div>

        <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-gold block mb-2">
          THE CIRCLE OF VANTÉR
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
          Join the <span className="italic font-normal text-gold">Maison</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-taupe mt-3 max-w-md mx-auto leading-relaxed">
          Receive confidential notice of new seasonal harvests, numbered batch releases, and private invitations to salon fittings.
        </p>

        {/* Input Form */}
        <div className="mt-10 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex items-center border-b border-sand/40 focus-within:border-gold transition-colors duration-300 pb-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory placeholder-taupe/40 focus:outline-none pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-gold hover:text-white transition-colors p-1"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-charcoal/80 border border-gold/40 text-center flex items-center justify-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <span className="font-serif text-base text-gold">
                  Bienvenue. You are now inscribed in the Maison ledger.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-taupe/60 font-sans tracking-wider mt-3">
            We honor silence. No redundant correspondence; unsubscribe at any moment.
          </p>
        </div>
      </div>
    </section>
  );
};

