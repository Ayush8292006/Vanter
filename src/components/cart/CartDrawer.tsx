import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    giftWrap,
    setGiftWrap,
    subtotal,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-ivory text-charcoal z-50 shadow-2xl flex flex-col justify-between overflow-hidden border-l border-sand"
          >
            {/* Header */}
            <div className="p-6 border-b border-sand flex items-center justify-between bg-ivory/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="font-cinzel text-lg tracking-[0.25em] text-black">
                  YOUR BAG
                </span>
                <span className="text-xs font-sans text-taupe px-2 py-0.5 rounded-full bg-beige border border-sand">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:text-black hover:bg-beige transition-colors duration-200"
                aria-label="Close Cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-beige/80 border border-sand flex items-center justify-center mb-4 text-gold">
                    <Gift size={24} strokeWidth={1.25} />
                  </div>
                  <h3 className="font-serif text-2xl text-black mb-2 italic">
                    Your collection is currently empty
                  </h3>
                  <p className="font-sans text-xs text-taupe max-w-xs mb-8 leading-relaxed">
                    Explore our haute parfumerie anthology to discover an unforgettable olfactory signature.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-black text-ivory text-[11px] uppercase tracking-[0.25em] hover:bg-gold hover:text-black transition-colors"
                  >
                    Explore Fragrances
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-sand/50 group"
                  >
                    <Link
                      to={`/product/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="w-20 h-24 sm:w-24 sm:h-28 bg-beige/60 overflow-hidden flex-shrink-0 border border-sand block"
                    >
                      <img
                        src={item.product.images.primary}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] tracking-[0.3em] font-sans text-taupe uppercase">
                              {item.product.number}
                            </span>
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-lg text-black hover:text-gold block leading-tight mt-0.5"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-taupe hover:text-red-700 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="text-[11px] text-taupe font-sans mt-1">
                          Flacon Size: <span className="text-black font-medium">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-sand bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-beige transition-colors text-charcoal"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-sans font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-beige transition-colors text-charcoal"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-serif text-base text-black font-medium">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-beige/60 border-t border-sand space-y-4">
                {/* Gift Wrap Toggle */}
                <div
                  onClick={() => setGiftWrap(!giftWrap)}
                  className="flex items-center justify-between p-3 bg-ivory border border-sand/70 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <Gift size={16} className="text-gold flex-shrink-0" />
                    <div>
                      <p className="text-xs font-sans font-medium text-black">
                        Maison Signature Gift Presentation
                      </p>
                      <p className="text-[10px] text-taupe">
                        Black linen box, satin ribbon & hand-sealed wax crest
                      </p>
                    </div>
                  </div>
                  <span
                    className={`w-5 h-5 flex items-center justify-center border text-[11px] ${
                      giftWrap
                        ? 'border-gold bg-gold text-black font-bold'
                        : 'border-sand bg-white text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </div>

                {/* Subtotal */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs text-taupe font-sans">
                    <span>Subtotal</span>
                    <span className="text-black font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-taupe font-sans">
                    <span>Maison Express Courier</span>
                    <span className="text-gold font-medium uppercase text-[10px] tracking-wider">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif text-black pt-2 border-t border-sand/60">
                    <span>Estimated Total</span>
                    <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    alert('Order confirmed! In this prototype, our concierge has reserved your flacon.');
                    setIsCartOpen(false);
                  }}
                  className="w-full py-4 bg-black text-ivory text-xs uppercase tracking-[0.25em] font-sans hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-center text-taupe flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-gold" />
                  <span>Guaranteed authentic • Sealed in Grasse & numbered</span>
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

