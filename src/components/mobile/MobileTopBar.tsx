import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, Search, ShoppingBag } from 'lucide-react';
import { VMonogram } from '../brand/VMonogram';
import { useCart } from '../../context/CartContext';

interface MobileTopBarProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  title?: string;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  onOpenMenu,
  onOpenSearch,
  title,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const isRoot = location.pathname === '/' || location.pathname === '/shop' || location.pathname === '/discover' || location.pathname === '/wishlist' || location.pathname === '/bag';
  const isInnerProduct = location.pathname.startsWith('/product/');

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 h-14 z-40 bg-ivory/95 backdrop-blur-md border-b border-sand/80 px-4 flex items-center justify-between text-charcoal select-none">
      {/* Left Action: Back or Menu */}
      <div className="flex items-center w-12">
        {isInnerProduct || (!isRoot && location.pathname !== '/') ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-charcoal active:bg-sand/30 active:scale-95 transition-transform"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            onClick={onOpenMenu}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-charcoal active:bg-sand/30 active:scale-95 transition-transform"
            aria-label="Open Menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Centre: Title or Logo */}
      <div className="flex-1 flex items-center justify-center text-center">
        {title ? (
          <span className="font-serif text-lg font-medium text-black truncate max-w-[200px]">
            {title}
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            <VMonogram size={18} />
            <span
              className="font-cinzel text-base tracking-[0.3em] text-black uppercase font-semibold"
              style={{ textIndent: '0.3em' }}
            >
              VANTÉR
            </span>
          </div>
        )}
      </div>

      {/* Right Action: Search & Bag */}
      <div className="flex items-center justify-end space-x-1 w-16">
        <button
          onClick={onOpenSearch}
          className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal active:scale-95 transition-transform"
          aria-label="Search"
        >
          <Search size={18} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => navigate('/bag')}
          className="w-9 h-9 relative rounded-full flex items-center justify-center text-charcoal active:scale-95 transition-transform"
          aria-label="Bag"
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute 1 top-1.5 right-1.5 min-w-[15px] h-[15px] rounded-full bg-gold text-black text-[9px] font-sans font-bold flex items-center justify-center px-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

