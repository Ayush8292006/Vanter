import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { MobileHomeFeed } from '../components/mobile/MobileHomeFeed';

// Desktop Editorial Sections
import { HeroSection } from '../sections/HeroSection';
import { MarqueeSection } from '../sections/MarqueeSection';
import { HouseStorySection } from '../sections/HouseStorySection';
import { SignatureCollectionSection } from '../sections/SignatureCollectionSection';
import { NotesPyramidSection } from '../sections/NotesPyramidSection';
import { CraftsmanshipSection } from '../sections/CraftsmanshipSection';
import { CinematicBannerSection } from '../sections/CinematicBannerSection';
import { BestsellersSection } from '../sections/BestsellersSection';
import { DiscoverySetSection } from '../sections/DiscoverySetSection';
import { ScentQuizSection } from '../sections/ScentQuizSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { JournalSection } from '../sections/JournalSection';
import { NewsletterSection } from '../sections/NewsletterSection';

export const HomePage: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileAppShell>
        <MobileHomeFeed />
      </MobileAppShell>
    );
  }

  return (
    <DesktopShell>
      {/* 7.1 Hero Section (Dark) */}
      <HeroSection />

      {/* 7.2 Marquee Strip */}
      <MarqueeSection />

      {/* 7.3 The House Story (Ivory) */}
      <HouseStorySection />

      {/* 7.4 Signature Collection Horizontal Scroll (Beige) */}
      <SignatureCollectionSection />

      {/* 7.5 Fragrance Pyramid Anatomy (Black) */}
      <NotesPyramidSection />

      {/* 7.6 Craftsmanship Sticky Scroll (Ivory) */}
      <CraftsmanshipSection />

      {/* 7.7 Full-Bleed Cinematic Banner (Dark) */}
      <CinematicBannerSection />

      {/* 7.8 Bestsellers Grid with Filtering (Beige) */}
      <BestsellersSection />

      {/* 7.9 Discovery Set & Gifting (Black + Gold) */}
      <DiscoverySetSection />

      {/* 7.10 Scent Consultation Diagnostic (Ivory) */}
      <ScentQuizSection />

      {/* 7.11 Client Testimonials Carousel (Beige) */}
      <TestimonialsSection />

      {/* 7.12 Editorial Journal & Instagram Grid (Ivory) */}
      <JournalSection />

      {/* 7.13 Maison Newsletter (Black) */}
      <NewsletterSection />
    </DesktopShell>
  );
};

