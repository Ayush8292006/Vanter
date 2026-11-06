import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';
import { VMonogram } from '../components/brand/VMonogram';
import { Link } from 'react-router-dom';
import { Sparkles, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../data/products';

export const WishlistPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const content = (
    <div className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto select-none">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-2">
          CURATED SELECTIONS
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory font-light">
          Your <span className="italic font-normal text-gold">Wishlist</span>
        </h1>
        <p className="font-sans text-xs text-taupe mt-2">
          Flacons reserved in your private registry for contemplation.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center max-w-sm mx-auto space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-charcoal border border-sand/30 flex items-center justify-center text-gold">
            <VMonogram size={44} watermark />
          </div>
          <h3 className="font-serif text-2xl text-ivory">
            Your collection awaits
          </h3>
          <p className="font-sans text-xs text-taupe leading-relaxed">
            Explore our haute parfumerie anthology and mark your favorite compositions to compare them here.
          </p>
          <Link
            to="/collection"
            className="inline-block mt-4 px-6 py-3 bg-gold text-black text-xs uppercase font-sans tracking-widest font-semibold"
          >
            Explore Anthology
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="Wishlist">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

