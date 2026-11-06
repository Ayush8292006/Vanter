import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { VMonogram } from '../brand/VMonogram';
import { VWordmark } from '../brand/VWordmark';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Collection', path: '/collection' },
    { name: 'The House', path: '/about' },
    { name: 'Craft', path: '/#craft' },
    { name: 'Journal', path: '/#journal' },
    { name: 'Contact', path: '/contact' },
  ];

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keyNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.family.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isLightNav = scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isLightNav
            ? 'bg-ivory/95 backdrop-blur-md border-b border-sand text-charcoal shadow-sm py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-ivory py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-xs uppercase tracking-[0.25em] transition-all duration-300 group py-1 ${
                  isLightNav
                    ? 'text-charcoal hover:text-black hover:tracking-[0.28em]'
                    : 'text-ivory/90 hover:text-white hover:tracking-[0.28em]'
                }`}
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Left on Mobile / Tablet: Hamburger Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${
                isLightNav ? 'text-charcoal hover:text-black' : 'text-ivory hover:text-gold'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
            </button>
          </div>

          {/* Centre: VANTÉR Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group"
            aria-label="VANTÉR Home"
          >
            <VMonogram size={28} className="transform group-hover:scale-105 transition-transform duration-500" />
            <VWordmark
              size="md"
              color={isLightNav ? 'black' : 'ivory'}
              className="transform group-hover:tracking-[0.45em] transition-all duration-500"
            />
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-colors ${
                isLightNav ? 'text-charcoal hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
              aria-label="Search Fragrances"
            >
              <Search size={19} strokeWidth={1.25} />
            </button>

            <Link
              to="/collection"
              className={`hidden sm:block p-2 relative transition-colors ${
                isLightNav ? 'text-charcoal hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
              title="Saved Fragrances"
            >
              <Heart size={19} strokeWidth={1.25} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-2 relative transition-colors flex items-center gap-1.5 ${
                isLightNav ? 'text-charcoal hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.25} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-black text-[10px] font-sans font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN OVERLAY MENU (TABLET & DESKTOP HAMBURGER) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#0B0B0B] text-ivory flex flex-col justify-between p-8 sm:p-14 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-sand/20 pb-6">
              <div className="flex items-center gap-3">
                <VMonogram size={26} />
                <VWordmark size="sm" color="gold" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-ivory/70 hover:text-gold transition-colors"
                aria-label="Close Menu"
              >
                <X size={24} strokeWidth={1.25} />
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <div className="py-12 space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between text-3xl sm:text-5xl font-serif text-ivory/90 hover:text-gold transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs uppercase tracking-[0.3em] font-sans text-taupe group-hover:text-gold transition-colors">
                      — 0{idx + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-8 border-t border-sand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-taupe mb-1">
                  Private Boutique Concierge
                </p>
                <p className="font-serif text-ivory text-sm">concierge@vanter-parfum.com</p>
              </div>

              <div className="flex items-center space-x-6 text-xs uppercase tracking-[0.2em] text-taupe">
                <a href="#instagram" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#journal" className="hover:text-gold transition-colors">Gazette</a>
                <a href="#boutique" className="hover:text-gold transition-colors">Salons</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-6 sm:p-12 flex flex-col justify-start"
          >
            <div className="max-w-3xl mx-auto w-full">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-gold">
                  Maison Scent Index
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-taupe hover:text-ivory transition-colors p-2"
                >
                  <X size={22} strokeWidth={1.25} />
                </button>
              </div>

              {/* Input */}
              <div className="relative border-b border-sand/40 pb-4">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by note (Oud, Rose, Amber) or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl sm:text-3xl font-serif text-ivory placeholder-taupe/40 focus:outline-none"
                />
                <Search size={24} className="absolute right-0 top-2 text-gold/80" />
              </div>

              {/* Quick Suggestions Chips */}
              <div className="mt-6 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-taupe font-sans mr-2">Featured notes:</span>
                {['Assam Oud', 'Rose de Mai', 'Mysore Sandalwood', 'Saffron', 'Tonka', 'White Tea'].map(
                  (note) => (
                    <button
                      key={note}
                      onClick={() => setSearchQuery(note)}
                      className="px-3 py-1 bg-charcoal/80 border border-sand/30 text-xs text-ivory/80 hover:border-gold hover:text-gold transition-colors"
                    >
                      {note}
                    </button>
                  )
                )}
              </div>

              {/* Results List */}
              <div className="mt-10 max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-4 bg-charcoal/40 border border-sand/20 hover:border-gold transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={p.images.primary}
                          alt={p.name}
                          className="w-12 h-16 object-cover bg-black"
                        />
                        <div>
                          <span className="text-[10px] tracking-[0.25em] text-gold uppercase">
                            {p.number} • {p.family}
                          </span>
                          <h4 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-xs text-taupe mt-0.5">
                            {p.keyNotes.join(' • ')}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-taupe group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))
                ) : searchQuery ? (
                  <p className="text-center py-12 text-taupe font-serif italic text-lg">
                    No fragrance matches found for "{searchQuery}". Try exploring our Collection.
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

