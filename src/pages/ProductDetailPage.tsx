import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { PRODUCTS, DISCOVERY_COFFRET, calculatePriceBySize, formatPrice } from '../data/products';
import { FragranceSize, Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Plus, Minus, ShieldCheck, Gift, ChevronDown, ChevronUp, Share2, Sparkles, MapPin, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { addToCart, giftWrap, setGiftWrap } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product or coffret
  const isCoffret = slug === 'discovery-coffret';
  const product: Product = isCoffret
    ? ({
        id: DISCOVERY_COFFRET.id,
        number: DISCOVERY_COFFRET.number,
        name: DISCOVERY_COFFRET.name,
        slug: DISCOVERY_COFFRET.slug,
        tagline: DISCOVERY_COFFRET.subtitle,
        shortDescription: DISCOVERY_COFFRET.subtitle,
        fullDescription: DISCOVERY_COFFRET.description,
        gender: 'Unisex',
        family: 'Woody',
        price100ml: DISCOVERY_COFFRET.price,
        mood: 'Black Linen & Gold Leaf',
        moodTint: '#C9A45C',
        gradient: 'from-black to-charcoal',
        notes: { top: [], heart: [], base: [] },
        keyNotes: ['Six 5ml Miniature Flacons', 'Blotters', 'Maison Certificate'],
        images: {
          primary: DISCOVERY_COFFRET.image,
          secondary: DISCOVERY_COFFRET.image,
        },
        concentration: 'Extrait Anthology',
        maceration: '48h Maceration',
        origin: 'Grasse, France',
        rating: 4.98,
        reviewsCount: 114,
      } as Product)
    : PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<FragranceSize>('100ml');
  const [selectedImage, setSelectedImage] = useState<string>(product.images.primary);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('notes');

  const currentPrice = calculatePriceBySize(product.price100ml, selectedSize);
  const isFavorited = isInWishlist(product.id);

  const sizes: FragranceSize[] = ['30ml', '50ml', '100ml'];

  const imagesList = [
    product.images.primary,
    product.images.secondary,
    product.images.ingredients || product.images.primary,
    product.images.lifestyle || product.images.secondary,
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `VANTÉR — ${product.name}`,
        text: product.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard.');
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // 1. MOBILE APP PRODUCT EXPERIENCE (< 768px)
  if (isMobile) {
    return (
      <MobileAppShell title={product.name}>
        <div className="relative pb-24 select-none">
          {/* Top Gallery Section (60% viewport height feel) */}
          <div className="relative w-full aspect-[4/5] bg-charcoal overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

            {/* Floating Top Floating Round Controls */}
            <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-ivory flex items-center justify-center border border-white/10"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border ${
                    isFavorited
                      ? 'bg-gold text-black border-gold'
                      : 'bg-black/60 text-ivory border-white/10'
                  }`}
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-ivory flex items-center justify-center border border-white/10"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Thumbnail dots selector on image */}
            <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    selectedImage === img ? 'w-6 bg-gold' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sliding Content Card over Image */}
          <div className="-mt-4 relative z-20 bg-ivory text-black rounded-t-3xl p-6 space-y-6 shadow-2xl">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.25em] text-taupe mb-1">
                <span>{product.number} • {product.gender}</span>
                <span className="text-gold font-semibold">{product.family}</span>
              </div>
              <h1 className="font-serif text-3xl font-light text-black">
                {product.name}
              </h1>
              <p className="font-serif italic text-sm text-taupe mt-1">
                "{product.tagline}"
              </p>
            </div>

            {/* Size Selector Segmented Pills */}
            {!isCoffret && (
              <div>
                <span className="text-[10px] uppercase font-sans tracking-widest text-taupe block mb-2 font-semibold">
                  Select Flacon Volume
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 rounded-xl text-xs font-sans uppercase tracking-wider border transition-all ${
                        selectedSize === s
                          ? 'border-gold bg-black text-ivory font-semibold shadow-md'
                          : 'border-sand bg-white text-charcoal'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Poetic description */}
            <p className="font-sans text-xs text-charcoal leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Key Notes chips */}
            <div>
              <span className="text-[10px] uppercase font-sans tracking-widest text-taupe block mb-2 font-semibold">
                Dominant Olfactive Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.keyNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-beige border border-sand text-xs font-sans text-charcoal"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Gift Wrap Checkbox */}
            <div
              onClick={() => setGiftWrap(!giftWrap)}
              className="flex items-center justify-between p-3.5 bg-beige rounded-xl border border-sand cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Gift size={16} className="text-gold" />
                <span className="text-xs font-sans text-black">
                  Complimentary Maison Gift Wrap & Ribbon
                </span>
              </div>
              <span
                className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                  giftWrap ? 'bg-gold text-black' : 'bg-white border border-sand text-transparent'
                }`}
              >
                ✓
              </span>
            </div>

            {/* Accordions */}
            <div className="border-t border-sand pt-4 divide-y divide-sand">
              {/* Notes Accordion */}
              {!isCoffret && (
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('notes')}
                    className="w-full flex justify-between items-center text-left py-1"
                  >
                    <span className="font-serif text-lg text-black">Olfactive Pyramid</span>
                    {openAccordion === 'notes' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'notes' && (
                    <div className="pt-3 space-y-3 text-xs font-sans text-charcoal">
                      <div>
                        <span className="text-gold font-medium uppercase text-[10px] block">Top Notes</span>
                        <p>{product.notes.top.map((n) => n.name).join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-gold font-medium uppercase text-[10px] block">Heart Notes</span>
                        <p>{product.notes.heart.map((n) => n.name).join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-gold font-medium uppercase text-[10px] block">Base Notes</span>
                        <p>{product.notes.base.map((n) => n.name).join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Accordion */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex justify-between items-center text-left py-1"
                >
                  <span className="font-serif text-lg text-black">Delivery & Authenticity</span>
                  {openAccordion === 'delivery' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'delivery' && (
                  <div className="pt-3 text-xs font-sans text-taupe space-y-2">
                    <p>• Complimentary express courier across India.</p>
                    <p>• Delivered in temperature-controlled protective cases.</p>
                    <p>• Numbered certificate of authenticity included in every box.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STICKY BOTTOM ACTION BAR (Native App Feel) */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-ivory border-t border-sand p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl">
            <div>
              <span className="text-[10px] uppercase font-sans text-taupe block">
                {selectedSize} Extrait
              </span>
              <span className="font-serif text-xl font-semibold text-black">
                {formatPrice(currentPrice)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className="px-8 py-3.5 bg-black text-ivory text-xs uppercase font-sans tracking-widest font-semibold rounded-xl active:scale-95 transition-transform hover:bg-gold hover:text-black shadow-lg"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </MobileAppShell>
    );
  }

  // 2. DESKTOP & TABLET EDITORIAL EXPERIENCE (≥ 768px)
  return (
    <DesktopShell>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-24 select-none">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-taupe mb-8">
          <Link to="/" className="hover:text-ivory transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-ivory transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-gold">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery with Zoom & Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] bg-charcoal overflow-hidden border border-sand/40 shadow-2xl group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 text-gold text-[10px] uppercase tracking-[0.25em] font-sans border border-gold/40">
                {product.number}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-4 gap-3">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-gold shadow-md'
                      : 'border-sand/40 opacity-70 hover:opacity-100 hover:border-sand'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Product Form & Poetic Ledger */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              <div className="flex items-center justify-between text-xs uppercase font-sans tracking-[0.3em] text-gold mb-2">
                <span>{product.number} • {product.gender}</span>
                <span>{product.family}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-light leading-tight">
                {product.name}
              </h1>
              <p className="font-serif italic text-base text-sand/80 mt-2">
                "{product.tagline}"
              </p>
              <div className="mt-4 font-serif text-2xl text-ivory font-semibold">
                {formatPrice(currentPrice)}
              </div>
            </div>

            {/* Size Selector */}
            {!isCoffret && (
              <div>
                <label className="text-[10px] uppercase font-sans tracking-[0.25em] text-taupe block mb-3 font-semibold">
                  Select Flacon Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 text-xs font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-gold bg-gold text-black font-semibold'
                          : 'border-sand/40 bg-charcoal text-ivory hover:border-gold'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center border border-sand/40 bg-charcoal px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-taupe hover:text-ivory"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-sans text-xs text-ivory font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-taupe hover:text-ivory"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-gold text-black text-xs uppercase font-sans tracking-[0.25em] font-semibold hover:bg-gold-light transition-colors shadow-lg active:scale-[0.99]"
                >
                  Add to Collection — {formatPrice(currentPrice * quantity)}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-14 border flex items-center justify-center transition-colors ${
                    isFavorited
                      ? 'border-gold bg-gold text-black'
                      : 'border-sand/40 bg-charcoal text-ivory hover:border-gold'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Gift Wrap Checkbox */}
              <div
                onClick={() => setGiftWrap(!giftWrap)}
                className="flex items-center justify-between p-3.5 bg-charcoal/60 border border-sand/30 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <Gift size={16} className="text-gold" />
                  <span className="text-xs font-sans text-sand/90">
                    Complimentary Maison Signature Gift Presentation
                  </span>
                </div>
                <span
                  className={`w-5 h-5 flex items-center justify-center text-xs font-bold border ${
                    giftWrap
                      ? 'border-gold bg-gold text-black'
                      : 'border-sand/40 text-transparent'
                  }`}
                >
                  ✓
                </span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-sand/20 divide-y divide-sand/20 pt-2">
              {/* Description Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-xs uppercase font-sans tracking-[0.25em] text-ivory">
                    Description & Narrative
                  </span>
                  {openAccordion === 'desc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'desc' && (
                  <p className="pt-3 font-sans text-xs text-taupe leading-relaxed">
                    {product.fullDescription}
                  </p>
                )}
              </div>

              {/* Notes Pyramid Accordion */}
              {!isCoffret && (
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('notes')}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-xs uppercase font-sans tracking-[0.25em] text-ivory">
                      Olfactive Pyramid Structure
                    </span>
                    {openAccordion === 'notes' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'notes' && (
                    <div className="pt-4 space-y-3 font-sans text-xs">
                      <div className="p-3 bg-charcoal/40 border-l border-gold">
                        <span className="text-gold font-medium uppercase text-[10px] block mb-0.5">Top Notes</span>
                        <p className="text-sand/90">{product.notes.top.map((n) => n.name).join(' • ')}</p>
                      </div>
                      <div className="p-3 bg-charcoal/40 border-l border-gold">
                        <span className="text-gold font-medium uppercase text-[10px] block mb-0.5">Heart Notes</span>
                        <p className="text-sand/90">{product.notes.heart.map((n) => n.name).join(' • ')}</p>
                      </div>
                      <div className="p-3 bg-charcoal/40 border-l border-gold">
                        <span className="text-gold font-medium uppercase text-[10px] block mb-0.5">Base Notes</span>
                        <p className="text-sand/90">{product.notes.base.map((n) => n.name).join(' • ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dispatch & Assurance Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-xs uppercase font-sans tracking-[0.25em] text-ivory">
                    Delivery & Maison Guarantee
                  </span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 font-sans text-xs text-taupe space-y-2">
                    <p>• Complimentary express air courier across India.</p>
                    <p>• Shipped in bespoke temperature-controlled velvet insulated casing.</p>
                    <p>• Hand-sealed with gold wax stamp & numbered master certificate.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pairs Well With Section */}
        <div className="mt-28 pt-16 border-t border-sand/20">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold block mb-2">
              COMPLEMENTARY CREATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
              Harmonizes With
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group p-5 bg-charcoal/40 border border-sand/20 hover:border-gold transition-colors flex items-center gap-4"
              >
                <img
                  src={p.images.primary}
                  alt={p.name}
                  className="w-16 h-20 object-cover bg-black"
                />
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-gold">
                    {p.number}
                  </span>
                  <h4 className="font-serif text-lg text-ivory group-hover:text-gold transition-colors">
                    {p.name}
                  </h4>
                  <span className="font-serif text-sm text-sand/80 mt-1 block">
                    {formatPrice(p.price100ml)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};

