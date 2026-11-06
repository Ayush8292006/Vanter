import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, formatPrice } from '../data/products';
import { Product } from '../types';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface QuizState {
  mood: string | null;
  moment: string | null;
  notes: string | null;
}

export const ScentQuizSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>({
    mood: null,
    moment: null,
    notes: null,
  });
  const [recommendation, setRecommendation] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const questions = [
    {
      id: 'mood',
      title: 'What emotional presence do you wish to inhabit?',
      subtitle: 'The aura your fragrance radiates before you speak.',
      options: [
        { label: 'Fresh & Aristocratic Clarity', value: 'fresh', desc: 'Crisp citrus, mountain tea, and dew-kissed minerals.' },
        { label: 'Warm, Golden & Enveloping', value: 'warm', desc: 'Saffron threads, bourbon vanilla, and solar amber.' },
        { label: 'Nocturnal, Smoky & Magnetic', value: 'dark', desc: 'Assam wild oud, smoked leather, and sacred resins.' },
        { label: 'Sensual Velvet & White Petals', value: 'floral', desc: 'May roses, jasmine sambac, and skin cashmere.' },
      ],
    },
    {
      id: 'moment',
      title: 'When will this signature accompany you?',
      subtitle: 'The atmosphere in which your sillage will bloom.',
      options: [
        { label: 'Sunlit Daily Rituals', value: 'day', desc: 'Clean, understated poise from breakfast to boardroom.' },
        { label: 'Intimate Evenings & Dinners', value: 'evening', desc: 'Close-quarters magnetism that invites lingering.' },
        { label: 'Monumental Occasions', value: 'special', desc: 'Unapologetic grandeur that leaves an indelible memory.' },
      ],
    },
    {
      id: 'notes',
      title: 'Which olfactive texture speaks directly to your skin?',
      subtitle: 'The primary botanical family you instinctually gravitate towards.',
      options: [
        { label: 'Precious Woods & Smoked Resins', value: 'woody', desc: 'Sandalwood, cedar atlas, wild agarwood.' },
        { label: 'Blooming Petals Drenched in Dawn Dew', value: 'floral', desc: 'Rose de Mai, jasmine sambac, tuberose.' },
        { label: 'Warm Spices & Bourbon Resins', value: 'amber', desc: 'Cardamom, cinnamon, vanilla pods, amber.' },
        { label: 'High-Altitude Teas & Sparkling Citrus', value: 'fresh', desc: 'Silver needle tea, Calabrian bergamot, vetiver.' },
      ],
    },
  ];

  const handleSelectOption = (value: string) => {
    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateRecommendation(newAnswers);
    }
  };

  const calculateRecommendation = (finalAnswers: QuizState) => {
    if (finalAnswers.mood === 'dark' || finalAnswers.notes === 'woody') {
      setRecommendation(PRODUCTS[0]);
    } else if (finalAnswers.mood === 'warm' || finalAnswers.notes === 'amber') {
      setRecommendation(PRODUCTS[1]);
    } else if (finalAnswers.notes === 'fresh' || finalAnswers.mood === 'fresh') {
      setRecommendation(PRODUCTS[4]);
    } else if (finalAnswers.mood === 'floral' || finalAnswers.notes === 'floral') {
      setRecommendation(PRODUCTS[3]);
    } else {
      setRecommendation(PRODUCTS[2]);
    }
    setStep(3);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ mood: null, moment: null, notes: null });
    setRecommendation(null);
  };

  return (
    <section id="quiz" className="bg-ivory text-charcoal py-24 sm:py-36 px-6 lg:px-12 border-b border-sand overflow-hidden select-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
            — 07 / BESPOKE CONSULTATION
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-tight">
            Find Your <span className="italic font-normal text-gold">Olfactive Signature</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-taupe mt-3 max-w-lg mx-auto">
            Answer three intuitive inquiries. Our atelier algorithm will determine your harmonious flacon.
          </p>
        </div>

        <div className="bg-beige/70 border border-sand p-6 sm:p-12 shadow-xl relative min-h-[440px] flex flex-col justify-between">
          {step < 3 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand/60">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold">
                Inquiry 0{step + 1} of 03
              </span>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= i ? 'w-8 bg-gold' : 'w-3 bg-sand'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step < 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-black leading-snug">
                    {questions[step].title}
                  </h3>
                  <p className="font-sans text-xs text-taupe mt-1">
                    {questions[step].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt.value)}
                      className="text-left p-5 bg-ivory border border-sand hover:border-gold hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-serif text-lg text-black group-hover:text-gold transition-colors">
                          {opt.label}
                        </h4>
                        <p className="font-sans text-xs text-taupe mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-end text-[10px] uppercase font-sans tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Select</span>
                        <ArrowRight size={12} className="ml-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : recommendation ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-5 relative aspect-[3/4] bg-ivory overflow-hidden border border-sand">
                  <img
                    src={recommendation.images.primary}
                    alt={recommendation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black text-gold text-[9px] uppercase tracking-widest font-sans">
                    Optimal Resonance
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block">
                      YOUR HARMONIC SIGNATURE
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-black mt-1">
                      {recommendation.number} {recommendation.name}
                    </h3>
                    <p className="font-serif italic text-sm text-taupe mt-1">
                      "{recommendation.tagline}"
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-charcoal leading-relaxed">
                    {recommendation.shortDescription}
                  </p>

                  <div className="p-3 bg-ivory border border-sand/70 text-xs text-charcoal font-sans space-y-1">
                    <span className="text-[9px] uppercase font-sans tracking-widest text-taupe block">
                      Dominant Terroir Notes
                    </span>
                    <p className="font-medium text-black">
                      {recommendation.keyNotes.join(' • ')}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => addToCart(recommendation, '100ml', 1)}
                      className="px-6 py-3.5 bg-black text-ivory text-xs uppercase font-sans tracking-[0.25em] hover:bg-gold hover:text-black transition-colors"
                    >
                      Add to Collection — {formatPrice(recommendation.price100ml)}
                    </button>

                    <Link
                      to={`/product/${recommendation.slug}`}
                      className="px-5 py-3.5 border border-sand bg-ivory text-xs uppercase font-sans tracking-[0.2em] text-charcoal hover:border-black text-center transition-colors"
                    >
                      Explore Formula
                    </Link>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-1.5 text-[10px] uppercase font-sans tracking-[0.25em] text-taupe hover:text-black transition-colors pt-2"
                  >
                    <RotateCcw size={12} />
                    <span>Retake Consultation</span>
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
