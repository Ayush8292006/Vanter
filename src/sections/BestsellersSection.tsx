import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product } from '../types';

export const BestsellersSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'For Her' | 'For Him' | 'Unisex'>('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const filteredProducts =
    filter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p: Product) => p.gender === filter);

  const filters: ('All' | 'For Her' | 'For Him' | 'Unisex')[] = [
    'All',
    'For Her',
    'For Him',
    'Unisex',
  ];

  return (
    <section className="bg-beige text-charcoal py-24 sm:py-36 px-6 lg:px-12 border-b border-sand overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
              — 05 / CURATED EDITIONS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-tight">
              Maison <span className="italic font-normal text-gold">Bestsellers</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-taupe mt-2">
              The flacons most frequently selected by collectors worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-ivory/80 p-1.5 border border-sand shadow-sm self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-4 py-2 text-xs uppercase font-sans tracking-widest transition-colors duration-300 ${
                  filter === f ? 'text-ivory font-medium' : 'text-taupe hover:text-black'
                }`}
              >
                {filter === f && (
                  <motion.div
                    layoutId="bestsellerFilterTab"
                    className="absolute inset-0 bg-black"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  onQuickView={(p) => setActiveProduct(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <QuickViewModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
};
