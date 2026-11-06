import React, { useState, useMemo } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product } from '../types';
import { SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CollectionPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Mobile sheet states
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedGender !== 'All') {
      list = list.filter((p) => p.gender === selectedGender);
    }
    if (selectedFamily !== 'All') {
      list = list.filter((p) => p.family === selectedFamily);
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price100ml - b.price100ml);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price100ml - a.price100ml);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured default order
        break;
    }

    return list;
  }, [selectedGender, selectedFamily, sortBy]);

  const families = ['All', 'Woody', 'Amber', 'Floral', 'Fresh'];
  const genders = ['All', 'Unisex', 'For Her', 'For Him'];

  const content = (
    <div className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto select-none">
      {/* Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-2">
          HAUTE PARFUMERIE ANTHOLOGY
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-light leading-tight">
          The Complete <span className="italic font-normal text-gold">Collection</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-taupe mt-3 leading-relaxed">
          Six extraits composed with high concentrations of raw botanical absolutes. Macerated 48 hours cold in small numbered editions.
        </p>
      </div>

      {/* DESKTOP FILTER BAR */}
      <div className="hidden md:flex items-center justify-between py-4 border-y border-sand/20 mb-10">
        {/* Gender Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-sans tracking-widest text-taupe mr-2">
            Category:
          </span>
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-4 py-1.5 text-xs font-sans uppercase tracking-wider transition-all ${
                selectedGender === g
                  ? 'bg-ivory text-black font-semibold'
                  : 'bg-charcoal text-taupe hover:text-ivory'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Note Family Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-sans tracking-widest text-taupe mr-2">
            Family:
          </span>
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFamily(f)}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-all ${
                selectedFamily === f
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-charcoal text-taupe hover:text-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-sans tracking-widest text-taupe">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-charcoal text-xs text-ivory border border-sand/30 py-1.5 px-3 focus:outline-none focus:border-gold"
          >
            <option value="featured">Featured Allocation</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* MOBILE FILTER & SORT BAR */}
      <div className="flex md:hidden items-center justify-between gap-3 mb-6 sticky top-14 z-30 bg-black/95 py-2 -mx-4 px-4 border-b border-sand/20 backdrop-blur-md">
        <button
          onClick={() => setFilterSheetOpen(true)}
          className="flex-1 py-2.5 bg-charcoal border border-sand/30 rounded-lg text-xs font-sans uppercase tracking-wider text-ivory flex items-center justify-center gap-2 active:scale-98"
        >
          <SlidersHorizontal size={14} className="text-gold" />
          <span>Filters ({selectedGender !== 'All' || selectedFamily !== 'All' ? 'Active' : 'All'})</span>
        </button>

        <button
          onClick={() => setSortSheetOpen(true)}
          className="flex-1 py-2.5 bg-charcoal border border-sand/30 rounded-lg text-xs font-sans uppercase tracking-wider text-ivory flex items-center justify-center gap-2 active:scale-98"
        >
          <ArrowUpDown size={14} className="text-gold" />
          <span>Sort By</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6 text-xs text-taupe font-sans">
        <span>Showing {filteredAndSortedProducts.length} creations</span>
        {(selectedGender !== 'All' || selectedFamily !== 'All') && (
          <button
            onClick={() => {
              setSelectedGender('All');
              setSelectedFamily('All');
            }}
            className="text-gold underline hover:text-white"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setActiveProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      {/* MOBILE BOTTOM SHEET: FILTERS */}
      <AnimatePresence>
        {filterSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterSheetOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 w-full bg-ivory text-black rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6"
            >
              <div className="w-12 h-1 bg-sand/60 rounded-full mx-auto mb-2" />
              <div className="flex justify-between items-center pb-2 border-b border-sand">
                <h3 className="font-serif text-xl">Filter Fragrances</h3>
                <button onClick={() => setFilterSheetOpen(false)} className="p-1">
                  <X size={18} />
                </button>
              </div>

              {/* Category */}
              <div>
                <span className="text-[10px] uppercase font-sans tracking-widest text-taupe block mb-2 font-semibold">
                  Intended Audience
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`p-3 rounded-lg text-xs font-sans border text-left flex justify-between items-center ${
                        selectedGender === g
                          ? 'border-gold bg-black text-ivory font-semibold'
                          : 'border-sand bg-white text-charcoal'
                      }`}
                    >
                      <span>{g}</span>
                      {selectedGender === g && <Check size={14} className="text-gold" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Family */}
              <div>
                <span className="text-[10px] uppercase font-sans tracking-widest text-taupe block mb-2 font-semibold">
                  Botanical Family
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {families.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFamily(f)}
                      className={`p-3 rounded-lg text-xs font-sans border text-left flex justify-between items-center ${
                        selectedFamily === f
                          ? 'border-gold bg-black text-ivory font-semibold'
                          : 'border-sand bg-white text-charcoal'
                      }`}
                    >
                      <span>{f}</span>
                      {selectedFamily === f && <Check size={14} className="text-gold" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilterSheetOpen(false)}
                className="w-full py-4 bg-black text-ivory text-xs uppercase font-sans tracking-widest font-semibold rounded-xl"
              >
                Apply Filters ({filteredAndSortedProducts.length} Results)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM SHEET: SORT */}
      <AnimatePresence>
        {sortSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSortSheetOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 w-full bg-ivory text-black rounded-t-3xl p-6 space-y-4"
            >
              <div className="w-12 h-1 bg-sand/60 rounded-full mx-auto mb-2" />
              <div className="flex justify-between items-center pb-2 border-b border-sand">
                <h3 className="font-serif text-xl">Sort By</h3>
                <button onClick={() => setSortSheetOpen(false)} className="p-1">
                  <X size={18} />
                </button>
              </div>

              {[
                { label: 'Featured Allocation', value: 'featured' },
                { label: 'Price: Low to High', value: 'price-asc' },
                { label: 'Price: High to Low', value: 'price-desc' },
                { label: 'Top Rated by Collectors', value: 'rating' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value as any);
                    setSortSheetOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-lg text-xs font-sans border text-left flex justify-between items-center ${
                    sortBy === opt.value
                      ? 'border-gold bg-black text-ivory font-semibold'
                      : 'border-sand bg-white text-charcoal'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check size={14} className="text-gold" />}
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="Collection">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

