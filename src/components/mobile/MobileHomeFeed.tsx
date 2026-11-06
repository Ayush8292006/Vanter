import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, DISCOVERY_COFFRET, JOURNAL_ARTICLES, formatPrice } from '../../data/products';
import { Product } from '../../types';
import { Search, Heart, Plus, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';

export const MobileHomeFeed: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Dynamic greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Story banner carousel
  const [activeStory, setActiveStory] = useState(0);
  const storyBanners = [
    {
      title: 'The Art of Invisible Elegance',
      subtitle: 'Composed in Grasse in limited numbered extraits',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
      cta: 'Explore Anthology',
      link: '/collection',
    },
    {
      title: 'The Discovery Coffret',
      subtitle: 'Six signatures, 5 ml each. Find yours before you commit.',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85',
      cta: 'Acquire Coffret',
      link: '/product/discovery-coffret',
    },
    {
      title: 'Centifolia Roses Harvest',
      subtitle: 'Gathered at 06:00 AM before dawn heat touches the petals',
      image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=85',
      cta: 'Discover Rose Velours',
      link: '/product/rose-velours',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [storyBanners.length]);

  // Category filter chips
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'For Her', 'For Him', 'Unisex', 'Woody', 'Floral', 'Fresh', 'Amber'];

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.gender === activeCategory || p.family === activeCategory);

  return (
    <div className="px-4 py-4 space-y-7 pb-12 select-none">
      {/* 1. Greeting Row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-ivory">
            {getGreeting()}
          </h2>
          <p className="font-sans text-[11px] text-taupe tracking-wider uppercase mt-0.5">
            Discover your invisible signature
          </p>
        </div>
        <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold">
          <Sparkles size={14} />
        </div>
      </div>

      {/* 2. Search Pill Input */}
      <div
        onClick={() => navigate('/shop')}
        className="w-full h-11 bg-charcoal/80 border border-sand/30 rounded-xl px-4 flex items-center gap-3 text-taupe cursor-pointer active:scale-[0.99] transition-transform"
      >
        <Search size={16} className="text-gold" />
        <span className="text-xs font-sans text-taupe/80">Search notes, flacons, moods...</span>
      </div>

      {/* 3. Story-Style Banner Carousel with Progress Bars */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-sand/30 shadow-xl bg-charcoal">
        <img
          src={storyBanners[activeStory].image}
          alt={storyBanners[activeStory].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

        {/* Thin Story Progress Bars on Top */}
        <div className="absolute top-3 inset-x-3 flex gap-1.5 z-20">
          {storyBanners.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-gold transition-all duration-300 ${
                  activeStory === i ? 'w-full' : activeStory > i ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-sans block mb-1">
            FEATURED CREATION
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-ivory leading-snug">
            {storyBanners[activeStory].title}
          </h3>
          <p className="font-sans text-xs text-sand/80 mt-1 line-clamp-1">
            {storyBanners[activeStory].subtitle}
          </p>
          <Link
            to={storyBanners[activeStory].link}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-black rounded-lg text-[10px] uppercase font-sans tracking-widest font-semibold"
          >
            <span>{storyBanners[activeStory].cta}</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* 4. Category Chips Row */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-ivory text-black font-medium shadow-sm'
                : 'bg-charcoal text-taupe border border-sand/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 5. Signature Collection: Horizontal Snap Cards (70% width) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-ivory">Signature Collection</h3>
            <p className="text-[10px] uppercase font-sans tracking-widest text-taupe">Extraits de Parfum</p>
          </div>
          <Link to="/shop" className="text-xs text-gold flex items-center gap-1 font-sans">
            <span>View All</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none -mx-4 px-4 snap-x snap-mandatory pb-2">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="w-[72%] flex-shrink-0 snap-center bg-beige rounded-2xl overflow-hidden border border-sand shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-beige">
                <img
                  src={p.images.primary}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(p)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isInWishlist(p.id) ? 'bg-gold text-black' : 'bg-white/80 text-black'
                  }`}
                >
                  <Heart size={14} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/75 rounded text-gold text-[8px] font-sans tracking-widest uppercase">
                  {p.number}
                </div>
              </div>

              <div className="p-3.5 bg-beige">
                <Link to={`/product/${p.slug}`} className="font-serif text-base text-black block truncate">
                  {p.name}
                </Link>
                <p className="text-[10px] text-taupe truncate mt-0.5">
                  {p.keyNotes.join(' • ')}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-sand/50">
                  <span className="font-serif text-sm font-semibold text-black">
                    {formatPrice(p.price100ml)}
                  </span>
                  <button
                    onClick={() => addToCart(p, '100ml', 1)}
                    className="w-7 h-7 rounded-full bg-black text-ivory flex items-center justify-center active:scale-90 transition-transform"
                    aria-label="Add to Bag"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Find Your Scent Banner Card (Opens Quiz) */}
      <div
        onClick={() => navigate('/discover')}
        className="p-5 rounded-2xl bg-gradient-to-r from-charcoal via-[#222] to-black border border-gold/40 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-gold flex items-center gap-1.5">
            <Compass size={12} />
            <span>Interactive Diagnostic</span>
          </span>
          <h4 className="font-serif text-lg text-ivory">Find Your Scent</h4>
          <p className="text-[11px] text-taupe">3 quick inquiries to identify your match</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center flex-shrink-0">
          <ArrowRight size={16} />
        </div>
      </div>

      {/* 7. Discovery Coffret Promo Card */}
      <div className="rounded-2xl overflow-hidden border border-gold/30 bg-charcoal">
        <div className="relative aspect-[16/9]">
          <img
            src={DISCOVERY_COFFRET.image}
            alt={DISCOVERY_COFFRET.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <span className="text-[9px] uppercase font-sans tracking-widest text-gold block">
                Trial Coffret
              </span>
              <h4 className="font-serif text-lg text-ivory">{DISCOVERY_COFFRET.name}</h4>
            </div>
            <span className="font-serif text-base font-semibold text-gold">
              {formatPrice(DISCOVERY_COFFRET.price)}
            </span>
          </div>
        </div>
        <div className="p-4 bg-charcoal/90 flex items-center justify-between">
          <p className="text-[11px] text-sand/80 max-w-[200px]">
            Six 5 ml flacons. Purchase value redeemable against 100 ml.
          </p>
          <Link
            to="/product/discovery-coffret"
            className="px-3.5 py-1.5 bg-gold text-black text-[10px] uppercase font-sans font-semibold rounded-lg tracking-wider"
          >
            Acquire
          </Link>
        </div>
      </div>

      {/* 8. Bestsellers 2-Column Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl text-ivory">Bestsellers</h3>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="bg-beige rounded-xl overflow-hidden border border-sand flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-beige">
                <img
                  src={p.images.primary}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(p)}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center ${
                    isInWishlist(p.id) ? 'bg-gold text-black' : 'bg-white/80 text-black'
                  }`}
                >
                  <Heart size={12} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="p-3 bg-beige">
                <Link to={`/product/${p.slug}`} className="font-serif text-sm text-black block truncate">
                  {p.name}
                </Link>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-sand/40">
                  <span className="font-serif text-xs font-semibold text-black">
                    {formatPrice(p.price100ml)}
                  </span>
                  <button
                    onClick={() => addToCart(p, '100ml', 1)}
                    className="w-6 h-6 rounded-full bg-black text-ivory flex items-center justify-center"
                    aria-label="Add"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Journal Cards Horizontal */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl text-ivory">The Gazette</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-none -mx-4 px-4 pb-2">
          {JOURNAL_ARTICLES.map((art) => (
            <div
              key={art.id}
              className="w-[240px] flex-shrink-0 bg-charcoal rounded-xl overflow-hidden border border-sand/20"
            >
              <div className="aspect-[16/10]">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <span className="text-[9px] uppercase tracking-wider text-gold font-sans">
                  {art.category}
                </span>
                <h4 className="font-serif text-sm text-ivory mt-1 line-clamp-2">
                  {art.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assurance Footer Badge */}
      <div className="pt-4 text-center">
        <p className="text-[10px] text-taupe flex items-center justify-center gap-1.5 font-sans">
          <ShieldCheck size={12} className="text-gold" />
          <span>French Haute Parfumerie • Grasse & Paris</span>
        </p>
      </div>
    </div>
  );
};

