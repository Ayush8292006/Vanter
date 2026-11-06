import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'product' | 'button' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover and pointer
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const productCard = target.closest('[data-cursor="product"]');
      const button = target.closest('button, a, [data-cursor="button"]');
      const customCursor = target.closest('[data-cursor-text]');

      if (customCursor) {
        setCursorType('product');
        setCursorText(customCursor.getAttribute('data-cursor-text') || 'VIEW');
      } else if (productCard) {
        setCursorType('product');
        setCursorText('VIEW');
      } else if (button) {
        setCursorType('button');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Small center gold dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorType === 'button' ? 0.3 : cursorType === 'product' ? 0 : 1,
          opacity: cursorType === 'product' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 450, mass: 0.1 }}
      />

      {/* Lagging trailing circle / pill */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold/70 flex items-center justify-center pointer-events-none backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (cursorType === 'product' ? 42 : cursorType === 'button' ? 14 : 20),
          y: mousePosition.y - (cursorType === 'product' ? 42 : cursorType === 'button' ? 14 : 20),
          width: cursorType === 'product' ? 84 : cursorType === 'button' ? 28 : 40,
          height: cursorType === 'product' ? 84 : cursorType === 'button' ? 28 : 40,
          backgroundColor: cursorType === 'product' ? 'rgba(11, 11, 11, 0.85)' : 'rgba(201, 164, 92, 0.05)',
          borderColor: cursorType === 'product' ? '#C9A45C' : 'rgba(201, 164, 92, 0.5)',
          scale: cursorType === 'button' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 0.2 }}
      >
        {cursorType === 'product' && (
          <span className="text-[10px] uppercase font-cinzel tracking-[0.25em] text-gold font-medium">
            {cursorText || 'VIEW'}
          </span>
        )}
      </motion.div>
    </div>
  );
};

