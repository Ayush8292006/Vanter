import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { VMonogram } from '../components/brand/VMonogram';
import { VWordmark } from '../components/brand/VWordmark';
import { Sparkles, Award, Shield, Feather, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const isMobile = useIsMobile();

  const timelineMilestones = [
    {
      year: '1984',
      title: 'The Grasse Sanctuary',
      desc: 'Our botanical heritage begins in the hills above Grasse, where three generations of perfumers cultivated centenary Rose Centifolia and Jasmine Grandiflorum.',
    },
    {
      year: '2012',
      title: 'The Raw Terroir Expedition',
      desc: 'Years spent securing exclusive multi-decade harvesting rights to private wild agarwood forests in Assam and sandalwood sanctuaries in Karnataka.',
    },
    {
      year: '2024',
      title: 'The Sub-Zero Cellar Protocol',
      desc: 'Development of our proprietary 48-hour cold maceration technique, preserving volatile terpenes that standard thermal extraction destroys.',
    },
    {
      year: '2026',
      title: 'The Inscription of VANTÉR',
      desc: 'The official unveiling of Maison VANTÉR: an unhurried, discreet luxury house dedicated to the art of invisible elegance.',
    },
  ];

  const content = (
    <div className="py-16 sm:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto select-none">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-block mb-6">
          <VMonogram size={48} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
          MAISON HERITAGE & ORIGIN
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ivory font-light leading-tight">
          The Sanctuary of <span className="italic font-normal text-gold">Silence</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-taupe mt-4 leading-relaxed max-w-xl mx-auto">
          We do not engineer perfumes for passing seasons or algorithmic trends. We compose liquid artifacts destined to linger in personal memory for decades.
        </p>
      </div>

      {/* Editorial Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
        <div className="lg:col-span-6 relative aspect-[4/5] bg-charcoal overflow-hidden border border-sand/30 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
            alt="Maison VANTÉR Founder & Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-ivory">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
              Grasse • Laboratory N° 04
            </span>
            <p className="font-serif italic text-lg mt-1">
              "Perfume is the most intimate architecture in existence."
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-light leading-snug">
            Quiet luxury is not the absence of power; it is its absolute refinement.
          </h2>
          <div className="space-y-4 font-sans text-xs sm:text-sm text-taupe leading-relaxed">
            <p>
              In a culture dominated by instant sensory gratification, VANTÉR exists as a quiet sanctuary. We harvest botanicals during their single peak hour of diurnal maturity. We refuse synthetic stabilizers, allowing our oils to breathe and age naturally in dark crystal demijohns.
            </p>
            <p>
              Every flacon is an invitation into a slower, more deliberate sensory reality. When you wear VANTÉR, you do not impose your presence upon a room; you alter its memory.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-sand/20">
            <div>
              <span className="font-serif text-3xl text-gold font-light">100%</span>
              <p className="text-[11px] text-taupe font-sans uppercase tracking-wider mt-1">
                Small-Batch Allocation
              </p>
            </div>
            <div>
              <span className="font-serif text-3xl text-gold font-light">48h</span>
              <p className="text-[11px] text-taupe font-sans uppercase tracking-wider mt-1">
                Cold Thermal Maceration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maison Timeline */}
      <div className="mb-28 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-2">
            CHRONOLOGY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
            The Timeline of Savoir-Faire
          </h2>
        </div>

        <div className="relative border-l border-gold/40 pl-8 ml-4 sm:ml-12 space-y-12">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-gold flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>

              <span className="text-xs font-sans uppercase tracking-widest text-gold font-semibold block mb-1">
                {item.year}
              </span>
              <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-taupe mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Ethical Harvest Core Values */}
      <div id="sustainability" className="p-8 sm:p-14 bg-charcoal/60 border border-sand/25">
        <div className="max-w-2xl mb-10">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-2">
            CONSCIOUS EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
            The Three Ethical Covenants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <Award size={18} />
            </div>
            <h4 className="font-serif text-xl text-ivory">Botanical Lineage</h4>
            <p className="font-sans text-xs text-taupe leading-relaxed">
              We replant three wild Aquilaria trees in Assam for every liter of oud resin distilled.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <Shield size={18} />
            </div>
            <h4 className="font-serif text-xl text-ivory">Zero Accelerated Aging</h4>
            <p className="font-sans text-xs text-taupe leading-relaxed">
              Never artificially heated or chemically catalyzed. Time is our irreplaceable ingredient.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <Feather size={18} />
            </div>
            <h4 className="font-serif text-xl text-ivory">Handcrafted Flacons</h4>
            <p className="font-sans text-xs text-taupe leading-relaxed">
              Weighted French crystal flacons designed to be refilled at our salons in Paris and Grasse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="The House">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

