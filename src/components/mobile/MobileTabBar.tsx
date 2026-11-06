import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, Compass, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const tabs = [
    { id: 'home', label: 'Home', path: '/', icon: Home },
    { id: 'shop', label: 'Shop', path: '/shop', icon: Sparkles },
    { id: 'discover', label: 'Discover', path: '/discover', icon: Compass },
    { id: 'wishlist', label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { id: 'bag', label: 'Bag', path: '/bag', icon: ShoppingBag, badge: cartCount },
  ];

  // Determine active tab based on pathname
  const getActiveTab = () => {
    const current = location.pathname;
    if (current === '/') return 'home';
    if (current.startsWith('/shop') || current.startsWith('/collection')) return 'shop';
    if (current.startsWith('/discover')) return 'discover';
    if (current.startsWith('/wishlist')) return 'wishlist';
    if (current.startsWith('/bag')) return 'bag';
    return 'home';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (path: string) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // ignore
      }
    }
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-sand/20 pb-[env(safe-area-inset-bottom,0px)] md:hidden select-none">
      <div className="h-16 flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className="relative flex-1 flex flex-col items-center justify-center py-1 group active:scale-90 transition-transform"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.25}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-taupe group-hover:text-ivory'
                  }`}
                />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 rounded-full bg-gold text-black text-[8px] font-sans font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[9px] font-sans tracking-wider mt-1 transition-colors duration-200 ${
                  isActive ? 'text-gold font-medium' : 'text-taupe'
                }`}
              >
                {tab.label}
              </span>

              {/* Sliding Gold Indicator Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-gold"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

