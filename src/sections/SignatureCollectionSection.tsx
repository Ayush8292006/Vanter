import React, { useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignatureCollectionSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-beige text-charcoal py-24 sm:py-32 border-b border-sand overflow-hidden relative select-none">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
              — 02 / THE ANTHOLOGY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-tight">
              Signature <span className="italic font-normal text-gold">Collection</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-taupe mt-2 max-w-md">
              Six deliberate compositions formulated in Grasse. Extrait de parfum concentrations designed for intimate, lasting sillage.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/collection"
              className="text-xs uppercase tracking-[0.25em] text-black hover:text-gold font-sans font-medium transition-colors mr-4 hidden sm:inline-block"
            >
              View All (06)
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 rounded-full border border-sand bg-ivory/80 text-black hover:bg-gold hover:border-gold hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                aria-label="Scroll Previous Fragrance"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={scrollRight}
                className="w-11 h-11 rounded-full border border-sand bg-ivory/80 text-black hover:bg-gold hover:border-gold hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                aria-label="Scroll Next Fragrance"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-6 lg:px-12 pb-8 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PRODUCTS.map((product: Product) => (
          <div
            key={product.id}
            className="w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0 snap-start"
          >
            <ProductCard
              product={product}
              onQuickView={(p) => setActiveProduct(p)}
            />
          </div>
        ))}
      </div>

      <QuickViewModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
};
