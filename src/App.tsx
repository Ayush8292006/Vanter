import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useIsMobile } from './hooks/useIsMobile';
import { IntroLoader } from './components/common/IntroLoader';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { BagPage } from './pages/BagPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const alreadyPlayed = sessionStorage.getItem('vanter_intro_played_v1');
      return !alreadyPlayed;
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('vanter_intro_played_v1', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <CartProvider>
      <WishlistProvider>
        {showIntro && (
          <IntroLoader
            onComplete={handleIntroComplete}
            isMobile={isMobile}
          />
        )}

        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/shop" element={<CollectionPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;

