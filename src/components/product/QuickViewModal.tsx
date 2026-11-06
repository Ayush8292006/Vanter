import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { Product, FragranceSize } from '../../types';
import { calculatePriceBySize, formatPrice } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<FragranceSize>('100ml');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const currentPrice = calculatePriceBySize(product.price100ml, selectedSize);

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const sizes: FragranceSize[] = ['30ml', '50ml', '100ml'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 w-full max-w-3xl bg-ivory text-charcoal border border-sand shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-sand flex items-center justify-center text-charcoal hover:text-black hover:bg-gold transition-colors"
          >
            <X size={16} />
          </button>

          {/* Left Media */}
          <div className="relative aspect-[4/5] bg-beige overflow-hidden">
            <img
              src={product.images.primary}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/80 text-gold px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] font-sans">
              {product.number}
            </div>
          </div>

          {/* Right Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-taupe block mb-1">
                {product.family} • {product.gender}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-black">
                {product.name}
              </h3>
              <p className="font-serif italic text-sm text-taupe mt-1 mb-4">
                "{product.tagline}"
              </p>

              <div className="text-xl font-serif font-semibold text-black mb-6">
                {formatPrice(currentPrice)}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-2">
                  Select Flacon Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-sans uppercase tracking-wider border transition-all ${
                        selectedSize === s
                          ? 'border-gold bg-black text-ivory'
                          : 'border-sand bg-white text-charcoal hover:border-gold'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Notes summary */}
              <div className="mb-6 p-3 bg-beige/60 border border-sand/60">
                <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-taupe block mb-1">
                  Dominant Notes
                </span>
                <p className="text-xs text-charcoal font-sans">
                  {product.keyNotes.join(' • ')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-sand">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-black text-ivory text-xs uppercase tracking-[0.25em] font-sans hover:bg-gold hover:text-black transition-colors duration-300"
              >
                Add to Collection — {formatPrice(currentPrice)}
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full text-center text-[10px] uppercase font-sans tracking-[0.25em] text-taupe hover:text-black flex items-center justify-center gap-1.5 py-1"
              >
                <span>View Full Olfactive Ledger</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

