import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, closeToast, lastAddedItem } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-[calc(100%-2rem)] bg-[#111111]/95 text-ivory border border-gold/40 shadow-2xl backdrop-blur-md p-4 rounded-none"
        >
          <div className="flex items-center gap-3">
            {lastAddedItem ? (
              <div className="w-11 h-14 bg-charcoal flex-shrink-0 overflow-hidden border border-sand/30">
                <img
                  src={lastAddedItem.product.images.primary}
                  alt={lastAddedItem.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 text-gold border border-gold/40">
                <Check size={16} strokeWidth={2} />
              </div>
            )}

            <div className="flex-1 min-w-0 pr-2">
              <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold flex items-center gap-1.5">
                <Check size={12} strokeWidth={2.5} />
                <span>Collection Updated</span>
              </p>
              <p className="text-xs font-serif text-ivory truncate mt-0.5">
                {toastMessage}
              </p>
            </div>

            <button
              onClick={closeToast}
              className="text-taupe hover:text-ivory transition-colors p-1"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

