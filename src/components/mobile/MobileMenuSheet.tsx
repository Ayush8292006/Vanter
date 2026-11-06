import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Sparkles, MessageSquare, Feather, Award, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VMonogram } from '../brand/VMonogram';
import { VWordmark } from '../brand/VWordmark';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({ isOpen, onClose }) => {
  const menuSections = [
    {
      title: 'Maison Heritage',
      items: [
        { label: 'The House & Founder Story', path: '/about', icon: Award },
        { label: 'The 4 Pillars of Craft', path: '/#craft', icon: Sparkles },
        { label: 'The Gazette & Editorial Journal', path: '/#journal', icon: BookOpen },
      ],
    },
    {
      title: 'Bespoke Services',
      items: [
        { label: 'Private Scent Consultation', path: '/contact', icon: Feather },
        { label: 'Fragrance Discovery Coffret', path: '/product/discovery-coffret', icon: Heart },
        { label: 'Atelier Concierge & Salons', path: '/contact', icon: PhoneCall },
      ],
    },
    {
      title: 'Client Assurance',
      items: [
        { label: 'Small-Batch Authenticity Check', path: '/about#authenticity', icon: ShieldCheck },
        { label: 'White-Glove Delivery & Returns', path: '/contact', icon: MessageSquare },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-[#0B0B0B] text-ivory flex flex-col justify-between overflow-hidden"
        >
          {/* Top Bar */}
          <div className="h-16 px-5 border-b border-sand/20 flex items-center justify-between bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <VMonogram size={22} />
              <VWordmark size="sm" color="gold" />
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-taupe hover:text-ivory active:scale-95 transition-transform"
              aria-label="Close Menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            {menuSections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-2">
                <h4 className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold px-2">
                  {sec.title}
                </h4>
                <div className="bg-charcoal/60 rounded-xl border border-sand/15 overflow-hidden divide-y divide-sand/10">
                  {sec.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={itemIdx}
                        to={item.path}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 active:bg-sand/10 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-lg bg-black/60 border border-sand/20 flex items-center justify-center text-gold">
                            <Icon size={16} strokeWidth={1.25} />
                          </div>
                          <span className="font-serif text-base text-ivory">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-taupe" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Concierge Contact Card */}
            <div className="p-5 bg-gradient-to-br from-charcoal/90 to-black rounded-xl border border-gold/30 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-sans">
                  Private Salon Booking
                </span>
                <h5 className="font-serif text-lg text-ivory mt-1">
                  Experience VANTÉR in Person
                </h5>
                <p className="text-xs text-taupe mt-1 leading-relaxed">
                  Book a private 45-minute bespoke olfactory fitting with our resident master nose.
                </p>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="mt-4 inline-block px-4 py-2.5 bg-gold text-black text-[10px] uppercase tracking-[0.25em] font-sans font-semibold rounded-lg"
                >
                  Reserve Consultation
                </Link>
              </div>
            </div>

            {/* Compact Footer for Mobile */}
            <div className="pt-6 pb-12 text-center border-t border-sand/15 space-y-3">
              <VMonogram size={36} watermark className="mx-auto" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe font-sans">
                VANTÉR • Maison de Haute Parfumerie
              </p>
              <p className="text-[10px] text-taupe/60">
                Paris • Grasse • Worldwide Express Dispatch
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

