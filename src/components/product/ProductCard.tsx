import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'compact' | 'horizontal';
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'standard',
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, '100ml', 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      data-cursor="product"
      data-cursor-text="VIEW"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#EDE4D3]/90 text-charcoal flex flex-col justify-between overflow-hidden border border-sand transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:-translate-y-1.5 hover:shadow-2xl"
    >
      {/* Animated Gold Border Frame on Hover */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 border border-gold/70 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Card Top: Number, Gender Badge & Wishlist Button */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-sans tracking-[0.3em] font-semibold text-charcoal/70 uppercase">
            {product.number}
          </span>
          <span className="text-[9px] font-sans tracking-widest text-taupe uppercase px-2 py-0.5 rounded-full bg-sand/30 border border-sand/40">
            {product.gender}
          </span>
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorited
              ? 'bg-gold text-black shadow-sm'
              : 'bg-white/70 text-charcoal hover:bg-gold hover:text-black'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Card Media: Dual-Image Crossfade with Zoom */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block w-full aspect-[4/5] overflow-hidden my-auto"
      >
        {/* Primary Image */}
        <img
          src={product.images.primary}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        <img
          src={product.images.secondary}
          alt={`${product.name} Angle`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
          }`}
        />

        {/* Subtle Mood Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20"
          style={{ backgroundColor: product.moodTint }}
        />

        {/* Quick View Button Slide Up on Desktop */}
        {onQuickView && (
          <div
            className={`hidden md:flex absolute inset-x-4 bottom-4 z-20 transition-all duration-400 ease-out ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-2.5 bg-black/90 backdrop-blur-sm text-ivory text-[10px] uppercase font-sans tracking-[0.25em] hover:bg-gold hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={13} />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </Link>

      {/* Card Bottom: Information & Action */}
      <div className="relative z-10 p-5 pt-3 bg-beige/95 border-t border-sand/50">
        <div className="mb-2">
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-lg sm:text-xl font-normal text-black hover:text-gold transition-colors block leading-snug"
          >
            {product.name}
          </Link>
          <p className="text-[11px] font-sans tracking-wider text-taupe truncate mt-0.5 uppercase">
            {product.keyNotes.slice(0, 3).join(' • ')}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-sand/40">
          <div>
            <span className="text-[9px] uppercase font-sans tracking-widest text-taupe block">
              100 ML Extrait
            </span>
            <span className="font-serif text-base font-semibold text-black">
              {formatPrice(product.price100ml)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="group/btn relative px-3 py-2 bg-black text-ivory text-[10px] uppercase font-sans tracking-[0.2em] hover:bg-gold hover:text-black transition-colors flex items-center gap-1.5 active:scale-95"
            aria-label={`Add ${product.name} to Bag`}
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            <span className="hidden sm:inline">Add to Bag</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

