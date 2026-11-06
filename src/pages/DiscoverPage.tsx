import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { DesktopShell } from '../components/layout/DesktopShell';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { ScentQuizSection } from '../sections/ScentQuizSection';
import { NotesPyramidSection } from '../sections/NotesPyramidSection';

export const DiscoverPage: React.FC = () => {
  const isMobile = useIsMobile();

  const content = (
    <div>
      <ScentQuizSection />
      <NotesPyramidSection />
    </div>
  );

  if (isMobile) {
    return <MobileAppShell title="Discover">{content}</MobileAppShell>;
  }

  return <DesktopShell>{content}</DesktopShell>;
};

