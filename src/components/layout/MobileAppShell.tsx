import React, { ReactNode, useState } from 'react';
import { MobileTopBar } from '../mobile/MobileTopBar';
import { MobileTabBar } from '../mobile/MobileTabBar';
import { MobileMenuSheet } from '../mobile/MobileMenuSheet';
import { Toast } from '../common/Toast';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';

interface MobileAppShellProps {
  children: ReactNode;
  title?: string;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({ children, title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keyNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.family.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-[100dvh] bg-black text-ivory flex flex-col relative select-none pb-20 overscroll-none">
      {/* Top Mobile Bar (56px) */}
      <MobileTopBar
        title={title}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      {/* Fixed Bottom Tab Bar (64px + safe area) */}
      <MobileTabBar />

      {/* Menu & Navigation Drawer Sheet */}
      <MobileMenuSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Mobile Search Bottom Sheet */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-black text-ivory flex flex-col p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-sand/20">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold">
                Search Fragrance
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-taupe hover:text-ivory"
              >
                <X size={20} />
              </button>
            </div>

            {/* Input */}
            <div className="relative py-4 border-b border-sand/40">
              <input
                type="text"
                autoFocus
                placeholder="Search notes, names, families..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xl font-serif text-ivory placeholder-taupe/40 focus:outline-none"
              />
              <Search size={20} className="absolute right-0 top-5 text-gold" />
            </div>

            {/* Chips */}
            <div className="py-4 flex flex-wrap gap-2">
              {['Assam Oud', 'Vanilla Bourbon', 'Rose de Mai', 'White Tea', 'Sandalwood'].map(
                (chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(chip)}
                    className="px-3 py-1 bg-charcoal rounded-full text-xs text-sand hover:text-gold"
                  >
                    {chip}
                  </button>
                )
              )}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto space-y-3 pt-2">
              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-3 bg-charcoal/60 rounded-xl border border-sand/15"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images.primary}
                      alt={p.name}
                      className="w-12 h-14 object-cover rounded-md bg-black"
                    />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gold font-sans">
                        {p.number} • {p.family}
                      </span>
                      <h4 className="font-serif text-base text-ivory">{p.name}</h4>
                      <p className="text-[11px] text-taupe truncate max-w-[180px]">
                        {p.keyNotes.join(', ')}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gold" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Toast */}
      <Toast />
    </div>
  );
};

