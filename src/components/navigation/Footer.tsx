import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { VMonogram } from '../brand/VMonogram';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-ivory pt-20 pb-12 border-t border-sand/20 relative overflow-hidden select-none">
      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <VMonogram size={700} watermark />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Tier: Brand Essence & Quick Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-sand/15">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans text-ivory">
                Haute Parfumerie Small Batches
              </h4>
              <p className="text-[11px] text-taupe mt-0.5">
                Each flacon is numbered and macerated for 48 hours cold.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans text-ivory">
                Complimentary White Glove Delivery
              </h4>
              <p className="text-[11px] text-taupe mt-0.5">
                Insured express courier in temperature-monitored presentation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans text-ivory">
                Atelier Grasse & Paris
              </h4>
              <p className="text-[11px] text-taupe mt-0.5">
                Rooted in 300 years of French fragrance heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Tier: 4 Columns Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
              Collection
            </h5>
            <ul className="space-y-2.5 text-xs text-taupe font-sans">
              <li>
                <Link to="/collection" className="hover:text-ivory transition-colors">
                  All Eaux de Parfum
                </Link>
              </li>
              <li>
                <Link to="/collection?category=unisex" className="hover:text-ivory transition-colors">
                  Unisex Extraits
                </Link>
              </li>
              <li>
                <Link to="/collection?category=her" className="hover:text-ivory transition-colors">
                  Pour Elle
                </Link>
              </li>
              <li>
                <Link to="/collection?category=him" className="hover:text-ivory transition-colors">
                  Pour Lui
                </Link>
              </li>
              <li>
                <Link to="/product/discovery-coffret" className="hover:text-gold transition-colors">
                  The Discovery Coffret
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: The House */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
              The House
            </h5>
            <ul className="space-y-2.5 text-xs text-taupe font-sans">
              <li>
                <Link to="/about" className="hover:text-ivory transition-colors">
                  Maison Story & Roots
                </Link>
              </li>
              <li>
                <a href="#craft" className="hover:text-ivory transition-colors">
                  The 4 Pillars of Craft
                </a>
              </li>
              <li>
                <a href="#pyramid" className="hover:text-ivory transition-colors">
                  Olfactive Pyramid
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-ivory transition-colors">
                  The Gazette Journal
                </a>
              </li>
              <li>
                <Link to="/about#sustainability" className="hover:text-ivory transition-colors">
                  Sustainable Botanical Harvest
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Concierge */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-xs text-taupe font-sans">
              <li>
                <Link to="/contact" className="hover:text-ivory transition-colors">
                  Private Scent Consultation
                </Link>
              </li>
              <li>
                <span className="hover:text-ivory transition-colors cursor-pointer">
                  Complimentary Gift Boxing
                </span>
              </li>
              <li>
                <span className="hover:text-ivory transition-colors cursor-pointer">
                  Dispatch & Courier Times
                </span>
              </li>
              <li>
                <span className="hover:text-ivory transition-colors cursor-pointer">
                  Batch Authentication Check
                </span>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ivory transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier & Boutiques */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
              Atelier & Salons
            </h5>
            <p className="text-xs text-taupe leading-relaxed font-sans">
              14 Rue de Castiglione, 75001 Paris<br />
              Atelier Grasse: Boulevard Fragonard
            </p>
            <div className="pt-2 text-xs text-taupe space-y-1.5 font-sans">
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-gold" />
                <span>concierge@vanter.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-gold" />
                <span>+33 1 42 68 55 00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Floating Row */}
        <div className="flex items-center justify-between py-8 border-t border-sand/15">
          <div className="flex items-center gap-3">
            <VMonogram size={24} />
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-taupe">
              PARFUMS D'EXCEPTION • EST. 2026
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-taupe hover:text-gold transition-colors duration-300 group cursor-pointer"
          >
            <span>Back to Summit</span>
            <span className="w-7 h-7 rounded-full border border-sand/40 flex items-center justify-center group-hover:border-gold group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>

        {/* HUGE VANTÉR OUTLINED WORDMARK */}
        <div className="py-8 text-center overflow-hidden">
          <h2
            className="font-cinzel text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] tracking-[0.25em] text-transparent leading-none"
            style={{
              WebkitTextStroke: '1px rgba(201, 164, 92, 0.35)',
              textIndent: '0.25em',
            }}
          >
            VANTÉR
          </h2>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-taupe/80 font-sans tracking-wider">
          <p>© 2026 VANTÉR Maison de Parfum. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-ivory cursor-pointer">Privacy Charter</span>
            <span className="hover:text-ivory cursor-pointer">Terms of Maison</span>
            <span className="hover:text-ivory cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

