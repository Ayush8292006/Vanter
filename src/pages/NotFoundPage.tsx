import React from 'react';
import { Link } from 'react-router-dom';
import { VMonogram } from '../components/brand/VMonogram';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-ivory flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative mb-6">
        <VMonogram size={72} />
        <div className="absolute inset-0 bg-gold/10 rounded-full blur-2xl" />
      </div>

      <span className="text-[11px] uppercase font-sans tracking-[0.35em] text-gold block mb-2">
        ERROR 404 • DISSIPATED
      </span>

      <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-light mb-4">
        This scent has <span className="italic font-normal text-gold">evaporated</span>.
      </h1>

      <p className="font-sans text-xs sm:text-sm text-taupe max-w-md mx-auto mb-8 leading-relaxed">
        The formulation you requested no longer resides in our active ledger, or has quietly drifted into the atmosphere.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black text-xs uppercase font-sans tracking-[0.25em] font-semibold hover:bg-gold-light transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Return to the Maison</span>
      </Link>
    </div>
  );
};

