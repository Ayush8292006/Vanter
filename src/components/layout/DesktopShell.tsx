import React, { ReactNode } from 'react';
import { Navbar } from '../navigation/Navbar';
import { Footer } from '../navigation/Footer';
import { CustomCursor } from '../common/CustomCursor';
import { ScrollProgress } from '../common/ScrollProgress';
import { CartDrawer } from '../cart/CartDrawer';
import { Toast } from '../common/Toast';
import { useLenis } from '../../hooks/useLenis';

interface DesktopShellProps {
  children: ReactNode;
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ children }) => {
  // Synchronize smooth scroll with GSAP
  useLenis(true);

  return (
    <div className="min-h-screen bg-black text-ivory flex flex-col relative selection:bg-gold/30 selection:text-white">
      {/* 1px Gold Scroll Progress at the very top */}
      <ScrollProgress />

      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Toast Notification */}
      <Toast />

      {/* Main Page Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      {/* Full Editorial Footer */}
      <Footer />
    </div>
  );
};

