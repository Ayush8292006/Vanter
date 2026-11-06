import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { Trash2, Plus, Minus, Gift, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BagPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { cart, removeFromCart, updateQuantity, giftWrap, setGiftWrap, subtotal, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Thank you for reserving your flacon with Maison VANTÉR. Our concierge will be in touch shortly.');
  };

  const content = (
    <div className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto select-none">
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-1">
          PERSONAL ALLOCATION
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory font-light">
          Your Collection <span className="italic font-normal text-gold">Bag</span>
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center max-w-sm mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-charcoal border border-sand/30 flex items-center justify-center mx-auto text-gold">
            <Gift size={24} />
          </div>
          <h3 className="font-serif text-2xl text-ivory">Your bag is empty</h3>
          <p className="font-sans text-xs text-taupe">
            Select a signature extrait or discovery coffret to begin.
          </p>
          <Link
            to="/collection"
            className="inline-block mt-4 px-6 py-3 bg-gold text-black text-xs uppercase font-sans tracking-widest font-semibold"
          >
            Explore Anthology
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Items List */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 bg-charcoal/60 rounded-xl border border-sand/20 flex gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover bg-black rounded"
                  />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-sans">
                      {item.product.number}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-ivory">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-taupe font-sans mt-0.5">
                      Flacon: <span className="text-ivory font-medium">{item.size}</span>
                    </p>
                    <span className="font-serif text-sm font-semibold text-gold mt-1 block">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-20">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-taupe hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-center border border-sand/30 bg-black rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-taupe hover:text-ivory"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-xs font-sans text-ivory">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-taupe hover:text-ivory"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Wrap Card */}
          <div
            onClick={() => setGiftWrap(!giftWrap)}
            className="p-4 bg-charcoal/80 rounded-xl border border-sand/30 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Gift size={18} className="text-gold" />
              <div>
                <p className="text-xs font-sans font-medium text-ivory">
                  Complimentary Signature Gift Presentation
                </p>
                <p className="text-[10px] text-taupe">
                  Black linen coffret, silk grosgrain ribbon & numbered seal
                </p>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                giftWrap ? 'bg-gold text-black' : 'bg-black border border-sand/40 text-transparent'
              }`}
            >
              ✓
            </span>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-charcoal/60 rounded-xl border border-sand/20 space-y-3">
            <h4 className="font-serif text-lg text-ivory">Summary</h4>
            <div className="flex justify-between text-xs text-taupe font-sans">
              <span>Subtotal</span>
              <span className="text-ivory">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-taupe font-sans">
              <span>Maison Express Courier</span>
              <span className="text-gold uppercase tracking-wider text-[10px]">Complimentary</span>
            </div>
            <div className="flex justify-between text-base font-serif text-ivory pt-3 border-t border-sand/20">
              <span>Total Allocation</span>
              <span className="text-xl font-semibold text-gold">{formatPrice(subtotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 py-4 bg-gold text-black text-xs uppercase font-sans tracking-[0.25em] font-semibold rounded-xl hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>

            <p className="text-[10px] text-center text-taupe flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck size={12} className="text-gold" />
              <span>Direct dispatch from Atelier Grasse</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="Bag">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

