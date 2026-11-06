import React, { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { VMonogram } from '../components/brand/VMonogram';
import { MapPin, Mail, Phone, Clock, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Consultation Appointment',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const content = (
    <div className="py-16 sm:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-2">
          CLIENT CONCIERGE & SALONS
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-light leading-tight">
          Private <span className="italic font-normal text-gold">Consultation</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-taupe mt-3 leading-relaxed">
          Request an appointment for a bespoke olfactory fitting, inquire regarding custom private batch orders, or speak directly with our concierge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Elegant Booking Form */}
        <div className="lg:col-span-7 bg-charcoal/60 border border-sand/25 p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-serif text-2xl text-ivory mb-1">
                    Send an Inquiry to the Master Concierge
                  </h3>
                  <p className="text-xs font-sans text-taupe">
                    Our team responds within 24 hours via personal letter or phone.
                  </p>
                </div>

                {/* Name */}
                <div className="relative border-b border-sand/40 focus-within:border-gold transition-colors pb-2">
                  <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Madame / Monsieur..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory placeholder-taupe/40 focus:outline-none"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative border-b border-sand/40 focus-within:border-gold transition-colors pb-2">
                    <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory placeholder-taupe/40 focus:outline-none"
                    />
                  </div>

                  <div className="relative border-b border-sand/40 focus-within:border-gold transition-colors pb-2">
                    <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-1">
                      Contact Telephone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 / +33..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory placeholder-taupe/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="relative border-b border-sand/40 focus-within:border-gold transition-colors pb-2">
                  <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-1">
                    Inquiry Intent
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory focus:outline-none cursor-pointer"
                  >
                    <option value="Consultation Appointment" className="bg-charcoal text-ivory">
                      Private Olfactive Consultation (45 Min)
                    </option>
                    <option value="Custom Batch Inquiry" className="bg-charcoal text-ivory">
                      Bespoke Private Flacon Inscription
                    </option>
                    <option value="Order & Courier Status" className="bg-charcoal text-ivory">
                      Order Courier & Authentication Verification
                    </option>
                    <option value="Press & Archival" className="bg-charcoal text-ivory">
                      Press & Architectural Salon Access
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative border-b border-sand/40 focus-within:border-gold transition-colors pb-2">
                  <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-1">
                    Personal Note / Preferred Timing
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify your preferred date, fragrance inclinations, or requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-serif text-ivory placeholder-taupe/40 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-black text-xs uppercase font-sans tracking-[0.25em] font-semibold hover:bg-gold-light transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Transmit Reservation Request</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold text-gold mx-auto flex items-center justify-center">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h3 className="font-serif text-3xl text-ivory">
                  Your Request is Recorded
                </h3>
                <p className="font-sans text-xs sm:text-sm text-sand/80 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our master concierge has received your transmission and will confirm your appointment details via confidential correspondence shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-black border border-sand/40 text-xs font-sans uppercase tracking-widest text-ivory hover:border-gold transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Salons, Hours & Direct Contact */}
        <div className="lg:col-span-5 space-y-8">
          {/* Paris Salon Card */}
          <div className="p-6 bg-charcoal/40 border border-sand/20 space-y-3">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
              FLAGSHIP SALON
            </span>
            <h4 className="font-serif text-2xl text-ivory">Paris Boutique</h4>
            <p className="text-xs font-sans text-taupe leading-relaxed">
              14 Rue de Castiglione, 75001 Paris, France<br />
              Open Monday through Saturday, 10:30 — 19:30
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans text-sand">
              <Phone size={13} className="text-gold" />
              <span>+33 1 42 68 55 00</span>
            </div>
          </div>

          {/* Grasse Atelier Card */}
          <div className="p-6 bg-charcoal/40 border border-sand/20 space-y-3">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
              BOTANICAL LABORATORY
            </span>
            <h4 className="font-serif text-2xl text-ivory">Atelier Grasse</h4>
            <p className="text-xs font-sans text-taupe leading-relaxed">
              Boulevard Fragonard, 06130 Grasse, France<br />
              Private appointments only by reservation
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans text-sand">
              <Mail size={13} className="text-gold" />
              <span>atelier@vanter.com</span>
            </div>
          </div>

          {/* Direct Concierge WhatsApp */}
          <div className="p-6 bg-gradient-to-br from-charcoal/80 to-black border border-gold/30 space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
              INSTANT ASSISTANCE
            </span>
            <h4 className="font-serif text-xl text-ivory">WhatsApp Concierge</h4>
            <p className="text-xs font-sans text-taupe">
              Direct text concierge for order dispatch inquiries and scent matching.
            </p>
            <a
              href="https://wa.me/33142685500"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs uppercase font-sans tracking-widest text-gold hover:text-white transition-colors"
            >
              <MessageSquare size={14} />
              <span>Initiate WhatsApp Fitting</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="Contact">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

